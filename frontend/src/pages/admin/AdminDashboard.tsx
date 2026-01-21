/**
 * Admin Dashboard for IndoHomz
 * Property Management & Analytics
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  Search,
  Home,
  Users,
  TrendingUp,
  MapPin,
  LayoutGrid,
  List,
  X,
  Save,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown
} from 'lucide-react'

// API Base URL - Works for both development and production
const getApiBaseUrl = () => {
  // Always use the Render backend URL in production
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL
  }
  if (import.meta.env.PROD) {
    return 'https://indohomz-backend.onrender.com'
  }
  return 'http://localhost:8000'
}
const API_BASE = getApiBaseUrl()

interface Property {
  id: number
  title: string
  slug: string
  price: string
  location: string
  area: string
  city: string
  property_type: string
  bedrooms: number
  bathrooms: number
  area_sqft: number
  furnishing: string
  image_url: string
  images: string
  amenities: string
  highlights: string
  description: string
  is_available: boolean
  created_at: string
}

interface Lead {
  id: number
  name: string
  email?: string
  phone: string
  property_id?: number
  message?: string
  preferred_visit_date?: string
  status: string
  source: string
  created_at: string
  updated_at?: string
}

interface AdminStats {
  total_properties: number
  available_properties: number
  total_leads: number
  recent_leads: number
}

type ActiveTab = 'properties' | 'leads'

const LEAD_STATUSES = [
  { value: 'new', label: 'New', color: 'bg-gold-50 text-gold-700 ring-1 ring-inset ring-gold-600/20' },
  { value: 'contacted', label: 'Contacted', color: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20' },
  { value: 'site_visit', label: 'Site Visit', color: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-600/20' },
  { value: 'negotiation', label: 'Negotiation', color: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20' },
  { value: 'converted', label: 'Converted', color: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' },
  { value: 'lost', label: 'Lost', color: 'bg-stone-100 text-stone-500 ring-1 ring-inset ring-stone-500/20' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ActiveTab>('properties')
  const [properties, setProperties] = useState<Property[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all')
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Get auth token
  const getToken = () => localStorage.getItem('admin_token')
  const getUser = () => {
    try {
      const user = localStorage.getItem('admin_user')
      return user ? JSON.parse(user) : { name: 'Admin', email: 'info@indohomz.com' }
    } catch (e) {
      return { name: 'Admin', email: 'info@indohomz.com' }
    }
  }

  // Check authentication
  useEffect(() => {
    const token = getToken()
    if (!token) {
      navigate('/admin/login')
    }
  }, [navigate])

  // Fetch properties
  const fetchProperties = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/v1/properties?limit=100`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
      const data = await response.json()
      setProperties(data.items || [])
    } catch (error) {
      console.error('Error fetching properties:', error)
    }
  }

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/v1/properties/stats/overview`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/v1/leads?limit=100`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
      const data = await response.json()
      setLeads(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching leads:', error)
    }
  }

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await Promise.all([fetchProperties(), fetchStats(), fetchLeads()])
      setIsLoading(false)
    }
    loadData()
  }, [])

  // Toggle availability
  const toggleAvailability = async (propertyId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(
        `${API_BASE}/api/v1/properties/${propertyId}/availability?is_available=${!currentStatus}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        }
      )

      if (response.ok) {
        setProperties(properties.map(p =>
          p.id === propertyId ? { ...p, is_available: !currentStatus } : p
        ))
        showNotification('success', `Property marked as ${!currentStatus ? 'available' : 'unavailable'}`)
      }
    } catch (error) {
      showNotification('error', 'Failed to update availability')
    }
  }

  // Delete property
  const deleteProperty = async (propertyId: number) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    try {
      const response = await fetch(`${API_BASE}/api/v1/properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })

      if (response.ok) {
        setProperties(properties.filter(p => p.id !== propertyId))
        showNotification('success', 'Property deleted successfully')
      }
    } catch (error) {
      showNotification('error', 'Failed to delete property')
    }
  }

  // Update lead status
  const updateLeadStatus = async (leadId: number, newStatus: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/api/v1/leads/${leadId}/status?new_status=${newStatus}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        }
      )

      if (response.ok) {
        setLeads(leads.map(l =>
          l.id === leadId ? { ...l, status: newStatus } : l
        ))
        showNotification('success', `Lead status updated to ${newStatus.replace('_', ' ')}`)
      }
    } catch (error) {
      showNotification('error', 'Failed to update lead status')
    }
  }

  // Delete lead
  const deleteLead = async (leadId: number) => {
    if (!confirm('Are you sure you want to delete this lead?')) return

    try {
      const response = await fetch(`${API_BASE}/api/v1/leads/${leadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })

      if (response.ok) {
        setLeads(leads.filter(l => l.id !== leadId))
        showNotification('success', 'Lead deleted successfully')
      }
    } catch (error) {
      showNotification('error', 'Failed to delete lead')
    }
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login')
  }

  // Show notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  // Filter properties
  const filteredProperties = properties.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.area?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Filter leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.email && l.email.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter
    return matchesSearch && matchesStatus
  })

  // Get property title by ID
  const getPropertyTitle = (propertyId?: number) => {
    if (!propertyId) return 'General Inquiry'
    const property = properties.find(p => p.id === propertyId)
    return property?.title || `Property #${propertyId}`
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    const statusConfig = LEAD_STATUSES.find(s => s.value === status)
    return statusConfig || { label: status, color: 'bg-gray-100 text-gray-700' }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const user = getUser()

  return (
    <div className="min-h-screen bg-luxury-cream font-sora">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-5 py-3.5 rounded-xl shadow-lg font-sora text-sm ${
              notification.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            } text-white`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Header */}
      <header className="bg-luxury-charcoal sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <img src="/logo.png" alt="IndoHomz" className="h-8 brightness-0 invert opacity-90" />
                <div className="h-6 w-px bg-stone-600" />
                <span className="text-xs font-sora font-medium text-gold-500 uppercase tracking-widest">Admin Portal</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-luxury-espresso/50 border border-stone-700/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-600 to-gold-500 flex items-center justify-center">
                  <span className="text-xs font-semibold text-luxury-charcoal">{(user?.name || 'A')[0].toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-stone-300">{user?.name || 'Admin'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-700/50 transition-all text-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-stone-700/30">
            <button
              onClick={() => setActiveTab('properties')}
              className={`relative flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'properties'
                  ? 'text-luxury-charcoal bg-gold-500'
                  : 'text-stone-400 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <Home className="h-4 w-4" />
              Properties
              <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                activeTab === 'properties' ? 'bg-luxury-charcoal/20 text-luxury-charcoal' : 'bg-stone-700/50 text-stone-400'
              }`}>
                {properties.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`relative flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'leads'
                  ? 'text-luxury-charcoal bg-gold-500'
                  : 'text-stone-400 hover:text-white hover:bg-stone-700/50'
              }`}
            >
              <Users className="h-4 w-4" />
              Leads
              <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                activeTab === 'leads' ? 'bg-luxury-charcoal/20 text-luxury-charcoal' : 'bg-stone-700/50 text-stone-400'
              }`}>
                {leads.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-stone-200/50 shadow-sm hover:shadow-md hover:border-gold-200 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Properties</p>
                <p className="text-3xl font-cormorant font-semibold text-luxury-charcoal mt-2 tabular-nums">{stats?.total_properties || properties.length}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-luxury-sand flex items-center justify-center group-hover:bg-gold-100 transition-colors">
                <Home className="h-5 w-5 text-luxury-charcoal" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-2xl p-6 border border-stone-200/50 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Available</p>
                <p className="text-3xl font-cormorant font-semibold text-emerald-600 mt-2 tabular-nums">
                  {stats?.available_properties || properties.filter(p => p.is_available).length}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-stone-200/50 shadow-sm hover:shadow-md hover:border-gold-200 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Total Leads</p>
                <p className="text-3xl font-cormorant font-semibold text-luxury-charcoal mt-2 tabular-nums">{stats?.total_leads || leads.length}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-gold-50 flex items-center justify-center group-hover:bg-gold-100 transition-colors">
                <Users className="h-5 w-5 text-gold-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-luxury-charcoal to-luxury-espresso rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gold-400 uppercase tracking-wider">This Month</p>
                <p className="text-3xl font-cormorant font-semibold text-white mt-2 tabular-nums">{stats?.recent_leads || 0}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/30 transition-colors">
                <TrendingUp className="h-5 w-5 text-gold-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* PROPERTIES TAB */}
        {activeTab === 'properties' && (
          <>
            {/* Actions Bar */}
            <div className="bg-white rounded-2xl p-4 mb-6 border border-stone-200/50 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-64 text-sm bg-luxury-sand/30 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50 focus:bg-white outline-none transition-all placeholder:text-stone-400"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setIsLoading(true)
                      fetchProperties().finally(() => setIsLoading(false))
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-600 hover:text-luxury-charcoal hover:bg-luxury-sand/50 rounded-xl transition-all"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-luxury-sand/30 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-luxury-charcoal' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-luxury-charcoal' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 text-luxury-charcoal text-sm font-semibold rounded-xl hover:from-gold-500 hover:to-gold-400 transition-all shadow-md shadow-gold-500/20"
                  >
                    <Plus className="h-4 w-4" />
                    Add Property
                  </button>
                </div>
              </div>
            </div>

            {/* Properties List */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <RefreshCw className="h-5 w-5 text-neutral-400 animate-spin mb-3" />
                <p className="text-[13px] text-neutral-500">Loading properties...</p>
              </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/50 shadow-sm hover:shadow-lg hover:border-gold-200 transition-all"
              >
                {/* Image */}
                <div className="relative h-44 bg-luxury-sand/30">
                  <img
                    src={property.image_url || '/images/placeholder.jpg'}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm ${
                      property.is_available
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-stone-800/90 text-stone-200'
                    }`}>
                      {property.is_available ? 'Available' : 'Rented'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-lg font-cormorant font-semibold text-white">{property.price}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-luxury-charcoal text-sm mb-1.5 line-clamp-1">{property.title}</h3>
                  <p className="text-xs text-stone-500 mb-3 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-gold-500" />
                    {property.area || property.location}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Bed className="h-3.5 w-3.5" />
                      {property.bedrooms || 1} Bed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="h-3.5 w-3.5" />
                      {property.bathrooms || 1} Bath
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="h-3.5 w-3.5" />
                      {property.area_sqft || '-'} sqft
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
                    <button
                      onClick={() => setEditingProperty(property)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-luxury-charcoal hover:bg-luxury-sand/50 rounded-lg transition-all"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => toggleAvailability(property.id, property.is_available)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                        property.is_available
                          ? 'text-amber-600 hover:bg-amber-50'
                          : 'text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      {property.is_available ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {property.is_available ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => deleteProperty(property.id)}
                      className="flex items-center justify-center px-2.5 py-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-lg border border-neutral-200/80 overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50/80 border-b border-neutral-200/80">
                <tr>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Property</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={property.image_url || '/images/placeholder.jpg'}
                          alt={property.title}
                          className="w-10 h-10 rounded-md object-cover ring-1 ring-neutral-200"
                        />
                        <div>
                          <p className="text-[13px] font-medium text-neutral-900">{property.title}</p>
                          <p className="text-xs text-neutral-400 capitalize">{property.property_type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600">{property.area || property.location}</td>
                    <td className="px-4 py-3 text-[13px] font-medium text-neutral-900 tabular-nums">{property.price}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ring-1 ring-inset ${
                        property.is_available
                          ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                          : 'bg-neutral-50 text-neutral-600 ring-neutral-500/20'
                      }`}>
                        {property.is_available ? 'Available' : 'Rented'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingProperty(property)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => toggleAvailability(property.id, property.is_available)}
                          className="p-1.5 text-neutral-500 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                        >
                          {property.is_available ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          onClick={() => deleteProperty(property.id)}
                          className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

            {filteredProperties.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-neutral-400" />
                </div>
                <p className="text-sm font-medium text-neutral-700">No properties found</p>
                <p className="text-xs text-neutral-400 mt-1">Get started by adding your first listing</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Add Property
                </button>
              </div>
            )}
          </>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <>
            {/* Leads Actions Bar */}
            <div className="bg-white rounded-2xl p-4 mb-6 border border-stone-200/50 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-64 text-sm bg-luxury-sand/30 border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50 focus:bg-white outline-none transition-all placeholder:text-stone-400"
                    />
                  </div>
                  
                  {/* Status Filter */}
                  <div className="relative">
                    <select
                      value={leadStatusFilter}
                      onChange={(e) => setLeadStatusFilter(e.target.value)}
                      className="appearance-none pl-4 pr-10 py-2.5 text-sm border border-stone-200 rounded-xl focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50 outline-none bg-white cursor-pointer"
                    >
                      <option value="all">All Status</option>
                      {LEAD_STATUSES.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => {
                      setIsLoading(true)
                      fetchLeads().finally(() => setIsLoading(false))
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-600 hover:text-luxury-charcoal hover:bg-luxury-sand/50 rounded-xl transition-all"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {LEAD_STATUSES.map(s => {
                    const count = leads.filter(l => l.status === s.value).length
                    if (count === 0) return null
                    return (
                      <span key={s.value} className={`px-3 py-1 rounded-lg text-xs font-medium ${s.color}`}>
                        {count} {s.label}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Leads List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <RefreshCw className="h-5 w-5 text-neutral-400 animate-spin" />
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-neutral-200/80 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-neutral-50/80 border-b border-neutral-200/80">
                    <tr>
                      <th className="text-left px-4 py-2.5 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Lead</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Contact</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Property</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Source</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                      <th className="text-right px-4 py-2.5 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="text-[13px] font-medium text-neutral-900">{lead.name}</div>
                          {lead.message && (
                            <div className="text-xs text-neutral-400 truncate max-w-[200px]" title={lead.message}>
                              {lead.message}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-0.5">
                            <a 
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900"
                            >
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </a>
                            {lead.email && (
                              <a 
                                href={`mailto:${lead.email}`}
                                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-700"
                              >
                                <Mail className="h-3 w-3" />
                                {lead.email}
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-neutral-600">
                            {getPropertyTitle(lead.property_id)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className={`px-2 py-0.5 rounded text-[11px] font-medium border-0 cursor-pointer ring-1 ring-inset ${getStatusBadge(lead.status).color}`}
                          >
                            {LEAD_STATUSES.map(s => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-neutral-400 capitalize">{lead.source}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-neutral-400 tabular-nums">{formatDate(lead.created_at)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-neutral-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                              title="WhatsApp"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                            </a>
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-1.5 text-neutral-500 hover:text-sky-600 hover:bg-sky-50 rounded transition-colors"
                              title="Call"
                            >
                              <Phone className="h-3.5 w-3.5" />
                            </a>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredLeads.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-neutral-400" />
                    </div>
                    <p className="text-sm font-medium text-neutral-700">No leads yet</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Leads will appear here when visitors inquire
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Add/Edit Property Modal */}
      <PropertyFormModal
        isOpen={showAddModal || !!editingProperty}
        onClose={() => {
          setShowAddModal(false)
          setEditingProperty(null)
        }}
        property={editingProperty}
        onSuccess={() => {
          setShowAddModal(false)
          setEditingProperty(null)
          fetchProperties()
          showNotification('success', editingProperty ? 'Property updated!' : 'Property added!')
        }}
      />
    </div>
  )
}

// Property Form Modal Component
function PropertyFormModal({
  isOpen,
  onClose,
  property,
  onSuccess
}: {
  isOpen: boolean
  onClose: () => void
  property: Property | null
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    area: '',
    city: 'Gurgaon',
    property_type: 'pg',
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 0,
    furnishing: 'furnished',
    image_url: '',
    amenities: '',
    highlights: '',
    description: '',
    is_available: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Populate form when editing
  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        price: property.price || '',
        location: property.location || '',
        area: property.area || '',
        city: property.city || 'Gurgaon',
        property_type: property.property_type || 'pg',
        bedrooms: property.bedrooms || 1,
        bathrooms: property.bathrooms || 1,
        area_sqft: property.area_sqft || 0,
        furnishing: property.furnishing || 'furnished',
        image_url: property.image_url || '',
        amenities: property.amenities || '',
        highlights: property.highlights || '',
        description: property.description || '',
        is_available: property.is_available ?? true
      })
    } else {
      // Reset form for new property
      setFormData({
        title: '',
        price: '',
        location: '',
        area: '',
        city: 'Gurgaon',
        property_type: 'pg',
        bedrooms: 1,
        bathrooms: 1,
        area_sqft: 0,
        furnishing: 'furnished',
        image_url: '',
        amenities: '',
        highlights: '',
        description: '',
        is_available: true
      })
    }
  }, [property])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const token = localStorage.getItem('admin_token')
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

    try {
      const url = property
        ? `${API_BASE}/api/v1/properties/${property.id}`
        : `${API_BASE}/api/v1/properties`

      const response = await fetch(url, {
        method: property ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Failed to save property')
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto border border-neutral-200"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-5 py-3.5 border-b border-neutral-200/80 flex items-center justify-between z-10">
          <h2 className="text-sm font-semibold text-neutral-900">
            {property ? 'Edit Property' : 'Add New Property'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors text-neutral-500 hover:text-neutral-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {error && (
            <div className="p-2.5 rounded-md bg-red-50 border border-red-200/80 text-red-600 text-xs">
              {error}
            </div>
          )}

          {/* Title & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Property Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none placeholder:text-neutral-400"
                placeholder="Sky Living - DLF Phase IV"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Price *</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none placeholder:text-neutral-400"
                placeholder="₹25,000/month"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Full Address *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none placeholder:text-neutral-400"
                placeholder="House No. 123, DLF Phase IV, Gurgaon"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Area/Sector</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none placeholder:text-neutral-400"
                placeholder="DLF Phase IV"
              />
            </div>
          </div>

          {/* Type & Details */}
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Property Type</label>
              <select
                value={formData.property_type}
                onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none"
              >
                <option value="pg">PG / Co-Living</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Bedrooms</label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none"
                min="0"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Bathrooms</label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none"
                min="0"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Area (sqft)</label>
              <input
                type="number"
                value={formData.area_sqft}
                onChange={(e) => setFormData({ ...formData, area_sqft: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none"
                min="0"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Main Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none placeholder:text-neutral-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Amenities (comma-separated)</label>
            <input
              type="text"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none placeholder:text-neutral-400"
              placeholder="WiFi, AC, Parking, Security, Power Backup"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wide mb-1.5">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 outline-none resize-none placeholder:text-neutral-400"
              placeholder="Describe the property..."
            />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="is_available"
              checked={formData.is_available}
              onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
              className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-500"
            />
            <label htmlFor="is_available" className="text-xs font-medium text-neutral-600">
              Property is available for rent
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-2 pt-4 border-t border-neutral-200/80">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  {property ? 'Update' : 'Add Property'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
