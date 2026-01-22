/**
 * Indohomz - Luxury Footer
 * Premium dark footer with gold accents
 * Elegant typography and smooth animations
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-luxury-charcoal text-white overflow-hidden">
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-pattern-luxury opacity-5" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-8">
              <img 
                src="/logo.png" 
                alt="Indohomz" 
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-stone-400 font-sans font-light leading-relaxed max-w-md mb-8">
              Curated homes for those who appreciate comfort, privacy, and the art of living well. 
              Experience luxury co-living in Gurgaon's finest neighborhoods.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <SocialLink href="https://instagram.com/indohomz" label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://linkedin.com/company/indohomz" label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://twitter.com/indohomz" label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-500 text-xs font-sans font-medium uppercase tracking-[0.2em] mb-8">
              Explore
            </h4>
            <ul className="space-y-4">
              <FooterLink to="/properties">All Homes</FooterLink>
              <FooterLink to="/properties?type=pg">Co-Living Spaces</FooterLink>
              <FooterLink to="/properties?type=apartment">Apartments</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
            
            {/* Business Section - Subtle but Professional */}
            <div className="mt-10 pt-8 border-t border-stone-800">
              <h4 className="text-stone-500 text-xs font-sans font-medium uppercase tracking-[0.15em] mb-4">
                For Partners
              </h4>
              <Link 
                to="/admin/login" 
                className="inline-flex items-center gap-2 text-stone-400 text-sm font-sans font-light hover:text-gold-500 transition-all duration-300 group"
              >
                <span className="w-6 h-6 rounded border border-stone-700 flex items-center justify-center group-hover:border-gold-500 group-hover:bg-gold-500/10 transition-all duration-300">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                Admin Dashboard
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold-500 text-xs font-sans font-medium uppercase tracking-[0.2em] mb-8">
              Connect
            </h4>
            <ul className="space-y-5">
              <li>
                <a 
                  href="tel:+919053070100" 
                  className="group flex items-center gap-3 text-stone-400 hover:text-gold-500 transition-colors duration-300"
                >
                  <span className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-gold-500 transition-colors duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <span className="font-sans font-light">+91 90530 70100</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@indohomz.com" 
                  className="group flex items-center gap-3 text-stone-400 hover:text-gold-500 transition-colors duration-300"
                >
                  <span className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-gold-500 transition-colors duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="font-sans font-light">info@indohomz.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/919053070100" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-stone-400 hover:text-gold-500 transition-colors duration-300"
                >
                  <span className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-gold-500 transition-colors duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </span>
                  <span className="font-sans font-light">WhatsApp</span>
                </a>
              </li>
            </ul>
            
            {/* Location */}
            <div className="mt-8 pt-8 border-t border-stone-800">
              <p className="text-stone-500 text-sm font-sans font-light">
                Gurgaon, Haryana, India
              </p>
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm font-sans font-light">
            © {currentYear} Indohomz. All rights reserved.
          </p>
          <div className="flex items-center gap-6 md:gap-8">
            <Link 
              to="/privacy" 
              className="text-stone-500 text-sm font-sans font-light hover:text-gold-500 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-stone-500 text-sm font-sans font-light hover:text-gold-500 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            {/* Partner Portal - Professional Admin Access */}
            <Link 
              to="/admin/login" 
              className="text-stone-600 text-sm font-sans font-light hover:text-gold-500 transition-colors duration-300 flex items-center gap-1.5 group"
            >
              <svg 
                className="w-3.5 h-3.5 text-stone-600 group-hover:text-gold-500 transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Partner Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold-500/20" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold-500/20" />
      </div>
    </footer>
  )
}

// Social Link Component
function SocialLink({ 
  href, 
  label, 
  children 
}: { 
  href: string
  label: string
  children: React.ReactNode 
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center 
                 text-stone-400 hover:border-gold-500 hover:text-gold-500 hover:bg-gold-500/10
                 transition-all duration-300"
    >
      {children}
    </a>
  )
}

// Footer Link Component
function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        to={to}
        className="text-stone-400 font-sans font-light hover:text-gold-500 transition-colors duration-300 inline-flex items-center gap-2 group"
      >
        <span className="w-0 h-px bg-gold-500 group-hover:w-3 transition-all duration-300" />
        {children}
      </Link>
    </li>
  )
}
