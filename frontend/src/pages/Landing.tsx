/**
 * IndoHomz - Premium Light Theme Landing Page
 * Professional, Clean, Video-First with Google Maps
 */

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  MapPin, 
  Shield, 
  Star, 
  ArrowRight, 
  Building2,
  Sparkles,
  Phone,
  MessageCircle,
  CheckCircle2,
  Zap,
  Heart,
  Play,
  Pause,
  Search,
  Home,
  Wifi,
  Dumbbell,
  Wind,
  Users,
  Clock,
  BadgeCheck,
  ChevronRight,
  Globe,
  Headphones,
  CreditCard,
  Award,
  Navigation,
  Map as MapIcon,
  Mail
} from 'lucide-react'
import SEO, { FAQSchema } from '../components/Common/SEO'
import LeadModal from '../components/LeadCapture/LeadModal'
import FloatingCTA from '../components/LeadCapture/FloatingCTA'
import { PROPERTIES as REAL_PROPERTIES } from '../data/properties'

// FAQ data for schema
const LANDING_FAQS = [
  {
    question: "What is IndoHomz?",
    answer: "IndoHomz is a premium co-living and rental apartment platform in Gurgaon, offering fully-furnished rooms, zero brokerage, and instant booking."
  },
  {
    question: "Is there any brokerage fee?",
    answer: "No, IndoHomz offers zero brokerage. You pay only the rent and security deposit directly to the property."
  },
  {
    question: "What areas in Gurgaon does IndoHomz cover?",
    answer: "We cover major areas including DLF Cybercity, Golf Course Road, Sector 24, Sector 54, MG Road, and Sohna Road."
  },
  {
    question: "What amenities are included?",
    answer: "All properties include WiFi, AC, housekeeping, security, and access to common areas. Premium properties also include gym, pool, and food services."
  }
]

// 3D Tilt Card Component
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Use real properties from data file with display formatting
const PROPERTIES = REAL_PROPERTIES.map((p, index) => ({
  id: p.id,
  title: p.title,
  subtitle: p.property_type === 'villa' ? 'Premium Villa Living' : 
            p.property_type === 'pg' ? 'Co-Living Excellence' : 
            p.property_type === 'apartment' ? 'Modern Apartment' : 'Premium Property',
  price: p.price.replace('/month', ''),
  location: p.area + ', ' + p.city,
  image: p.image_url,
  beds: p.bedrooms,
  baths: p.bathrooms,
  sqft: p.area_sqft,
  amenities: p.amenities.split(',').slice(0, 3).map(a => a.trim()),
  rating: 4.9,
  reviews: 5000,
  badge: index === 0 ? 'Premium Villa' : index === 1 ? 'Best Value' : index === 2 ? 'Luxury Living' : 'Top Rated',
  color: index === 0 ? 'indigo' : index === 1 ? 'emerald' : index === 2 ? 'amber' : 'cyan',
  slug: p.slug
}))

const TESTIMONIALS = [
  {
    name: "Aditya Sharma",
    role: "Engineering Lead, Microsoft",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    text: "IndoHomz redefined my expectations of rental living. The seamless digital experience—from virtual tours to instant documentation—is truly exceptional. Moved into my dream apartment within 48 hours.",
    rating: 5
  },
  {
    name: "Priya Kapoor",
    role: "Senior Designer, Figma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    text: "Relocating from Bangalore, I needed a trustworthy platform. IndoHomz delivered with verified listings, transparent pricing, and exceptional concierge support. A truly premium experience for professionals.",
    rating: 5
  },
  {
    name: "Rahul Verma",
    role: "MBA Alumnus, ISB Hyderabad",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    text: "Beyond just accommodation—it's a lifestyle. The curated community events and networking opportunities have been invaluable. IndoHomz truly understands what ambitious professionals seek.",
    rating: 5
  }
]

const STATS = [
  { value: "5,000+", label: "Tenants Served", icon: Users },
  { value: "7", label: "Premium Properties", icon: Building2 },
  { value: "3.2 Lacs+", label: "Nights Stayed", icon: Star },
  { value: "0-3 yrs", label: "Properties Age", icon: Building2 }
]

const LOCATIONS = [
  { name: "DLF Cybercity", count: 12 },
  { name: "Golf Course Road", count: 9 },
  { name: "MG Road", count: 10 },
  { name: "Sohna Road", count: 10 },
  { name: "HUDA City Centre", count: 7 },
  { name: "Golf Course Extension Road", count: 9 }
]

// Premium Property Card
const PropertyCard = ({ property, index }: { property: typeof PROPERTIES[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const colorClasses: Record<string, { badge: string; btn: string }> = {
    indigo: { badge: 'bg-indigo-500', btn: 'from-indigo-600 to-indigo-500' },
    cyan: { badge: 'bg-cyan-500', btn: 'from-cyan-600 to-cyan-500' },
    emerald: { badge: 'bg-emerald-500', btn: 'from-emerald-600 to-emerald-500' },
    amber: { badge: 'bg-amber-500', btn: 'from-amber-600 to-amber-500' },
  }
  
  const colors = colorClasses[property.color] || colorClasses.indigo

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard>
        <Link 
          to={`/property/${property.slug || property.id}`}
          className="block group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-indigo-100">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <motion.img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${colors.badge} text-white shadow-lg`}>
                  {property.badge}
                </span>
              </div>
              
              {/* Like Button */}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-all shadow-lg"
              >
                <Heart className="h-5 w-5 text-gray-600 hover:text-rose-500 transition-colors" />
              </motion.button>
              
              {/* Price */}
              <div className="absolute bottom-4 left-4">
                <p className="text-2xl font-bold text-white text-shadow">{property.price}</p>
                <p className="text-white/80 text-sm">per month</p>
              </div>
              
              {/* Rating */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur shadow">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-gray-800 text-sm font-semibold">{property.rating}</span>
                <span className="text-gray-500 text-xs">({property.reviews})</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wider mb-1">{property.subtitle}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {property.title}
              </h3>
              
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin className="h-4 w-4 text-indigo-500" />
                <span className="text-sm">{property.location}</span>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                <span className="text-gray-600 text-sm">{property.beds} Bed</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600 text-sm">{property.baths} Bath</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600 text-sm">{property.sqft} sqft</span>
              </div>
              
              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-5">
                {property.amenities.slice(0, 3).map((amenity, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                    {amenity}
                  </span>
                ))}
              </div>
              
              {/* CTA */}
              <motion.div 
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${colors.btn} text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Property
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}

// Feature Card
const FeatureCard = ({ icon: Icon, title, description, delay = 0, color = "indigo" }: any) => {
  const colorClasses: Record<string, string> = {
    indigo: 'from-indigo-500 to-indigo-600',
    cyan: 'from-cyan-500 to-cyan-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    rose: 'from-rose-500 to-rose-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="relative h-full p-7 rounded-2xl bg-white border border-gray-100 hover:border-indigo-100 transition-all shadow-lg hover:shadow-xl overflow-hidden">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-5 shadow-lg`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

// Testimonial Card
const TestimonialCard = ({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="group"
  >
    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-500/50 transition-all shadow-2xl hover:shadow-cyan-500/20 h-full">
      {/* Quote mark */}
      <div className="absolute top-5 right-5 text-5xl font-serif text-cyan-500/20">"</div>
      
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      
      <p className="text-gray-300 leading-relaxed mb-6 text-sm">"{testimonial.text}"</p>
      
      <div className="flex items-center gap-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/50"
        />
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        </div>
        <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
          <BadgeCheck className="h-3 w-3" /> Verified
        </span>
      </div>
    </div>
  </motion.div>
)

export default function Landing() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [searchLocation, setSearchLocation] = useState('')
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const toggleVideo = () => {
    if (videoRef.current) {
      isVideoPlaying ? videoRef.current.pause() : videoRef.current.play()
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  // Generate Google Maps URL for search
  const handleLocationSearch = () => {
    if (searchLocation.trim()) {
      const encoded = encodeURIComponent(searchLocation + ', Gurgaon, Haryana, India')
      window.open(`https://www.google.com/maps/search/${encoded}`, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* SEO Meta Tags */}
      <SEO 
        title="Premium Co-Living & Rental Apartments in Gurgaon"
        description="Find your perfect home with IndoHomz. Premium co-living spaces, fully-furnished apartments, and verified PGs in Gurgaon. Zero brokerage, instant booking, 24/7 support."
        keywords={['PG in Gurgaon', 'co-living spaces', 'rental apartments', 'furnished rooms', 'DLF Cybercity PG', 'Golf Course Road apartments']}
        url="/"
      />
      <FAQSchema faqs={LANDING_FAQS} />
      
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pattern-dots opacity-40 pointer-events-none" />
      <div className="fixed inset-0 mesh-gradient-light pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3"
              onClick={(e) => {
                const now = Date.now()
                const clicks = (window as any).logoClicks || []
                clicks.push(now)
                
                // Keep only clicks from last 2 seconds
                const recentClicks = clicks.filter((time: number) => now - time < 2000)
                ;(window as any).logoClicks = recentClicks
                
                // If 5+ clicks in 2 seconds, open admin
                if (recentClicks.length >= 5) {
                  e.preventDefault()
                  const password = prompt('🔐 Admin Access\\nEnter password:')
                  if (password === 'indohomz2024') {
                    window.open('/admin/login', '_blank')
                    alert('✅ Admin portal opened!')
                  } else if (password) {
                    alert('❌ Incorrect password!')
                  }
                  ;(window as any).logoClicks = []
                }
              }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/logo.png" 
                  alt="IndoHomz" 
                  className="h-16 sm:h-20 w-auto object-contain"
                />
              </motion.div>
            </Link>
            
            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {['Properties', 'Pricing', 'About', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
            
            {/* CTA */}
            <div className="flex items-center gap-3">
              <motion.a 
                href="https://wa.me/919053070100"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all text-sm font-semibold shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                9053070100
              </motion.a>
              <motion.a 
                href="tel:+919053070100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all text-sm font-medium"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/properties"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Video Background - Prominent and Clear */}
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&h=1080&fit=crop"
          >
            {/* Multiple video sources for showing people enjoying co-living */}
            <source src="https://cdn.coverr.co/videos/coverr-friends-celebrating-together-9743/1080p.mp4" type="video/mp4" />
            <source src="https://cdn.coverr.co/videos/coverr-young-people-having-fun-at-home-8206/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/40" />
        </motion.div>
        
        {/* Video Control */}
        <motion.button
          onClick={toggleVideo}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-8 left-8 z-20 p-3 rounded-full bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all"
        >
          {isVideoPlaying ? <Pause className="h-5 w-5 text-gray-700" /> : <Play className="h-5 w-5 text-gray-700" />}
        </motion.button>
        
        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        >
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-medium text-indigo-700 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-indigo-500" />
              Trusted by 500+ Professionals
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-sm font-medium text-emerald-700 flex items-center gap-2"
            >
              <BadgeCheck className="h-4 w-4 text-emerald-500" />
              Gurgaon's Premier Choice
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
          >
            <span className="block text-white drop-shadow-2xl">Luxury Living,</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
              Thoughtfully Curated
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
            className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
          >
            Experience meticulously designed co-living spaces crafted for discerning professionals. 
            <span className="text-white font-semibold"> Zero brokerage. Verified excellence. Instant move-in.</span>
          </motion.p>
          
          {/* Search Box with Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-white border border-gray-200 shadow-xl">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <MapPin className="h-5 w-5 text-indigo-500" />
                  <input
                    type="text"
                    placeholder="Search by location (e.g., Cyberhub, Golf Course Road)..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()}
                    className="flex-1 bg-transparent border-0 text-gray-900 placeholder:text-gray-400 focus:outline-none py-3 text-sm sm:text-base"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLocationSearch}
                  className="px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-200"
                >
                  <Search className="h-5 w-5" />
                  <span className="hidden sm:inline">Search</span>
                </motion.button>
              </div>
            </div>
            
            {/* Quick Location Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              {['Cyberhub', 'Golf Course', 'MG Road', 'Sohna Road', 'Golf Course Extension Road'].map((loc) => (
                <motion.button
                  key={loc}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchLocation(loc)}
                  className="px-4 py-2 rounded-full bg-white text-gray-600 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-all border border-gray-200 shadow-sm"
                >
                  {loc}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-indigo-500"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Lifestyle Video Showcase Section - New */}<div className="relative py-20 px-4 sm:px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">Experience the Vibe</span>
            <h2 className="text-3xl sm:text-5xl font-bold mt-3 text-white">
              Where <span className="text-cyan-400">Work Meets Play</span>
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              Young professionals | Chill vibes | Weekend parties | Co-working | Your tribe awaits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 360° Virtual Tours */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                alert('Virtual Tour Demo - Experience our 360° property walkthrough!\n\nFeatures:\n• Interactive 3D navigation\n• Room-by-room exploration\n• High-definition visuals\n• Measure distances\n\nContact us to schedule your personal virtual tour!')
                setIsLeadModalOpen(true)
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 hover:border-cyan-500 transition-all group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
                alt="360 degree virtual tour"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="absolute top-4 right-4 bg-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-bold animate-pulse">
                  Take Virtual Tour →
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/50">
                    <div className="w-6 h-6 bg-white rounded-full animate-ping"></div>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">360° Virtual Tours</h3>
                  <p className="text-white/90 text-sm mb-3">Walk through properties | Interactive 3D experience | Every corner visible</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur text-cyan-300 rounded-full text-xs">3D View</span>
                    <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur text-cyan-300 rounded-full text-xs">Interactive</span>
                    <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur text-cyan-300 rounded-full text-xs">HD Quality</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Live Video Calls with Property Managers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => {
                const message = `Hi! I want to schedule a LIVE VIDEO TOUR of IndoHomz properties. Please let me know available time slots.`
                const whatsappUrl = `https://wa.me/919053070100?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, '_blank')
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 hover:border-green-500 transition-all group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop"
                alt="Live video call with property manager"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                  Schedule Live Tour →
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-green-500/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Live Video Tours</h3>
                  <p className="text-white/90 text-sm mb-3">Real-time property tours | Ask questions instantly | Meet your future neighbors</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-500/20 backdrop-blur text-green-300 rounded-full text-xs">Live Chat</span>
                    <span className="px-3 py-1 bg-green-500/20 backdrop-blur text-green-300 rounded-full text-xs">HD Video</span>
                    <span className="px-3 py-1 bg-green-500/20 backdrop-blur text-green-300 rounded-full text-xs">Instant Booking</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Real Reviews & Testimonials */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 hover:border-yellow-500 transition-all group"
            >
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                alt="Happy residents giving reviews"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                  ⭐ 4.8/5 Rating
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Real Reviews</h3>
                  <p className="text-white/90 text-sm mb-3 italic">"Best PG in Gurgaon! Amazing food, clean rooms, friendly staff. Highly recommended!"</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      <span>⭐⭐⭐⭐⭐</span>
                    </div>
                    <span className="text-white/80 text-xs">- Priya Singh, Software Engineer</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-yellow-500/20 backdrop-blur text-yellow-300 rounded-full text-xs">Verified Reviews</span>
                    <span className="px-3 py-1 bg-yellow-500/20 backdrop-blur text-yellow-300 rounded-full text-xs">500+ Reviews</span>
                    <span className="px-3 py-1 bg-yellow-500/20 backdrop-blur text-yellow-300 rounded-full text-xs">Real Residents</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Modern Apartment Buildings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              onClick={() => setIsLeadModalOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 hover:border-purple-500 transition-all group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
                alt="Modern apartment building"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="absolute top-4 right-4 bg-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                  🏢 Explore Buildings →
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Premium Buildings</h3>
                  <p className="text-white/90 text-sm mb-3">High-rise apartments | Modern amenities | Prime locations | Security 24/7</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-purple-500/20 backdrop-blur text-purple-300 rounded-full text-xs">High-Rise</span>
                    <span className="px-3 py-1 bg-purple-500/20 backdrop-blur text-purple-300 rounded-full text-xs">Furnished</span>
                    <span className="px-3 py-1 bg-purple-500/20 backdrop-blur text-purple-300 rounded-full text-xs">Security</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Instant Property Booking */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              onClick={() => setIsLeadModalOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 hover:border-emerald-500 transition-all group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
                alt="Instant booking interface"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-bold animate-bounce">
                  ⚡ Book Instantly →
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Instant Booking</h3>
                  <p className="text-white/90 text-sm mb-3">Zero brokerage | Instant confirmation | Move-in ready properties</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-500/20 backdrop-blur text-emerald-300 rounded-full text-xs">No Brokerage</span>
                    <span className="px-3 py-1 bg-emerald-500/20 backdrop-blur text-emerald-300 rounded-full text-xs">Instant Confirm</span>
                    <span className="px-3 py-1 bg-emerald-500/20 backdrop-blur text-emerald-300 rounded-full text-xs">Ready to Move</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Co-Working Spaces */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              onClick={() => setIsLeadModalOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 hover:border-orange-500 transition-all group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="Modern co-working space"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                  💼 Work & Live →
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Co-Working Spaces</h3>
                  <p className="text-white/90 text-sm mb-3">Integrated workspace | High-speed internet | Meeting rooms | Networking events</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-orange-500/20 backdrop-blur text-orange-300 rounded-full text-xs">Work Space</span>
                    <span className="px-3 py-1 bg-orange-500/20 backdrop-blur text-orange-300 rounded-full text-xs">Fast WiFi</span>
                    <span className="px-3 py-1 bg-orange-500/20 backdrop-blur text-orange-300 rounded-full text-xs">Networking</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Below Experiences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg shadow-xl shadow-green-200 hover:shadow-2xl hover:scale-105 transition-all"
            >
              <MessageCircle className="h-6 w-6" />
              Start Your Journey Today
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl hover:shadow-cyan-500/20 transition-all"
              >
                <stat.icon className="h-10 w-10 mx-auto mb-4 text-cyan-400" />
                <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Indicators */}
      <section className="relative py-12 px-4 sm:px-6 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {/* SSL Secure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">SSL Secured</div>
                <div className="text-xs text-gray-600">256-bit Encryption</div>
              </div>
            </motion.div>

            {/* Verified Listings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                <BadgeCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">100% Verified</div>
                <div className="text-xs text-gray-600">All Properties Checked</div>
              </div>
            </motion.div>

            {/* Safe Payments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Safe Payments</div>
                <div className="text-xs text-gray-600">Secure Transactions</div>
              </div>
            </motion.div>

            {/* 24/7 Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center">
                <Headphones className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">24/7 Support</div>
                <div className="text-xs text-gray-600">Always Here to Help</div>
              </div>
            </motion.div>
          </div>

          {/* Additional Security Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              Your personal data is protected with industry-standard encryption
            </p>
          </motion.div>
        </div>
      </section>

      {/* Google Maps Location Section */}
      <section className="relative py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">Prime Locations</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-900">
              Discover Your Ideal <span className="text-indigo-600">Neighbourhood</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">Explore premium residences in Gurgaon's most prestigious and well-connected localities</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-200"
            >
              <iframe
                src="https://maps.google.com/maps?q=Gurgaon,+Haryana,+India&t=&z=12&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <a
                  href="https://www.google.com/maps/search/premium+apartments+Gurgaon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all text-sm"
                >
                  <MapIcon className="h-4 w-4 text-indigo-600" />
                  Open in Google Maps
                </a>
              </div>
            </motion.div>
            
            {/* Location List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Navigation className="h-5 w-5 text-indigo-500" />
                Popular Neighborhoods
              </h3>
              <div className="space-y-3">
                {LOCATIONS.map((loc, i) => (
                  <motion.a
                    key={loc.name}
                    href={`https://www.google.com/maps/search/apartments+${encodeURIComponent(loc.name)}+Gurgaon`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                        <MapPin className="h-5 w-5 text-indigo-600" />
                      </div>
                      <span className="font-medium text-gray-900">{loc.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{loc.count} properties</span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">The IndoHomz Difference</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-900">
              Renting, <span className="text-indigo-600">Elevated</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">We're not just a rental platform—we're redefining the standard for urban living excellence.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard icon={Shield} title="Verified Excellence" description="Every property undergoes rigorous inspection by our expert team. Authenticity guaranteed, no exceptions." color="indigo" delay={0.1} />
            <FeatureCard icon={Zap} title="Seamless Onboarding" description="From inquiry to move-in within 24 hours. Digital documentation, instant verification, zero friction." color="amber" delay={0.2} />
            <FeatureCard icon={CreditCard} title="Zero Brokerage" description="Transparent pricing with no hidden fees. Save up to ₹50,000—invest in experiences, not commissions." color="emerald" delay={0.3} />
            <FeatureCard icon={Award} title="Signature Amenities" description="Enterprise-grade WiFi, state-of-the-art fitness centres, and curated lifestyle services included." color="cyan" delay={0.4} />
            <FeatureCard icon={Headphones} title="Dedicated Concierge" description="Round-the-clock assistance from our hospitality-trained team. Your comfort is our commitment." color="rose" delay={0.5} />
            <FeatureCard icon={Globe} title="Neighbourhood Intelligence" description="AI-powered insights on local amenities, commute times, and area vibes before you commit." color="indigo" delay={0.6} />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-100 via-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4"
          >
            <div>
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">Curated Collection</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-900">
                Signature <span className="text-indigo-600">Residences</span>
              </h2>
              <p className="text-gray-500 mt-2 max-w-md">Handpicked properties that exemplify our commitment to excellence</p>
            </div>
            <Link 
              to="/properties"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors group"
            >
              Explore Full Portfolio
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROPERTIES.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">Resident Stories</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-white">
              Endorsed by <span className="text-cyan-400">Industry Leaders</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto">Hear from professionals who've elevated their lifestyle with IndoHomz</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* What Makes IndoHomz Different - Inspired by Live Site */}
      <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">Your Digital Living Partner</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-900">
              What Makes <span className="text-indigo-600">IndoHomz</span> Different?
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Experience 10X better living with our comprehensive digital ecosystem designed for modern professionals</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smart KYC */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart KYC</h3>
              <p className="text-gray-600">One click KYC within 30 seconds valid through all IndoHomz properties. Instant verification, no paperwork hassles.</p>
            </motion.div>

            {/* Exclusive Tenant Membership */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Exclusive Tenant Membership</h3>
              <p className="text-gray-600">One membership that gives you exclusive access to amazing benefits which differentiates us from rest of the places.</p>
            </motion.div>

            {/* Digital Payment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                <CreditCard className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Payment & Rewards</h3>
              <p className="text-gray-600">Handle rent payments digitally with smart receipts and earn rewards on every rent payment. Cashback on your rent!</p>
            </motion.div>

            {/* Tenant Smart App */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-50 flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tenant Smart App</h3>
              <p className="text-gray-600">Stay 10X better with a smart app that makes your stay frictionless. Food menu, complaints, guest invites - all in one app.</p>
            </motion.div>

            {/* Tenant Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tenant Insurance</h3>
              <p className="text-gray-600">Stay smart with our complimentary tenant insurance plan, which ensures a safer stay with complete peace of mind.</p>
            </motion.div>

            {/* Faster Complaint Resolution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-rose-50 flex items-center justify-center mb-4">
                <Headphones className="h-7 w-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Faster Complaint Resolution</h3>
              <p className="text-gray-600">Make your stay hassle-free with 10X faster complaint resolution through our tenant smart app. Help at your fingertips.</p>
            </motion.div>
          </div>

          {/* 100% Digital Experience Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">100% Digital Experience</h3>
                <p className="text-indigo-100 mb-6">From what's in today's food menu to entry-exit log to inviting a guest in your room or informing when going on leave, everything happens on our tenant app.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <span className="text-sm">Digital Check-in & KYC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <span className="text-sm">Online Rent Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <span className="text-sm">Rent Rewards & Cashback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <span className="text-sm">In-App Food Menu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <span className="text-sm">Faster Complaint Resolution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <span className="text-sm">Move Across Properties</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-400 flex items-center justify-center">
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">All-in-One App</p>
                          <p className="text-sm text-indigo-200">Complete control at your fingertips</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About IndoHomz Section */}
      <section id="about" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">About IndoHomz</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6 text-gray-900">
                Your Rented Home, <span className="text-indigo-600">Wherever You Need</span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  IndoHomz provides a wide range of options from hostels, PGs to studio apartments to fully furnished flats. Have a look at our properties and choose for yourself.
                </p>
                <p>
                  We understand that finding the perfect home is more than just four walls and a roof. It's about finding a space that complements your lifestyle, supports your ambitions, and feels truly yours.
                </p>
                <p>
                  With <span className="font-semibold text-gray-900">5,000+ tenants served</span> and <span className="font-semibold text-gray-900">3.2 Lacs+ nights stayed</span>, we've built a trusted community of professionals and students who call IndoHomz their home.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">0-3 yrs</div>
                  <div className="text-sm text-gray-600">Properties Age</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Digital Experience</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/properties/dlf-phase-4/1.webp" 
                  alt="IndoHomz Property" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Home className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Premium Living Spaces</div>
                        <div className="text-sm text-gray-600">Curated for modern professionals</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Stats Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Verified</div>
                    <div className="text-xs text-gray-600">All Properties</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Zero Brokerage</div>
                    <div className="text-xs text-gray-600">Save Money</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center"
            >
              <Home className="h-10 w-10 text-white" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white">
              Your Rented Home, <span className="text-amber-300">Wherever You Need</span>
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-md mx-auto">
              Join 5,000+ happy tenants. Experience thoughtfully curated co-living spaces.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/properties"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold hover:bg-gray-50 transition-all shadow-xl"
                >
                  Browse Properties
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.a 
                href="https://wa.me/919053070100"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                9053070100
              </motion.a>
              <motion.a 
                href="tel:+919053070100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur text-white font-bold border border-white/30 hover:bg-white/20 transition-all"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-14 px-4 sm:px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <img 
                  src="/logo.png" 
                  alt="IndoHomz" 
                  className="h-16 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 mb-5 max-w-sm">
                IndoHomz provides a wide range of options from hostels, PGs to studio apartments to fully furnished flats in Gurgaon. Your trusted partner for quality living.
              </p>
              <div className="flex gap-3">
                <a href="https://wa.me/919053070100" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href="tel:+919053070100" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/properties" className="hover:text-white transition-colors">Properties</Link></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li>
                  <Link 
                    to="/admin/login" 
                    className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors text-xs opacity-60 hover:opacity-100 mt-4"
                  >
                    <Shield className="h-3.5 w-3.5" />
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="tel:+919053070100" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="h-4 w-4" />
                    +91 9053070100
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919053070100" target="_blank" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                    <MessageCircle className="h-4 w-4 text-green-400" />
                    WhatsApp: 9053070100
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:info@indohomz.com" className="hover:text-white transition-colors">info@indohomz.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Gurgaon, Haryana
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} IndoHomz. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919053070100"
        target="_blank"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.15 }}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-2xl shadow-green-500/50 z-50 group"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute right-full mr-3 px-3 py-2 bg-white text-gray-900 rounded-lg shadow-xl text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat on WhatsApp
        </span>
      </motion.a>

      {/* Floating Call Button */}
      <motion.a
        href="tel:+919053070100"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.15 }}
        className="fixed bottom-6 right-24 w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/50 z-50 group"
      >
        <Phone className="h-6 w-6" />
        <span className="absolute right-full mr-3 px-3 py-2 bg-white text-gray-900 rounded-lg shadow-xl text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Call: 9053070100
        </span>
      </motion.a>

      {/* Lead Generation Modal */}
      <LeadModal 
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        source="landing_page"
      />

      {/* Floating CTA */}
      <FloatingCTA onContactClick={() => setIsLeadModalOpen(true)} />
    </div>
  )
}
