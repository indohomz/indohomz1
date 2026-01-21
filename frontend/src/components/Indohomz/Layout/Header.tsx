/**
 * Indohomz - Luxury Header
 * Floating navigation with premium styling and gold accents
 */

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../Brand/Logo'

interface HeaderProps {
  variant?: 'light' | 'dark'
}

export default function Header({ variant = 'light' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const isDark = variant === 'dark'
  
  const headerBg = isScrolled 
    ? (isDark 
        ? 'bg-luxury-charcoal/95 backdrop-blur-2xl border-b border-gold-500/10' 
        : 'bg-white/95 backdrop-blur-2xl border-b border-gold-500/10 shadow-sm'
      )
    : 'bg-transparent'

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury ${headerBg}`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Logo variant={isDark ? 'dark' : 'light'} size="md" />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex items-center gap-14"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <NavLink to="/properties" isDark={isDark} isScrolled={isScrolled}>Homes</NavLink>
              <NavLink to="/about" isDark={isDark} isScrolled={isScrolled}>About</NavLink>
              <NavLink to="/contact" isDark={isDark} isScrolled={isScrolled}>Contact</NavLink>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="hidden md:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link 
                to="/contact"
                className={`group relative px-6 py-3 rounded-full text-sm font-sans font-medium tracking-wide overflow-hidden transition-all duration-500 ${
                  isDark || !isScrolled
                    ? 'bg-gold-500 text-luxury-charcoal hover:bg-gold-400 hover:shadow-gold-md' 
                    : 'bg-luxury-charcoal text-white hover:bg-luxury-espresso'
                }`}
              >
                <span className="relative z-10">Get in Touch</span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen 
                  ? { rotate: 45, y: 6, backgroundColor: '#D4A574' } 
                  : { rotate: 0, y: 0, backgroundColor: isDark || isMobileMenuOpen ? '#FAF8F5' : '#1A1918' }
                }
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 origin-center block"
              />
              <motion.span
                animate={isMobileMenuOpen 
                  ? { opacity: 0, scaleX: 0 } 
                  : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className={`w-6 h-0.5 mt-1.5 ${isDark ? 'bg-white' : 'bg-luxury-charcoal'}`}
              />
              <motion.span
                animate={isMobileMenuOpen 
                  ? { rotate: -45, y: -6, backgroundColor: '#D4A574' } 
                  : { rotate: 0, y: 0, backgroundColor: isDark || isMobileMenuOpen ? '#FAF8F5' : '#1A1918' }
                }
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 mt-1.5 origin-center block"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden bg-luxury-charcoal"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-pattern-luxury opacity-5" />
            
            {/* Gold accent */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-600 origin-top"
            />

            <div className="flex flex-col justify-center items-center h-full px-8">
              <nav className="flex flex-col items-center gap-8">
                <MobileNavLink to="/properties" index={0}>
                  Homes
                </MobileNavLink>
                <MobileNavLink to="/about" index={1}>
                  About
                </MobileNavLink>
                <MobileNavLink to="/contact" index={2}>
                  Contact
                </MobileNavLink>
              </nav>

              {/* CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-16"
              >
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-luxury-charcoal rounded-full font-sans font-medium tracking-wide hover:bg-gold-400 transition-colors"
                >
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              {/* Contact info */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3"
              >
                <a href="tel:+919053070100" className="text-stone-400 text-sm font-sans hover:text-gold-500 transition-colors">
                  +91 90530 70100
                </a>
                <a href="mailto:info@indohomz.com" className="text-stone-500 text-sm font-sans hover:text-gold-500 transition-colors">
                  info@indohomz.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ 
  to, 
  children, 
  isDark,
  isScrolled
}: { 
  to: string
  children: React.ReactNode
  isDark: boolean
  isScrolled: boolean
}) {
  const location = useLocation()
  const isActive = location.pathname === to
  
  const textColor = isDark || !isScrolled
    ? 'text-white/80 hover:text-gold-500' 
    : 'text-stone-600 hover:text-luxury-charcoal'
  
  return (
    <Link 
      to={to}
      className={`relative text-sm font-sans font-normal tracking-wide ${textColor} transition-colors duration-300 py-2`}
    >
      {children}
      {/* Active indicator */}
      <motion.span 
        className="absolute -bottom-1 left-0 right-0 h-px bg-gold-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Hover indicator */}
      <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold-500/50 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left" />
    </Link>
  )
}

function MobileNavLink({ 
  to, 
  children,
  index
}: { 
  to: string
  children: React.ReactNode
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link 
        to={to}
        className="group relative block text-4xl font-display font-light text-white hover:text-gold-500 transition-colors duration-300"
      >
        {children}
        <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-500" />
      </Link>
    </motion.div>
  )
}
