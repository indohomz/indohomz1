/**
 * Indohomz - Premium Lifestyle-First Living Platform
 * Calm. Premium. Global. Aspirational.
 */

import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import IndohomzLanding from './pages/IndohomzLanding'
import ErrorBoundary from './components/Common/ErrorBoundary'

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

// Loading Spinner - Premium minimal design
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="w-12 h-12 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
      <p className="text-stone-400 text-sm tracking-wide">Loading...</p>
    </div>
  </div>
)

// Error fallback - Premium design
const AppErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white px-6">
    <div className="max-w-md w-full text-center">
      <h1 className="text-3xl font-light text-stone-900 mb-4">Something went wrong</h1>
      <p className="text-stone-500 mb-8">We're sorry, but something unexpected happened.</p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-8 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
      >
        Go Home
      </button>
    </div>
  </div>
)

function App() {
  return (
    <ErrorBoundary fallback={<AppErrorFallback />}>
      <Routes>
        {/* Premium Landing Page */}
        <Route path="/" element={<IndohomzLanding />} />
        
        {/* Premium Properties Listing */}
        <Route 
          path="/properties" 
          element={
            <Suspense fallback={<PageLoader />}>
              <IndohomzProperties />
            </Suspense>
          } 
        />
        
        {/* Premium Property Detail */}
        <Route 
          path="/property/:slug" 
          element={
            <Suspense fallback={<PageLoader />}>
              <IndohomzPropertyDetail />
            </Suspense>
          } 
        />

        {/* Living Experiences - redirects to properties with filter */}
        <Route path="/experiences" element={<Navigate to="/properties" replace />} />
        
        {/* About Page */}
        <Route 
          path="/about" 
          element={
            <Suspense fallback={<PageLoader />}>
              <IndohomzAbout />
            </Suspense>
          } 
        />
        
        {/* Contact Page */}
        <Route 
          path="/contact" 
          element={
            <Suspense fallback={<PageLoader />}>
              <IndohomzContact />
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
            <Suspense fallback={<PageLoader />}>
              <Landing />
            </Suspense>
          } 
        />
        <Route 
          path="/legacy/properties" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Properties />
            </Suspense>
          } 
        />
        <Route 
          path="/legacy/property/:slug" 
          element={
            <Suspense fallback={<PageLoader />}>
              <PropertyDetail />
            </Suspense>
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/login" 
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminLogin />
            </Suspense>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminDashboard />
            </Suspense>
          } 
        />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
