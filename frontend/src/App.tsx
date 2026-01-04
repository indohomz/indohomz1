/**
 * IndoHomz - Premium Co-Living Platform
 * Main Application Router
 */

import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Landing from './pages/Landing'
import ErrorBoundary from './components/Common/ErrorBoundary'

// Code-split pages
const Properties = lazy(() => import('./pages/Properties'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))

// Admin pages (code-split)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

// Loading Spinner - Light theme
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  </div>
)

// Error fallback for entire app
const AppErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="max-w-md w-full text-center">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
      <p className="text-gray-600 mb-6">We're sorry, but something unexpected happened.</p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
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
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />
      
      {/* Properties Listing */}
      <Route 
        path="/properties" 
        element={
          <Suspense fallback={<PageLoader />}>
            <Properties />
          </Suspense>
        } 
      />
      
      {/* Property Detail */}
      <Route 
        path="/property/:slug" 
        element={
          <Suspense fallback={<PageLoader />}>
            <PropertyDetail />
          </Suspense>
        } 
      />
      
      {/* Redirects for old routes */}
      <Route path="/home" element={<Landing />} />
      <Route path="/dashboard" element={<Landing />} />
      <Route path="/products" element={<Suspense fallback={<PageLoader />}><Properties /></Suspense>} />
      
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
