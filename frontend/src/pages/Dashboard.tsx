import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  AlertTriangle,
  Brain,
  Target
} from 'lucide-react'
import { analyticsService, salesService } from '../services/api'
import MetricCard from '../components/Dashboard/MetricCard'
import SalesChart from '../components/Dashboard/SalesChart'
import TopProducts from '../components/Dashboard/TopProducts'
import RecentSales from '../components/Dashboard/RecentSales'
import InventoryAlerts from '../components/Dashboard/InventoryAlerts'
import PredictionInsights from '../components/Dashboard/PredictionInsights'
import heroUrl from '../assets/hero-illustration.svg?url'

const Dashboard: React.FC = () => {
  // Fetch dashboard data
  const { data: salesOverview, isLoading: salesLoading } = useQuery({
    queryKey: ['sales-overview'],
    queryFn: () => analyticsService.getSalesOverview().then(res => res.data),
  })

  const { data: inventoryStatus, isLoading: inventoryLoading } = useQuery({
    queryKey: ['inventory-status'],
    queryFn: () => analyticsService.getInventoryStatus().then(res => res.data),
  })

  const { data: customerInsights, isLoading: customerLoading } = useQuery({
    queryKey: ['customer-insights'],
    queryFn: () => analyticsService.getCustomerInsights().then(res => res.data),
  })

  const { data: recentSales, isLoading: recentSalesLoading } = useQuery({
    queryKey: ['recent-sales'],
    queryFn: () => salesService.getSales({ limit: 10 }).then(res => res.data),
  })

  const isLoading = salesLoading || inventoryLoading || customerLoading

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-8 animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-purple-400 to-primary-700 opacity-80"></div>
        <div className="relative z-10 p-10 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-3 animate-slide-up">Welcome to Retail Analytics Platform</h1>
            <p className="text-lg text-white/80 mb-4 animate-fade-in">AI-powered insights, beautiful dashboards, and smart business decisions—all in one place.</p>
            <div className="flex space-x-4 mt-4">
              <button className="btn-primary shadow-lg animate-bounce-subtle">Get Started</button>
              <button className="btn-outline text-white border-white hover:bg-white/10 animate-fade-in">Learn More</button>
            </div>
          </div>
          <div className="hidden md:block">
            <img src={heroUrl} alt="Analytics Hero" className="w-72 drop-shadow-2xl animate-slide-up" />
          </div>
        </div>
      </div>
      {/* Dashboard Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-primary-700">Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your retail business.</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <button className="btn-primary">
            <Brain className="h-4 w-4 mr-2" />
            Generate AI Report
          </button>
        </div>
      </div>

  {/* Key Metrics */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
        <MetricCard
          title="Total Revenue"
          value={`$${salesOverview?.total_sales?.toLocaleString() || '0'}`}
          icon={DollarSign}
          trend="up"
          change="+12.5% vs last month"
        />
        <MetricCard
          title="Total Orders"
          value={salesOverview?.total_orders?.toLocaleString() || '0'}
          icon={ShoppingCart}
          trend="up"
          change="+8.2% vs last month"
        />
        <MetricCard
          title="Active Customers"
          value={customerInsights?.total_customers?.toLocaleString() || '0'}
          icon={Users}
          trend="up"
          change="+5.7% vs last month"
        />
        <MetricCard
          title="Products in Stock"
          value={inventoryStatus?.total_products?.toLocaleString() || '0'}
          icon={Package}
          trend="down"
          change="-2.1% vs last month"
        />
      </div>

  {/* Charts and Insights Row */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
        {/* Sales Trend Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <SalesChart data={salesOverview?.sales_trend || []} isLoading={isLoading} />
        </div>

        {/* Top Products */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            <button className="text-primary-600 text-sm hover:text-primary-700">
              View all
            </button>
          </div>
          <TopProducts products={salesOverview?.top_products || []} isLoading={isLoading} />
        </div>
      </div>

  {/* Additional Insights Row */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
        {/* Recent Sales */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
            <button className="text-primary-600 text-sm hover:text-primary-700">
              View all
            </button>
          </div>
          <RecentSales sales={recentSales || []} isLoading={recentSalesLoading} />
        </div>

        {/* Inventory Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Inventory Alerts</h3>
            <div className="flex items-center text-orange-600">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">
                {inventoryStatus?.low_stock_products || 0} items
              </span>
            </div>
          </div>
          <InventoryAlerts 
            lowStockCount={inventoryStatus?.low_stock_products || 0}
            outOfStockCount={inventoryStatus?.out_of_stock_products || 0}
            isLoading={inventoryLoading}
          />
        </div>

        {/* AI Predictions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">AI Predictions</h3>
            <div className="flex items-center text-purple-600">
              <Brain className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Smart Insights</span>
            </div>
          </div>
          <PredictionInsights />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-gradient-to-br from-primary-50 via-white to-purple-50 shadow-lg animate-fade-in">
        <h3 className="text-xl font-bold text-primary-700 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary-200 rounded-xl hover:border-primary-400 hover:bg-primary-100 transition-all duration-200 shadow-md animate-bounce-subtle">
            <Package className="h-10 w-10 text-primary-600 mb-2" />
            <span className="text-base font-semibold text-primary-700">Add Product</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary-200 rounded-xl hover:border-primary-400 hover:bg-primary-100 transition-all duration-200 shadow-md animate-bounce-subtle">
            <Users className="h-10 w-10 text-primary-600 mb-2" />
            <span className="text-base font-semibold text-primary-700">Add Customer</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary-200 rounded-xl hover:border-primary-400 hover:bg-primary-100 transition-all duration-200 shadow-md animate-bounce-subtle">
            <ShoppingCart className="h-10 w-10 text-primary-600 mb-2" />
            <span className="text-base font-semibold text-primary-700">Record Sale</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary-200 rounded-xl hover:border-primary-400 hover:bg-primary-100 transition-all duration-200 shadow-md animate-bounce-subtle">
            <Target className="h-10 w-10 text-primary-600 mb-2" />
            <span className="text-base font-semibold text-primary-700">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
