/**
 * Admin Login Page for IndoHomz
 * Luxury authentication for property management
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react'

// API Base URL - Works for both development and production
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL
  }
  if (import.meta.env.PROD) {
    return 'https://indohomz-backend.onrender.com'
  }
  return 'http://localhost:8000'
}
const API_BASE = getApiBaseUrl()

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed')
      }

      // Store token
      localStorage.setItem('admin_token', data.access_token)
      
      // Decode user info from JWT token
      try {
        const tokenParts = data.access_token.split('.')
        const payload = JSON.parse(atob(tokenParts[1]))
        localStorage.setItem('admin_user', JSON.stringify({
          id: payload.user_id,
          email: payload.email,
          role: payload.role,
          name: payload.email.split('@')[0]
        }))
      } catch (e) {
        console.error('Failed to decode token:', e)
      }
      
      // Redirect to admin dashboard
      navigate('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-luxury-charcoal flex items-center justify-center p-4 relative overflow-hidden">
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-espresso to-luxury-charcoal" />
        
        {/* Gold accent gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-3xl" />
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A574' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <Link to="/">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <img 
                src="/logo.png" 
                alt="IndoHomz" 
                className="h-16 mx-auto mb-6 brightness-0 invert opacity-90"
              />
            </motion.div>
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-cormorant font-light text-white mb-2 tracking-wide"
          >
            Admin Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-stone-400 font-sora text-sm"
          >
            Manage your luxury properties
          </motion.p>
        </div>

        {/* Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-luxury-espresso/50 backdrop-blur-xl rounded-2xl p-8 border border-gold-500/10 shadow-2xl"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
              >
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-300 font-sora">{error}</span>
              </motion.div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-sora font-medium text-stone-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500 group-focus-within:text-gold-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-luxury-charcoal/50 border border-stone-700/50 text-white font-sora placeholder:text-stone-600 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all"
                  placeholder="info@indohomz.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-xs font-sora font-medium text-stone-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500 group-focus-within:text-gold-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-luxury-charcoal/50 border border-stone-700/50 text-white font-sora placeholder:text-stone-600 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-gold-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-luxury-charcoal font-sora font-semibold text-sm tracking-wide hover:from-gold-500 hover:to-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-luxury-charcoal/30 border-t-luxury-charcoal rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Security Note */}
          <div className="mt-8 pt-6 border-t border-stone-700/30">
            <p className="text-xs text-stone-500 text-center flex items-center justify-center gap-2 font-sora">
              <Lock className="h-3.5 w-3.5" />
              Secure login with 256-bit SSL encryption
            </p>
          </div>
        </motion.div>

        {/* Back to Site */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-stone-500 hover:text-gold-500 text-sm font-sora transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to IndoHomz
          </Link>
        </motion.div>

        {/* Demo Credentials Hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 p-4 rounded-lg bg-gold-500/5 border border-gold-500/10"
        >
          <p className="text-xs text-stone-500 font-sora">
            <span className="text-gold-500">Demo:</span> info@indohomz.com / Admin@2024
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
