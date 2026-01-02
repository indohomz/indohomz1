import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Download, RefreshCw, Calendar, TrendingUp, DollarSign } from 'lucide-react';

interface AnalyticsFilter {
  dateRange: string;
  propertyType: string;
  status: string;
}

export default function AdvancedAnalyticsPanel() {
  const [filters, setFilters] = useState<AnalyticsFilter>({
    dateRange: '30days',
    propertyType: 'all',
    status: 'all',
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Advanced Analytics
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Real-time insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </motion.button>
        </div>
      </div>

      {/* Filters Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Filters
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
              <option value="custom">Custom range</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Property Type
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="all">All Types</option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Revenue',
            value: '₹2.4M',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
          },
          {
            label: 'Bookings',
            value: '1,234',
            change: '+8.2%',
            trend: 'up',
            icon: Calendar,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          },
          {
            label: 'Occupancy Rate',
            value: '87%',
            change: '+5.1%',
            trend: 'up',
            icon: TrendingUp,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          },
          {
            label: 'Avg. Price',
            value: '₹26K',
            change: '+3.4%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          },
        ].map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {metric.label}
              </span>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {metric.value}
              </h3>
              <span className={`text-sm font-semibold ${metric.color}`}>
                {metric.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Revenue Trend
        </h3>
        <div className="h-64 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <p className="text-neutral-500 dark:text-neutral-400">
            Chart visualization will appear here
          </p>
        </div>
      </motion.div>
    </div>
  );
}
