/**
 * Indohomz - Minimal Header
 * Clean, floating navigation with premium logo
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../Brand/Logo'

interface HeaderProps {
  variant?: 'light' | 'dark'
}

export default function Header({ variant = 'light' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isDark = variant === 'dark'
  const textColor = isDark ? 'text-white' : 'text-stone-900'
  const bgColor = isScrolled 
    ? (isDark ? 'bg-stone-950/90' : 'bg-white/90') 
    : 'bg-transparent'

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgColor} ${isScrolled ? 'backdrop-blur-xl' : ''}`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="relative z-10">
            <Logo variant={isDark ? 'dark' : 'light'} size="md" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <NavLink to="/properties" isDark={isDark}>Homes</NavLink>
            <NavLink to="/about" isDark={isDark}>About</NavLink>
            <NavLink to="/contact" isDark={isDark}>Contact</NavLink>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link 
              to="/contact"
              className={`px-5 py-2.5 rounded-full text-sm font-medium ${isDark ? 'bg-white text-stone-900 hover:bg-stone-100' : 'bg-stone-900 text-white hover:bg-stone-800'} transition-colors`}
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden relative z-10 w-8 h-8 flex flex-col justify-center items-center gap-1.5 ${textColor}`}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-current origin-center"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-current"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-current origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-stone-100"
          >
            <div className="px-6 py-8 space-y-6">
              <MobileNavLink to="/properties" onClick={() => setIsMobileMenuOpen(false)}>
                Homes
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </MobileNavLink>
              <div className="pt-6 border-t border-stone-100">
                <Link 
                  to="/contact"
                  className="inline-block px-6 py-3 bg-stone-900 text-white rounded-full font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({ 
  to, 
  children, 
  isDark 
}: { 
  to: string
  children: React.ReactNode
  isDark: boolean 
}) {
  const textColor = isDark ? 'text-white/80 hover:text-white' : 'text-stone-600 hover:text-stone-900'
  
  return (
    <Link 
      to={to}
      className={`text-sm font-normal ${textColor} transition-colors duration-200`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ 
  to, 
  children, 
  onClick 
}: { 
  to: string
  children: React.ReactNode
  onClick: () => void 
}) {
  return (
    <Link 
      to={to}
      onClick={onClick}
      className="block text-2xl font-light text-stone-900 hover:text-stone-600 transition-colors"
    >
      {children}
    </Link>
  )
}
