/**
 * AvailabilityCalendar - Real-time room availability
 * See exact move-in dates for each room type
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight, Check, Clock, Bell, X } from 'lucide-react'

interface RoomType {
  id: string
  name: string
  price: string
  availableFrom: Date | null
  spotsLeft: number
  totalSpots: number
}

interface Props {
  propertyTitle: string
  propertySlug?: string
  className?: string
}

export default function AvailabilityCalendar({ propertyTitle, className = '' }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)

  // Simulated room availability data
  const roomTypes: RoomType[] = [
    { 
      id: 'single', 
      name: 'Single Occupancy', 
      price: '₹18,000/mo',
      availableFrom: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      spotsLeft: 2,
      totalSpots: 4
    },
    { 
      id: 'double', 
      name: 'Double Sharing', 
      price: '₹12,000/mo',
      availableFrom: new Date(), // Available now
      spotsLeft: 3,
      totalSpots: 6
    },
    { 
      id: 'triple', 
      name: 'Triple Sharing', 
      price: '₹8,000/mo',
      availableFrom: null, // Fully booked
      spotsLeft: 0,
      totalSpots: 4
    },
  ]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const getStatusColor = (room: RoomType) => {
    if (room.spotsLeft === 0) return 'bg-stone-100 text-stone-400'
    if (room.spotsLeft <= 2) return 'bg-orange-50 text-orange-600'
    return 'bg-emerald-50 text-emerald-600'
  }

  const getStatusText = (room: RoomType) => {
    if (room.spotsLeft === 0) return 'Fully Booked'
    if (room.availableFrom && isToday(room.availableFrom)) return 'Available Now'
    if (room.availableFrom) return `From ${formatDate(room.availableFrom)}`
    return 'Check availability'
  }

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    setTimeout(() => {
      setWaitlistSubmitted(true)
    }, 500)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    
    // Add empty slots for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    // Add all days of month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const calendarDays = getDaysInMonth(currentMonth)

  return (
    <>
      {/* Trigger Card */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group text-left w-full bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 hover:border-emerald-200 transition-all ${className}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-emerald-600" />
          </div>
          <span className="text-emerald-600 text-sm font-medium bg-emerald-100 px-3 py-1 rounded-full">
            Live Availability
          </span>
        </div>
        
        <h3 className="text-stone-900 font-medium mb-1">Check Move-in Dates</h3>
        <p className="text-stone-500 text-sm mb-4">
          See real-time room availability and book instantly
        </p>
        
        {/* Quick preview */}
        <div className="flex gap-2">
          {roomTypes.slice(0, 2).map(room => (
            <span 
              key={room.id}
              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(room)}`}
            >
              {room.name.split(' ')[0]}: {room.spotsLeft} left
            </span>
          ))}
        </div>
      </motion.button>

      {/* Full Calendar Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-stone-100 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-medium text-stone-900">Availability Calendar</h2>
                  <p className="text-stone-500 text-sm">{propertyTitle}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <div className="p-6">
                {/* Room Types */}
                <div className="mb-8">
                  <h3 className="text-stone-400 text-sm uppercase tracking-wider mb-4">Room Types</h3>
                  <div className="space-y-3">
                    {roomTypes.map(room => (
                      <motion.button
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id === selectedRoom ? null : room.id)}
                        whileHover={{ scale: 1.01 }}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          selectedRoom === room.id 
                            ? 'border-stone-900 bg-stone-50' 
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-stone-900">{room.name}</p>
                            <p className="text-stone-500 text-sm">{room.price}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block text-sm px-3 py-1 rounded-full ${getStatusColor(room)}`}>
                              {getStatusText(room)}
                            </span>
                            <p className="text-stone-400 text-xs mt-1">
                              {room.spotsLeft}/{room.totalSpots} spots
                            </p>
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="mt-3 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              room.spotsLeft === 0 ? 'bg-stone-300' :
                              room.spotsLeft <= 2 ? 'bg-orange-400' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${(room.spotsLeft / room.totalSpots) * 100}%` }}
                          />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Calendar View */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-stone-400 text-sm uppercase tracking-wider">Calendar</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateMonth('prev')}
                        className="p-2 rounded-full hover:bg-stone-100 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-stone-600" />
                      </button>
                      <span className="text-stone-900 font-medium min-w-[140px] text-center">
                        {currentMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        onClick={() => navigateMonth('next')}
                        className="p-2 rounded-full hover:bg-stone-100 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-stone-600" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-stone-400 text-xs py-2">
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((day, i) => {
                      const isAvailable = day && day >= new Date()
                      const isDayToday = day && isToday(day)
                      
                      return (
                        <div
                          key={i}
                          className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                            !day ? '' :
                            isDayToday ? 'bg-stone-900 text-white font-medium' :
                            isAvailable ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer' :
                            'text-stone-300'
                          }`}
                        >
                          {day?.getDate()}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Waitlist Section */}
                {!showWaitlist ? (
                  <button
                    onClick={() => setShowWaitlist(true)}
                    className="w-full py-4 border-2 border-dashed border-stone-200 rounded-xl text-stone-500 hover:border-stone-300 hover:text-stone-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    Join waitlist for fully booked rooms
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-stone-50 rounded-xl p-6"
                  >
                    {waitlistSubmitted ? (
                      <div className="text-center py-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Check className="w-6 h-6 text-emerald-600" />
                        </div>
                        <p className="text-stone-900 font-medium">You're on the waitlist!</p>
                        <p className="text-stone-500 text-sm">We'll notify you when a spot opens up</p>
                      </div>
                    ) : (
                      <form onSubmit={handleWaitlistSubmit}>
                        <div className="flex items-center gap-2 mb-4">
                          <Clock className="w-5 h-5 text-stone-400" />
                          <p className="text-stone-600 text-sm">Get notified when your preferred room becomes available</p>
                        </div>
                        <div className="flex gap-3">
                          <input
                            type="email"
                            value={waitlistEmail}
                            onChange={(e) => setWaitlistEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="flex-1 px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400"
                          />
                          <button
                            type="submit"
                            className="px-6 py-3 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors"
                          >
                            Notify Me
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Footer CTA */}
              <div className="sticky bottom-0 bg-white border-t border-stone-100 px-6 py-4">
                <button className="w-full py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book a Visit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
