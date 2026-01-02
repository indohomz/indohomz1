import { motion } from 'framer-motion';
import { Search, Home, TrendingUp, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export default function ModernHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-20 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold mb-6"
            >
              <Sparkles className="h-4 w-4" />
              AI-Powered Retail Analytics
            </motion.div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight">
              Find Your Perfect{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Property
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              Discover premium villas and properties with our advanced analytics platform. 
              Get AI-powered insights, real-time data, and comprehensive property management tools.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search location, property type..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
              >
                Search
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">500+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Properties</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">2.5K+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Happy Clients</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">98%</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Satisfaction</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Home, title: 'Premium Properties', color: 'from-blue-500 to-cyan-500' },
                { icon: TrendingUp, title: 'Smart Analytics', color: 'from-purple-500 to-pink-500' },
                { icon: MapPin, title: 'Prime Locations', color: 'from-green-500 to-emerald-500' },
                { icon: Sparkles, title: 'AI Insights', color: 'from-yellow-500 to-orange-500' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                    style={{ background: `linear-gradient(to bottom right, ${feature.color})` }}
                  />
                  <div className="relative bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-shadow duration-300">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {feature.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
