/**
 * ThemeProvider - Night Mode Support
 * Premium brands look better in dark mode
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'day' | 'night'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('indohomz-theme') as Theme
      return saved || 'day'
    }
    return 'day'
  })

  useEffect(() => {
    localStorage.setItem('indohomz-theme', theme)
    
    // Apply theme class to document
    if (theme === 'night') {
      document.documentElement.classList.add('night-mode')
      document.documentElement.style.setProperty('--bg-primary', '#1c1917')
      document.documentElement.style.setProperty('--bg-secondary', '#292524')
      document.documentElement.style.setProperty('--text-primary', '#fafaf9')
      document.documentElement.style.setProperty('--text-secondary', '#a8a29e')
    } else {
      document.documentElement.classList.remove('night-mode')
      document.documentElement.style.setProperty('--bg-primary', '#fafaf9')
      document.documentElement.style.setProperty('--bg-secondary', '#f5f5f4')
      document.documentElement.style.setProperty('--text-primary', '#1c1917')
      document.documentElement.style.setProperty('--text-secondary', '#78716c')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'day' ? 'night' : 'day')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme Toggle Button Component
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`group flex items-center gap-2 text-sm transition-colors ${className}`}
      aria-label={`Switch to ${theme === 'day' ? 'night' : 'day'} mode`}
    >
      {theme === 'day' ? (
        <>
          <svg 
            className="w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-colors" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
          <span className="text-stone-400 group-hover:text-stone-600 transition-colors">
            Night View
          </span>
        </>
      ) : (
        <>
          <svg 
            className="w-4 h-4 text-stone-400 group-hover:text-stone-200 transition-colors" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
          <span className="text-stone-400 group-hover:text-stone-200 transition-colors">
            Day View
          </span>
        </>
      )}
    </button>
  )
}
