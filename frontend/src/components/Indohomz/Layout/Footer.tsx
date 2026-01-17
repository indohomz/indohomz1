/**
 * Indohomz - Minimal Footer
 * Clean, elegant, brand-focused
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <img 
                src="/logo.png" 
                alt="Indohomz" 
                className="h-16 w-auto brightness-0 invert"
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-stone-400 text-lg font-light"
            >
              Live Better.
            </motion.p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              {/* Explore */}
              <div>
                <h3 className="text-stone-500 text-sm uppercase tracking-wider mb-6">
                  Explore
                </h3>
                <ul className="space-y-4">
                  <FooterLink to="/properties">All Homes</FooterLink>
                  <FooterLink to="/experiences">Living Experiences</FooterLink>
                  <FooterLink to="/locations">Locations</FooterLink>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-stone-500 text-sm uppercase tracking-wider mb-6">
                  Company
                </h3>
                <ul className="space-y-4">
                  <FooterLink to="/about">About</FooterLink>
                  <FooterLink to="/contact">Contact</FooterLink>
                  <FooterLink to="/careers">Careers</FooterLink>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-stone-500 text-sm uppercase tracking-wider mb-6">
                  Legal
                </h3>
                <ul className="space-y-4">
                  <FooterLink to="/privacy">Privacy</FooterLink>
                  <FooterLink to="/terms">Terms</FooterLink>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-stone-500 text-sm">
              © {new Date().getFullYear()} Indohomz. All rights reserved.
            </p>
            <p className="text-stone-600 text-sm">
              Gurgaon · Bangalore · Pune
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        to={to}
        className="text-stone-300 hover:text-white transition-colors duration-200 text-sm"
      >
        {children}
      </Link>
    </li>
  )
}
