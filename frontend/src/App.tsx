/**
 * Indohomz - Luxury Living Platform
 * Premium routing with elegant page transitions
 * Calm. Premium. Global. Aspirational.
 */

import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IndohomzLanding from './pages/IndohomzLanding'
import ErrorBoundary from './components/Common/ErrorBoundary'
import LuxuryLoader from './components/Common/LuxuryLoader'

// Code-split pages - Premium Design
const IndohomzProperties = lazy(() => import('./pages/IndohomzProperties'))
const IndohomzPropertyDetail = lazy(() => import('./pages/IndohomzPropertyDetail'))
const IndohomzAbout = lazy(() => import('./pages/IndohomzAbout'))
const IndohomzContact = lazy(() => import('./pages/IndohomzContact'))

// Legacy pages (kept for compatibility)
const Properties = lazy(() => import('./pages/Properties'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const Landing = lazy(() => import('./pages/Landing'))

// Admin pages (code-split)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

// Luxury Error Fallback
const LuxuryErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-luxury-cream px-6">
    <div className="max-w-lg w-full text-center">
      {/* Gold accent */}
      <div className="w-16 h-px bg-gold-500 mx-auto mb-10" />
      
      <h1 className="font-display text-4xl md:text-5xl text-luxury-charcoal font-light mb-6">
        Something went wrong
      </h1>
      <p className="text-stone-500 font-sans font-light mb-10 leading-relaxed">
        We apologize for the inconvenience. Please try refreshing the page or return to our homepage.
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-luxury-charcoal rounded-full font-sans font-medium tracking-wide hover:bg-gold-400 transition-colors duration-300"
      >
        Return Home
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  </div>
)

// Page transition wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {children}
  </motion.div>
)

function App() {
  const location = useLocation()

  return (
    <ErrorBoundary fallback={<LuxuryErrorFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Premium Landing Page */}
          <Route path="/" element={
            <PageWrapper>
              <IndohomzLanding />
            </PageWrapper>
          } />
          
          {/* Premium Properties Listing */}
          <Route 
            path="/properties" 
            element={
              <Suspense fallback={<LuxuryLoader />}>
                <PageWrapper>
                  <IndohomzProperties />
                </PageWrapper>
              </Suspense>
            } 
          />
          
          {/* Premium Property Detail */}
          <Route 
            path="/property/:slug" 
            element={
              <Suspense fallback={<LuxuryLoader />}>
                <PageWrapper>
                  <IndohomzPropertyDetail />
                </PageWrapper>
              </Suspense>
            } 
          />

          {/* Living Experiences - redirects to properties with filter */}
          <Route path="/experiences" element={<Navigate to="/properties" replace />} />
          
          {/* About Page */}
          <Route 
            path="/about" 
            element={
              <Suspense fallback={<LuxuryLoader />}>
                <PageWrapper>
                  <IndohomzAbout />
                </PageWrapper>
              </Suspense>
            } 
          />
          
          {/* Contact Page */}
          <Route 
            path="/contact" 
            element={
              <Suspense fallback={<LuxuryLoader />}>
                <PageWrapper>
                  <IndohomzContact />
                </PageWrapper>
              </Suspense>
            } 
          />

          {/* Legacy routes - redirect to new design */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/products" element={<Navigate to="/properties" replace />} />

          {/* Legacy pages (accessible via /legacy prefix) */}
          <Route 
            path="/legacy" 
            element={
              <Suspense fallback={<LuxuryLoader />}>
                <Landing />
              </Suspense>
            } 
          />
          <Route 
            path="/legacy/properties" 
            element={
              <Suspense fallback={<LuxuryLoader />}>
                <Properties />
              </Suspense>
            } 
          />
          <Route 
            path="/legacy/property/:slug" 
            element={
              <Suspense fallback={<LuxuryLoader />}>
                <PropertyDetail />
              </Suspense>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/login" 
            element={
              <Suspense fallback={<LuxuryLoader />}>
                <AdminLogin />
              </Suspense>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <Suspense fallback={<LuxuryLoader />}>
                <AdminDashboard />
              </Suspense>
            } 
          />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

          {/* 404 - Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  )
}

// Luxury 404 Page
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream px-6">
      <div className="max-w-lg w-full text-center">
        {/* Large 404 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[150px] md:text-[200px] leading-none text-stone-200 font-light"
        >
          404
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Gold accent */}
          <div className="w-16 h-px bg-gold-500 mx-auto mb-8" />
          
          <h1 className="font-display text-3xl md:text-4xl text-luxury-charcoal font-light mb-4">
            Page not found
          </h1>
          <p className="text-stone-500 font-sans font-light mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <a
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-luxury-charcoal text-white rounded-full font-sans font-medium tracking-wide hover:bg-gold-500 hover:text-luxury-charcoal transition-all duration-500"
          >
            Back to Home
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default App
