// // import { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { z } from 'zod';
// // import { Eye, EyeOff, ShoppingBag, Loader2 } from 'lucide-react';
// // import { toast } from 'sonner';
// // import { cn } from '@/utils/cn';
// // import { useAuthStore } from '@/store/authstore';

// // const loginSchema = z.object({
// //   email: z.string().email('Enter a valid email'),
// //   password: z.string().min(1, 'Password is required'),
// // });

// // const signupSchema = z.object({
// //   full_name: z.string().min(2, 'Name must be at least 2 characters'),
// //   email: z.string().email('Enter a valid email'),
// //   password: z
// //     .string()
// //     .min(6, 'Password must be at least 6 characters'),
// //   confirm_password: z.string(),
// // }).refine((d) => d.password === d.confirm_password, {
// //   message: "Passwords don't match",
// //   path: ['confirm_password'],
// // });

// // type LoginData = z.infer<typeof loginSchema>;
// // type SignupData = z.infer<typeof signupSchema>;

// // function PasswordInput({
// //   error,
// //   ...props
// // }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
// //   const [show, setShow] = useState(false);
// //   return (
// //     <div>
// //       <div className="relative">
// //         <input
// //           {...props}
// //           type={show ? 'text' : 'password'}
// //           className={cn(
// //             'w-full rounded-lg border bg-white text-sage-800 text-sm px-3 py-2.5 pr-10 transition-all',
// //             'focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 placeholder:text-sage-300',
// //             error ? 'border-red-300' : 'border-sage-200 hover:border-sage-300'
// //           )}
// //         />
// //         <button
// //           type="button"
// //           onClick={() => setShow(!show)}
// //           className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600 cursor-pointer"
// //         >
// //           {show ? <EyeOff size={16} /> : <Eye size={16} />}
// //         </button>
// //       </div>
// //       {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
// //     </div>
// //   );
// // }

// // function FieldInput({
// //   error,
// //   ...props
// // }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
// //   return (
// //     <div>
// //       <input
// //         {...props}
// //         className={cn(
// //           'w-full rounded-lg border bg-white text-sage-800 text-sm px-3 py-2.5 transition-all',
// //           'focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 placeholder:text-sage-300',
// //           error ? 'border-red-300' : 'border-sage-200 hover:border-sage-300'
// //         )}
// //       />
// //       {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
// //     </div>
// //   );
// // }

// // function LoginForm({ onSwitch }: { onSwitch: () => void }) {
// //   const { login } = useAuthStore();
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors, isSubmitting },
// //   } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

// //   const onSubmit = async (data: LoginData) => {
// //     try {
// //       await login(data.email, data.password);
// //       toast.success('Welcome back!');
// //     } catch (e: unknown) {
// //       const msg =
// //         (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
// //         'Login failed. Check your credentials.';
// //       toast.error(msg);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //       <div>
// //         <label className="block text-sm font-medium text-sage-700 mb-1.5">
// //           Email
// //         </label>
// //         <FieldInput
// //           {...register('email')}
// //           type="email"
// //           placeholder="you@example.com"
// //           error={errors.email?.message}
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-sage-700 mb-1.5">
// //           Password
// //         </label>
// //         <PasswordInput
// //           {...register('password')}
// //           placeholder="••••••••"
// //           error={errors.password?.message}
// //         />
// //       </div>

// //       <button
// //         type="submit"
// //         disabled={isSubmitting}
// //         className="w-full flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
// //       >
// //         {isSubmitting && <Loader2 size={16} className="animate-spin" />}
// //         Sign In
// //       </button>

// //       <p className="text-center text-sm text-sage-400">
// //         Don't have an account?{' '}
// //         <button
// //           type="button"
// //           onClick={onSwitch}
// //           className="text-sage-600 font-medium hover:underline cursor-pointer"
// //         >
// //           Sign up
// //         </button>
// //       </p>
// //     </form>
// //   );
// // }

// // function SignupForm({ onSwitch }: { onSwitch: () => void }) {
// //   const { signup } = useAuthStore();
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors, isSubmitting },
// //   } = useForm<SignupData>({ resolver: zodResolver(signupSchema) });

// //   const onSubmit = async (data: SignupData) => {
// //     try {
// //       await signup(data.email, data.full_name, data.password);
// //       toast.success('Account created! Welcome aboard.');
// //     } catch (e: unknown) {
// //       const msg =
// //         (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
// //         'Signup failed. Please try again.';
// //       toast.error(msg);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //       <div>
// //         <label className="block text-sm font-medium text-sage-700 mb-1.5">
// //           Full Name
// //         </label>
// //         <FieldInput
// //           {...register('full_name')}
// //           placeholder="Your full name"
// //           error={errors.full_name?.message}
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-sage-700 mb-1.5">
// //           Email
// //         </label>
// //         <FieldInput
// //           {...register('email')}
// //           type="email"
// //           placeholder="you@example.com"
// //           error={errors.email?.message}
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-sage-700 mb-1.5">
// //           Password
// //         </label>
// //         <PasswordInput
// //           {...register('password')}
// //           placeholder="Min. 6 characters"
// //           error={errors.password?.message}
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium text-sage-700 mb-1.5">
// //           Confirm Password
// //         </label>
// //         <PasswordInput
// //           {...register('confirm_password')}
// //           placeholder="Repeat password"
// //           error={errors.confirm_password?.message}
// //         />
// //       </div>

// //       <button
// //         type="submit"
// //         disabled={isSubmitting}
// //         className="w-full flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
// //       >
// //         {isSubmitting && <Loader2 size={16} className="animate-spin" />}
// //         Create Account
// //       </button>

// //       <p className="text-center text-sm text-sage-400">
// //         Already have an account?{' '}
// //         <button
// //           type="button"
// //           onClick={onSwitch}
// //           className="text-sage-600 font-medium hover:underline cursor-pointer"
// //         >
// //           Sign in
// //         </button>
// //       </p>
// //     </form>
// //   );
// // }

// // export function AuthPage() {
// //   const [mode, setMode] = useState<'login' | 'signup'>('login');

// //   return (
// //     <div
// //       className="min-h-screen flex items-center justify-center p-4"
// //       style={{ backgroundColor: '#f8f5ef' }}
// //     >
// //       {/* Background pattern */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-24 -right-24 w-96 h-96 bg-sage-100 rounded-full opacity-40 blur-3xl" />
// //         <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-beige-200 rounded-full opacity-50 blur-3xl" />
// //       </div>

// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.4 }}
// //         className="relative w-full max-w-md"
// //       >
// //         {/* Card */}
// //         <div className="bg-white rounded-2xl border border-beige-200 shadow-xl overflow-hidden">
// //           {/* Top accent */}
// //           <div className="h-1 bg-gradient-to-r from-sage-300 via-sage-500 to-sage-300" />

// //           <div className="p-8">
// //             {/* Logo / Brand */}
// //             <div className="flex flex-col items-center mb-8">
// //               <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center mb-3">
// //                 <ShoppingBag size={24} className="text-sage-600" />
// //               </div>
// //               <h1
// //                 className="text-2xl font-bold text-sage-800"
// //                 style={{ fontFamily: 'Georgia, serif' }}
// //               >
// //                 Sreya Digital Wear
// //               </h1>
// //               <p className="text-sm text-sage-400 mt-1">Inventory & Production Management</p>
// //             </div>

// //             {/* Tab switcher */}
// //             <div className="flex bg-beige-100 rounded-xl p-1 mb-6">
// //               {(['login', 'signup'] as const).map((tab) => (
// //                 <button
// //                   key={tab}
// //                   onClick={() => setMode(tab)}
// //                   className={cn(
// //                     'flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer',
// //                     mode === tab
// //                       ? 'bg-white text-sage-700 shadow-sm'
// //                       : 'text-sage-400 hover:text-sage-600'
// //                   )}
// //                 >
// //                   {tab === 'login' ? 'Sign In' : 'Sign Up'}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Forms */}
// //             <AnimatePresence mode="wait">
// //               <motion.div
// //                 key={mode}
// //                 initial={{ opacity: 0, x: mode === 'login' ? -16 : 16 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 exit={{ opacity: 0, x: mode === 'login' ? 16 : -16 }}
// //                 transition={{ duration: 0.22 }}
// //               >
// //                 {mode === 'login' ? (
// //                   <LoginForm onSwitch={() => setMode('signup')} />
// //                 ) : (
// //                   <SignupForm onSwitch={() => setMode('login')} />
// //                 )}
// //               </motion.div>
// //             </AnimatePresence>
// //           </div>
// //         </div>

// //         <p className="text-center text-xs text-sage-300 mt-4">
// //           © {new Date().getFullYear()} Sreya Digital Wear · All rights reserved
// //         </p>
// //       </motion.div>
// //     </div>
// //   );
// // }


// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Eye, EyeOff, ShoppingBag, Loader2 } from 'lucide-react';
// import { Toaster, toast } from 'sonner';
// import { useAuthStore } from '@/store/authstore';
// import { cn } from '@/utils/cn';

// const loginSchema = z.object({
//   email: z.string().email('Enter a valid email'),
//   password: z.string().min(1, 'Password is required'),
// });

// const signupSchema = z
//   .object({
//     full_name: z.string().min(2, 'Name must be at least 2 characters'),
//     email: z.string().email('Enter a valid email'),
//     password: z.string().min(6, 'Password must be at least 6 characters'),
//     confirm_password: z.string(),
//   })
//   .refine((d) => d.password === d.confirm_password, {
//     message: "Passwords don't match",
//     path: ['confirm_password'],
//   });

// type LoginData = z.infer<typeof loginSchema>;
// type SignupData = z.infer<typeof signupSchema>;

// function PasswordInput({
//   error,
//   ...props
// }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
//   const [show, setShow] = useState(false);
//   return (
//     <div>
//       <div className="relative">
//         <input
//           {...props}
//           type={show ? 'text' : 'password'}
//           className={cn(
//             'w-full rounded-lg border bg-white text-sage-800 text-sm px-3 py-2.5 pr-10 transition-all',
//             'focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 placeholder:text-sage-300',
//             error ? 'border-red-300' : 'border-sage-200 hover:border-sage-300'
//           )}
//         />
//         <button
//           type="button"
//           onClick={() => setShow(!show)}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600 cursor-pointer"
//         >
//           {show ? <EyeOff size={16} /> : <Eye size={16} />}
//         </button>
//       </div>
//       {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
//     </div>
//   );
// }

// function FieldInput({
//   error,
//   ...props
// }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
//   return (
//     <div>
//       <input
//         {...props}
//         className={cn(
//           'w-full rounded-lg border bg-white text-sage-800 text-sm px-3 py-2.5 transition-all',
//           'focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 placeholder:text-sage-300',
//           error ? 'border-red-300' : 'border-sage-200 hover:border-sage-300'
//         )}
//       />
//       {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
//     </div>
//   );
// }

// function LoginForm({ onSwitch }: { onSwitch: () => void }) {
//   const { login } = useAuthStore();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

//   const onSubmit = async (data: LoginData) => {
//     try {
//       await login(data.email, data.password);
//       toast.success('Welcome back!');
//     } catch (e: unknown) {
//       const status = (e as { response?: { status?: number } })?.response?.status;
//       const detail = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;

//       if (status === 401) {
//         toast.error('Invalid email or password. Please try again.');
//       } else {
//         toast.error(detail || 'Login failed. Please try again.');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-sage-700 mb-1.5">Email</label>
//         <FieldInput
//           {...register('email')}
//           type="email"
//           placeholder="you@example.com"
//           error={errors.email?.message}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-sage-700 mb-1.5">Password</label>
//         <PasswordInput
//           {...register('password')}
//           placeholder="••••••••"
//           error={errors.password?.message}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
//       >
//         {isSubmitting && <Loader2 size={16} className="animate-spin" />}
//         Sign In
//       </button>

//       <p className="text-center text-sm text-sage-400">
//         Don't have an account?{' '}
//         <button
//           type="button"
//           onClick={onSwitch}
//           className="text-sage-600 font-medium hover:underline cursor-pointer"
//         >
//           Sign up
//         </button>
//       </p>
//     </form>
//   );
// }

// function SignupForm({ onSwitch }: { onSwitch: () => void }) {
//   const { signup } = useAuthStore();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<SignupData>({ resolver: zodResolver(signupSchema) });

//   const onSubmit = async (data: SignupData) => {
//     try {
//       await signup(data.email, data.full_name, data.password);
//       toast.success('Account created! Welcome aboard.');
//     } catch (e: unknown) {
//       const status = (e as { response?: { status?: number } })?.response?.status;
//       const detail = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;

//       if (status === 400 && detail?.toLowerCase().includes('email')) {
//         toast.error('This email is already registered. Please sign in instead.');
//       } else {
//         toast.error(detail || 'Signup failed. Please try again.');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-sage-700 mb-1.5">Full Name</label>
//         <FieldInput
//           {...register('full_name')}
//           placeholder="Your full name"
//           error={errors.full_name?.message}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-sage-700 mb-1.5">Email</label>
//         <FieldInput
//           {...register('email')}
//           type="email"
//           placeholder="you@example.com"
//           error={errors.email?.message}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-sage-700 mb-1.5">Password</label>
//         <PasswordInput
//           {...register('password')}
//           placeholder="Min. 6 characters"
//           error={errors.password?.message}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-sage-700 mb-1.5">Confirm Password</label>
//         <PasswordInput
//           {...register('confirm_password')}
//           placeholder="Repeat password"
//           error={errors.confirm_password?.message}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
//       >
//         {isSubmitting && <Loader2 size={16} className="animate-spin" />}
//         Create Account
//       </button>

//       <p className="text-center text-sm text-sage-400">
//         Already have an account?{' '}
//         <button
//           type="button"
//           onClick={onSwitch}
//           className="text-sage-600 font-medium hover:underline cursor-pointer"
//         >
//           Sign in
//         </button>
//       </p>
//     </form>
//   );
// }

// export function AuthPage() {
//   const [mode, setMode] = useState<'login' | 'signup'>('login');

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f8f5ef' }}>
//       {/* Toaster must be here so toasts work before the main app mounts */}
//       <Toaster
//         position="bottom-right"
//         toastOptions={{
//           style: {
//             background: 'white',
//             border: '1px solid #e0ecdc',
//             color: '#2d4228',
//             borderRadius: '12px',
//             fontFamily: 'inherit',
//             fontSize: '14px',
//           },
//         }}
//         richColors
//       />

//       {/* Background blobs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-24 -right-24 w-96 h-96 bg-sage-100 rounded-full opacity-40 blur-3xl" />
//         <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-beige-200 rounded-full opacity-50 blur-3xl" />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="relative w-full max-w-md"
//       >
//         <div className="bg-white rounded-2xl border border-beige-200 shadow-xl overflow-hidden">
//           <div className="h-1 bg-gradient-to-r from-sage-300 via-sage-500 to-sage-300" />

//           <div className="p-8">
//             {/* Brand */}
//             <div className="flex flex-col items-center mb-8">
//               <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center mb-3">
//                 <ShoppingBag size={24} className="text-sage-600" />
//               </div>
//               <h1
//                 className="text-2xl font-bold text-sage-800"
//                 style={{ fontFamily: 'Georgia, serif' }}
//               >
//                 Sreya Digital Wear
//               </h1>
//               <p className="text-sm text-sage-400 mt-1">Inventory & Production Management</p>
//             </div>

//             {/* Tabs */}
//             <div className="flex bg-beige-100 rounded-xl p-1 mb-6">
//               {(['login', 'signup'] as const).map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setMode(tab)}
//                   className={cn(
//                     'flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer',
//                     mode === tab
//                       ? 'bg-white text-sage-700 shadow-sm'
//                       : 'text-sage-400 hover:text-sage-600'
//                   )}
//                 >
//                   {tab === 'login' ? 'Sign In' : 'Sign Up'}
//                 </button>
//               ))}
//             </div>

//             {/* Form */}
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={mode}
//                 initial={{ opacity: 0, x: mode === 'login' ? -16 : 16 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: mode === 'login' ? 16 : -16 }}
//                 transition={{ duration: 0.22 }}
//               >
//                 {mode === 'login' ? (
//                   <LoginForm onSwitch={() => setMode('signup')} />
//                 ) : (
//                   <SignupForm onSwitch={() => setMode('login')} />
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>

//         <p className="text-center text-xs text-sage-300 mt-4">
//           © {new Date().getFullYear()} Sreya Digital Wear · All rights reserved
//         </p>
//       </motion.div>
//     </div>
//   );
// }



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ShoppingBag, Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authstore';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

const signupSchema = z
  .object({
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string(),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

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

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
    } catch (e: unknown) {
      const status = (e as { response?: { status?: number } })?.response?.status;
      const detail = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;

      if (status === 401) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error(detail || 'Login failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-sage-700 mb-1.5">Email</label>
        <FieldInput
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-sage-700 mb-1.5">Password</label>
        <PasswordInput
          {...register('password')}
          placeholder="••••••••"
          error={errors.password?.message}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
        Sign In
      </button>

      <div className="flex items-center justify-between text-sm">
        <p className="text-sage-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="text-sage-600 font-medium hover:underline cursor-pointer"
          >
            Sign up
          </button>
        </p>
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sage-400 hover:text-sage-600 font-medium hover:underline cursor-pointer text-xs"
        >
          Forgot password?
        </button>
      </div>
    </form>
  );
}

function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const { signup } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupData) => {
    try {
      await signup(data.email, data.full_name, data.password);
      toast.success('Account created! Welcome aboard.');
    } catch (e: unknown) {
      const status = (e as { response?: { status?: number } })?.response?.status;
      const detail = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;

      if (status === 400 && detail?.toLowerCase().includes('email')) {
        toast.error('This email is already registered. Please sign in instead.');
      } else {
        toast.error(detail || 'Signup failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-sage-700 mb-1.5">Full Name</label>
        <FieldInput
          {...register('full_name')}
          placeholder="Your full name"
          error={errors.full_name?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-sage-700 mb-1.5">Email</label>
        <FieldInput
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-sage-700 mb-1.5">Password</label>
        <PasswordInput
          {...register('password')}
          placeholder="Min. 6 characters"
          error={errors.password?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-sage-700 mb-1.5">Confirm Password</label>
        <PasswordInput
          {...register('confirm_password')}
          placeholder="Repeat password"
          error={errors.confirm_password?.message}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
        Create Account
      </button>

      <p className="text-center text-sm text-sage-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="text-sage-600 font-medium hover:underline cursor-pointer"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f8f5ef' }}>
      {/* Toaster must be here so toasts work before the main app mounts */}
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
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center mb-3">
                <ShoppingBag size={24} className="text-sage-600" />
              </div>
              <h1
                className="text-2xl font-bold text-sage-800"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Sreya Digital Wear
              </h1>
              <p className="text-sm text-sage-400 mt-1">Inventory & Production Management</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-beige-100 rounded-xl p-1 mb-6">
              {(['login', 'signup'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMode(tab)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer',
                    mode === tab
                      ? 'bg-white text-sage-700 shadow-sm'
                      : 'text-sage-400 hover:text-sage-600'
                  )}
                >
                  {tab === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === 'login' ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'login' ? 16 : -16 }}
                transition={{ duration: 0.22 }}
              >
                {mode === 'login' ? (
                  <LoginForm onSwitch={() => setMode('signup')} />
                ) : (
                  <SignupForm onSwitch={() => setMode('login')} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-xs text-sage-300 mt-4">
          © {new Date().getFullYear()} Sreya Digital Wear · All rights reserved
        </p>
      </motion.div>
    </div>
  );
}