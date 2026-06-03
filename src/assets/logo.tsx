

// interface LogoProps {
//   size?: number;
//   className?: string;
//   showText?: boolean;
// }

// export function SDWLogo({ size = 40, className = '', showText = true }: LogoProps) {
//   return (
//     <div className={`flex items-center gap-3 ${className}`}>
//       <svg
//         width={size}
//         height={size}
//         viewBox="0 0 48 48"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="flex-shrink-0"
//       >
//         <defs>
//           <linearGradient id="sdwGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#8fad88" />
//             <stop offset="100%" stopColor="#5a7a52" />
//           </linearGradient>
//           <linearGradient id="sdwGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#e8dcc8" />
//             <stop offset="100%" stopColor="#d4c4a0" />
//           </linearGradient>
//         </defs>

//         {/* Background circle */}
//         <circle cx="24" cy="24" r="23" fill="url(#sdwGrad1)" />
        
//         {/* Inner decorative ring */}
//         <circle cx="24" cy="24" r="19" fill="none" stroke="url(#sdwGrad2)" strokeWidth="0.5" opacity="0.6" />

//         {/* SDW Text */}
//         <text
//           x="24"
//           y="29"
//           textAnchor="middle"
//           fill="#f5ede0"
//           fontSize="14"
//           fontWeight="700"
//           fontFamily="Georgia, serif"
//           letterSpacing="1"
//         >
//           SDW
//         </text>

//         {/* Decorative bottom line */}
//         <line x1="14" y1="33" x2="34" y2="33" stroke="#e8dcc8" strokeWidth="0.8" opacity="0.7" />
//       </svg>

//       {showText && (
//         <div className="flex flex-col leading-tight">
//           <span
//             style={{
//               fontFamily: 'Georgia, serif',
//               fontWeight: 700,
//               fontSize: '18px',
//               color: '#3d5a35',
//               letterSpacing: '0.04em',
//               lineHeight: 1.1,
//             }}
//           >
//             Sreya Digital Wear
//           </span>
//           <span
//             style={{
//               fontFamily: 'Georgia, serif',
//               fontSize: '10px',
//               color: '#8fad88',
//               letterSpacing: '0.18em',
//               textTransform: 'uppercase',
//               lineHeight: 1.3,
//             }}
//           >
//             Inventory
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// export function SDWLogoIcon({ size = 32 }: { size?: number }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 48 48"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <defs>
//         <linearGradient id="sdwIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#8fad88" />
//           <stop offset="100%" stopColor="#5a7a52" />
//         </linearGradient>
//       </defs>
//       <circle cx="24" cy="24" r="23" fill="url(#sdwIconGrad)" />
//       <circle cx="24" cy="24" r="19" fill="none" stroke="#e8dcc8" strokeWidth="0.5" opacity="0.6" />
//       <text
//         x="24"
//         y="29"
//         textAnchor="middle"
//         fill="#f5ede0"
//         fontSize="14"
//         fontWeight="700"
//         fontFamily="Georgia, serif"
//         letterSpacing="1"
//       >
//         SDW
//       </text>
//       <line x1="14" y1="33" x2="34" y2="33" stroke="#e8dcc8" strokeWidth="0.8" opacity="0.7" />
//     </svg>
//   );
// }


import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SDWLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: { width: 120, height: 36 },
    md: { width: 160, height: 48 },
    lg: { width: 200, height: 60 },
  };

  const { width, height } = sizes[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 60"
      fill="none"
      width={width}
      height={height}
      className={className}
      aria-label="Sreya Digital Wear Logo"
    >
      <defs>
        <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B7355" />
          <stop offset="50%" stopColor="#C4A882" />
          <stop offset="100%" stopColor="#8B7355" />
        </linearGradient>
        <linearGradient id="logoGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B8F71" />
          <stop offset="100%" stopColor="#4A7056" />
        </linearGradient>
      </defs>

      {/* Diamond ornament left */}
      <polygon points="8,30 14,24 20,30 14,36" fill="url(#logoGoldGrad)" opacity="0.8" />

      {/* SDW Letters */}
      <text
        x="26"
        y="42"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="30"
        fontWeight="700"
        fill="url(#logoGoldGrad)"
        letterSpacing="-1"
      >
        S
      </text>
      <text
        x="50"
        y="42"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="30"
        fontWeight="700"
        fill="url(#logoGreenGrad)"
        letterSpacing="-1"
      >
        D
      </text>
      <text
        x="76"
        y="42"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="30"
        fontWeight="700"
        fill="url(#logoGoldGrad)"
        letterSpacing="-1"
      >
        W
      </text>

      {/* Decorative line */}
      <line x1="26" y1="46" x2="112" y2="46" stroke="url(#logoGoldGrad)" strokeWidth="1" opacity="0.6" />

      {/* Diamond ornament right */}
      <polygon points="118,30 124,24 130,30 124,36" fill="url(#logoGoldGrad)" opacity="0.8" />

      {/* Brand name */}
      <text
        x="140"
        y="28"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="9"
        fill="#8B7355"
        letterSpacing="2"
        fontWeight="400"
      >
        SREYA
      </text>
      <text
        x="140"
        y="40"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="9"
        fill="#6B8F71"
        letterSpacing="1.5"
        fontWeight="400"
      >
        DIGITAL
      </text>
      <text
        x="140"
        y="52"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="9"
        fill="#8B7355"
        letterSpacing="2.5"
        fontWeight="400"
      >
        WEAR
      </text>
    </svg>
  );
};

