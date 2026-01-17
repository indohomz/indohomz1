/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // LUXURY GOLD PALETTE - Primary Accent
        // ═══════════════════════════════════════════════════════════════
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D4A574', // Primary gold accent
          600: '#B8956F',
          700: '#92714C',
          800: '#6B5338',
          900: '#4A3A27',
        },
        
        // ═══════════════════════════════════════════════════════════════
        // LUXURY NEUTRALS - Warm & Sophisticated
        // ═══════════════════════════════════════════════════════════════
        luxury: {
          cream: '#FAF8F5',
          sand: '#F5F0E8',
          beige: '#EDE5DA',
          taupe: '#D4C8BA',
          muted: '#9C9489',
          charcoal: '#1A1918',
          espresso: '#2D2926',
          midnight: '#0F0E0D',
        },
        
        // ═══════════════════════════════════════════════════════════════
        // WARM STONE PALETTE - Enhanced
        // ═══════════════════════════════════════════════════════════════
        stone: {
          50: '#FAF8F5',
          100: '#F5F0E8',
          200: '#E7E2DA',
          300: '#D6CFC4',
          400: '#A8A099',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
        
        // ═══════════════════════════════════════════════════════════════
        // ACCENT COLORS - Subtle & Refined
        // ═══════════════════════════════════════════════════════════════
        accent: {
          sage: '#A8B5A0',
          olive: '#7D8471',
          terracotta: '#C4A484',
          rust: '#A67B5B',
          navy: '#2C3E50',
          slate: '#64748B',
        },
        
        // Legacy support
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        neutral: {
          50: '#FAF8F5',
          100: '#F5F0E8',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      
      // ═══════════════════════════════════════════════════════════════
      // TYPOGRAPHY - Luxury Font System
      // ═══════════════════════════════════════════════════════════════
      fontFamily: {
        // Display/Headlines - Elegant Serif
        display: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
        
        // Body - Modern Sans
        sans: ['Sora', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        // Luxury display sizes with fluid scaling
        'display-hero': ['clamp(3.5rem, 12vw, 8rem)', { 
          lineHeight: '0.95', 
          letterSpacing: '-0.03em',
          fontWeight: '300'
        }],
        'display-2xl': ['clamp(3rem, 8vw, 6rem)', { 
          lineHeight: '1', 
          letterSpacing: '-0.025em',
          fontWeight: '300'
        }],
        'display-xl': ['clamp(2.5rem, 6vw, 4.5rem)', { 
          lineHeight: '1.05', 
          letterSpacing: '-0.02em',
          fontWeight: '300'
        }],
        'display-lg': ['clamp(2rem, 5vw, 3.5rem)', { 
          lineHeight: '1.1', 
          letterSpacing: '-0.015em',
          fontWeight: '400'
        }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { 
          lineHeight: '1.15', 
          letterSpacing: '-0.01em',
          fontWeight: '400'
        }],
        'display-sm': ['clamp(1.25rem, 2.5vw, 1.75rem)', { 
          lineHeight: '1.2', 
          letterSpacing: '-0.01em',
          fontWeight: '400'
        }],
      },
      
      // ═══════════════════════════════════════════════════════════════
      // SPACING - Generous Luxury Spacing
      // ═══════════════════════════════════════════════════════════════
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '50': '12.5rem',
        '58': '14.5rem',
        '66': '16.5rem',
      },
      
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
      
      // ═══════════════════════════════════════════════════════════════
      // SHADOWS - Soft & Sophisticated
      // ═══════════════════════════════════════════════════════════════
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(26, 25, 24, 0.03)',
        'sm': '0 2px 4px 0 rgba(26, 25, 24, 0.04)',
        'md': '0 4px 12px -2px rgba(26, 25, 24, 0.06)',
        'lg': '0 12px 24px -4px rgba(26, 25, 24, 0.08)',
        'xl': '0 20px 40px -8px rgba(26, 25, 24, 0.1)',
        '2xl': '0 32px 64px -12px rgba(26, 25, 24, 0.14)',
        
        // Luxury gold glow shadows
        'gold-sm': '0 4px 12px -2px rgba(212, 165, 116, 0.15)',
        'gold-md': '0 8px 24px -4px rgba(212, 165, 116, 0.2)',
        'gold-lg': '0 16px 40px -8px rgba(212, 165, 116, 0.25)',
        'gold-xl': '0 24px 60px -12px rgba(212, 165, 116, 0.3)',
        
        // Glass shadow
        'glass': '0 8px 32px rgba(26, 25, 24, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        
        // Card hover
        'card-hover': '0 25px 50px -12px rgba(26, 25, 24, 0.12), 0 0 0 1px rgba(212, 165, 116, 0.1)',
      },
      
      // ═══════════════════════════════════════════════════════════════
      // BORDER RADIUS
      // ═══════════════════════════════════════════════════════════════
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'pill': '9999px',
      },
      
      // ═══════════════════════════════════════════════════════════════
      // ANIMATIONS - Smooth & Elegant
      // ═══════════════════════════════════════════════════════════════
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'slide-down': 'slideDown 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'border-glow': 'borderGlow 2s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2.4s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 165, 116, 0.4)' },
          '50%': { boxShadow: '0 0 0 15px rgba(212, 165, 116, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(212, 165, 116, 0.3)' },
          '50%': { borderColor: 'rgba(212, 165, 116, 0.6)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      
      // ═══════════════════════════════════════════════════════════════
      // TRANSITIONS
      // ═══════════════════════════════════════════════════════════════
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },
      
      // ═══════════════════════════════════════════════════════════════
      // BACKDROP BLUR
      // ═══════════════════════════════════════════════════════════════
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
