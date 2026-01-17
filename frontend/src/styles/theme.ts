/**
 * Indohomz - Premium Design System
 * Calm, Premium, Global, Aspirational
 */

export const theme = {
  colors: {
    // Neutral palette - warm grays
    stone: {
      50: '#FAFAF9',
      100: '#F5F5F4',
      200: '#E7E5E4',
      300: '#D6D3D1',
      400: '#A8A29E',
      500: '#78716C',
      600: '#57534E',
      700: '#44403C',
      800: '#292524',
      900: '#1C1917',
      950: '#0C0A09',
    },
    // Accent - subtle warm
    accent: {
      primary: '#1C1917',
      secondary: '#78716C',
      muted: '#A8A29E',
    },
    // Background
    background: {
      primary: '#FFFFFF',
      secondary: '#FAFAF9',
      tertiary: '#F5F5F4',
    },
    // Text
    text: {
      primary: '#1C1917',
      secondary: '#57534E',
      muted: '#78716C',
      inverted: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: {
      display: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    sizes: {
      heroTitle: 'clamp(3rem, 8vw, 6rem)',
      sectionTitle: 'clamp(2rem, 5vw, 3.5rem)',
      subheading: 'clamp(1.25rem, 2vw, 1.5rem)',
      body: '1rem',
      small: '0.875rem',
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    section: 'clamp(6rem, 12vw, 10rem)',
    container: 'max-w-7xl mx-auto px-6 lg:px-12',
  },
  animation: {
    duration: {
      fast: 0.2,
      normal: 0.4,
      slow: 0.8,
    },
    easing: {
      smooth: [0.4, 0, 0.2, 1],
      bounce: [0.34, 1.56, 0.64, 1],
    },
  },
} as const

export type Theme = typeof theme
