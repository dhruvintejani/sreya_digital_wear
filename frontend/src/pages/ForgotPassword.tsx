import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import {
  ShoppingBag,
  Mail,
  KeyRound,
  Lock,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authstore';

// ── EmailJS config — fill these in from your EmailJS dashboard ───────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

const OTP_EXPIRY_SECONDS = 120; // 2 minutes

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ── Schemas ───────────────────────────────────────────────────────────────────
const emailSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

type EmailData = z.infer<typeof emailSchema>;
type OtpData = z.infer<typeof otpSchema>;
type PasswordData = z.infer<typeof passwordSchema>;

type Step = 'email' | 'otp' | 'password' | 'done';

// ── Sub-components ────────────────────────────────────────────────────────────
function FieldInput({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <div>
      <input
        {...props}
        className={cn(
          'w-full rounded-lg border bg-white text-sage-800 text-sm px-3 py-2.5 transition-all',
          'focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 placeholder:text-sage-300',
          error ? 'border-red-300' : 'border-sage-200 hover:border-sage-300'
        )}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function PasswordInput({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="relative">
        <input
          {...props}
          type={show ? 'text' : 'password'}
          className={cn(
            'w-full rounded-lg border bg-white text-sage-800 text-sm px-3 py-2.5 pr-10 transition-all',
            'focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 placeholder:text-sage-300',
            error ? 'border-red-300' : 'border-sage-200 hover:border-sage-300'
          )}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600 cursor-pointer"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// OTP countdown timer
function OtpTimer({
  seconds,
  onExpire,
}: {
  seconds: number;
  onExpire: () => void;
}) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isUrgent = remaining <= 30;

  return (
    <span
      className={cn(
        'font-mono font-semibold tabular-nums',
        isUrgent ? 'text-red-500' : 'text-sage-600'
      )}
    >
      {mins}:{secs.toString().padStart(2, '0')}
    </span>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuthStore();

  const [step, setStep] = useState<Step>('email');
  const [verifiedEmail, setVerifiedEmail] = useState('');
//   const [otpValue, setOtpValue] = useState('');
  const [otpExpired, setOtpExpired] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // bump to reset timer

  // Store generated OTP in a ref (never in state to avoid re-render leaks)
  const generatedOtp = useRef('');

  // ── Email step ──────────────────────────────────────────────────────────────
  const emailForm = useForm<EmailData>({ resolver: zodResolver(emailSchema) });

  const sendOtp = async (email: string) => {
    const otp = generateOtp();
    generatedOtp.current = otp;

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        otp_code: otp,
        expiry_minutes: '2',
      },
      EMAILJS_PUBLIC_KEY
    );
  };

  const onEmailSubmit = async (data: EmailData) => {
    try {
      await sendOtp(data.email);
      setVerifiedEmail(data.email);
      setOtpExpired(false);
      setTimerKey((k) => k + 1);
      setStep('otp');
      toast.success('OTP sent! Check your inbox.');
    } catch (e) {
      console.error(e);
      toast.error('Failed to send OTP. Check your EmailJS configuration.');
    }
  };

  // ── OTP step ────────────────────────────────────────────────────────────────
  const otpForm = useForm<OtpData>({ resolver: zodResolver(otpSchema) });

  const onOtpSubmit = (data: OtpData) => {
    if (otpExpired) {
      toast.error('OTP has expired. Please request a new one.');
      return;
    }
    if (data.otp !== generatedOtp.current) {
      toast.error('Incorrect OTP. Please try again.');
      otpForm.setError('otp', { message: 'Incorrect OTP' });
      return;
    }
    setStep('password');
  };

  const handleResendOtp = async () => {
    try {
      await sendOtp(verifiedEmail);
      setOtpExpired(false);
      setTimerKey((k) => k + 1);
      otpForm.reset();
      toast.success('New OTP sent!');
    } catch {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  // ── Password step ───────────────────────────────────────────────────────────
  const passwordForm = useForm<PasswordData>({ resolver: zodResolver(passwordSchema) });

  const onPasswordSubmit = async (data: PasswordData) => {
    try {
      await resetPassword(verifiedEmail, data.password);
      setStep('done');
    } catch (e: unknown) {
      const msg =
        (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        'Failed to reset password. Please try again.';
      toast.error(msg);
    }
  };

  // ── Step labels ─────────────────────────────────────────────────────────────
  const stepConfig = {
    email: { icon: Mail, title: 'Forgot Password', desc: "Enter your email and we'll send an OTP" },
    otp: { icon: KeyRound, title: 'Verify OTP', desc: `Code sent to ${verifiedEmail}` },
    password: { icon: Lock, title: 'New Password', desc: 'Choose a strong new password' },
    done: { icon: CheckCircle2, title: 'Password Reset!', desc: 'Your password has been updated' },
  };

  const { icon: StepIcon, title, desc } = stepConfig[step];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#f8f5ef' }}
    >
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #e0ecdc',
            color: '#2d4228',
            borderRadius: '12px',
            fontFamily: 'inherit',
            fontSize: '14px',
          },
        }}
        richColors
      />

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sage-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-beige-200 rounded-full opacity-50 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white rounded-2xl border border-beige-200 shadow-xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-sage-300 via-sage-500 to-sage-300" />

          <div className="p-8">
            {/* Brand */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center mb-3">
                <ShoppingBag size={24} className="text-sage-600" />
              </div>
              <p className="text-xs text-sage-400 font-medium uppercase tracking-widest">
                Sreya Digital Wear
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {(['email', 'otp', 'password'] as const).map((s, idx) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                      step === s || (step === 'done' && idx <= 2)
                        ? 'bg-sage-600 text-white'
                        : ['email', 'otp', 'password', 'done'].indexOf(step) > idx
                        ? 'bg-sage-200 text-sage-600'
                        : 'bg-beige-100 text-sage-300'
                    )}
                  >
                    {idx + 1}
                  </div>
                  {idx < 2 && (
                    <div
                      className={cn(
                        'w-8 h-0.5 transition-all',
                        ['otp', 'password', 'done'].includes(step) && idx === 0
                          ? 'bg-sage-400'
                          : ['password', 'done'].includes(step) && idx === 1
                          ? 'bg-sage-400'
                          : 'bg-beige-200'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step icon + title */}
            <div className="text-center mb-6">
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3',
                step === 'done' ? 'bg-emerald-50' : 'bg-sage-50'
              )}>
                <StepIcon
                  size={22}
                  className={step === 'done' ? 'text-emerald-600' : 'text-sage-600'}
                />
              </div>
              <h1 className="text-xl font-bold text-sage-800" style={{ fontFamily: 'Georgia, serif' }}>
                {title}
              </h1>
              <p className="text-sm text-sage-400 mt-1">{desc}</p>
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                {/* ── Email step ─────────────────────────────────────────── */}
                {step === 'email' && (
                  <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-1.5">
                        Email Address
                      </label>
                      <FieldInput
                        {...emailForm.register('email')}
                        type="email"
                        placeholder="you@example.com"
                        error={emailForm.formState.errors.email?.message}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={emailForm.formState.isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {emailForm.formState.isSubmitting ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Mail size={16} />
                      )}
                      Send OTP
                    </button>
                  </form>
                )}

                {/* ── OTP step ───────────────────────────────────────────── */}
                {step === 'otp' && (
                  <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-medium text-sage-700">6-digit OTP</label>
                        <div className="flex items-center gap-1.5 text-xs text-sage-500">
                          Expires in:{' '}
                          {otpExpired ? (
                            <span className="text-red-500 font-semibold">Expired</span>
                          ) : (
                            <OtpTimer
                              key={timerKey}
                              seconds={OTP_EXPIRY_SECONDS}
                              onExpire={() => setOtpExpired(true)}
                            />
                          )}
                        </div>
                      </div>
                      <input
                        {...otpForm.register('otp')}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="000000"
                        className={cn(
                          'w-full rounded-lg border bg-white text-sage-800 text-center text-2xl font-mono font-bold tracking-[0.5em] py-3 transition-all',
                          'focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 placeholder:text-sage-200 placeholder:tracking-normal placeholder:text-base',
                          otpForm.formState.errors.otp || otpExpired
                            ? 'border-red-300'
                            : 'border-sage-200 hover:border-sage-300'
                        )}
                      />
                      {otpForm.formState.errors.otp && (
                        <p className="mt-1 text-xs text-red-500">
                          {otpForm.formState.errors.otp.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={otpExpired}
                      className="w-full flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <KeyRound size={16} />
                      Verify OTP
                    </button>

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="w-full flex items-center justify-center gap-2 text-sage-500 hover:text-sage-700 text-sm font-medium py-2 rounded-lg hover:bg-sage-50 transition-colors cursor-pointer"
                    >
                      <RefreshCw size={14} />
                      Resend OTP
                    </button>
                  </form>
                )}

                {/* ── Password step ──────────────────────────────────────── */}
                {step === 'password' && (
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-1.5">
                        New Password
                      </label>
                      <PasswordInput
                        {...passwordForm.register('password')}
                        placeholder="Min. 6 characters"
                        error={passwordForm.formState.errors.password?.message}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-1.5">
                        Confirm Password
                      </label>
                      <PasswordInput
                        {...passwordForm.register('confirm')}
                        placeholder="Repeat password"
                        error={passwordForm.formState.errors.confirm?.message}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={passwordForm.formState.isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {passwordForm.formState.isSubmitting ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Lock size={16} />
                      )}
                      Reset Password
                    </button>
                  </form>
                )}

                {/* ── Done step ──────────────────────────────────────────── */}
                {step === 'done' && (
                  <div className="text-center space-y-4">
                    <div className="py-4">
                      <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-3" />
                      <p className="text-sm text-sage-500">
                        Your password has been successfully reset. You can now sign in with your
                        new password.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/')}
                      className="w-full bg-sage-600 hover:bg-sage-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Go to Sign In
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Back link */}
            {step !== 'done' && (
              <button
                onClick={() => {
                  if (step === 'email') navigate('/');
                  else if (step === 'otp') setStep('email');
                  else if (step === 'password') setStep('otp');
                }}
                className="mt-5 flex items-center gap-1.5 text-xs text-sage-400 hover:text-sage-600 transition-colors cursor-pointer mx-auto"
              >
                <ArrowLeft size={13} /> Back
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-sage-300 mt-4">
          © {new Date().getFullYear()} Sreya Digital Wear · All rights reserved
        </p>
      </motion.div>
    </div>
  );
}