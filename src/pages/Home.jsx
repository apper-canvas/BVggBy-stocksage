import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Filter, ArrowUpDown, AlertTriangle, TrendingUp, TrendingDown, Package, DollarSign, Truck } from 'lucide-react'
import MainFeature from '../components/MainFeature'

export default function Home() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const tabs = [
    { id: 'all', label: 'All Items' },
    { id: 'low', label: 'Low Stock', alert: true },
    { id: 'popular', label: 'Popular Items' },
    { id: 'recent', label: 'Recently Added' }
  ]
  
  const stats = [
    { 
      id: 'total', 
      label: 'Total Products', 
      value: '1,247', 
      change: '+3.2%', 
      trend: 'up',
      icon: <Package className="text-primary" />
    },
    { 
      id: 'value', 
      label: 'Inventory Value', 
      value: '$124,500', 
      change: '+5.4%', 
      trend: 'up',
      icon: <DollarSign className="text-secondary" />
    },
    { 
      id: 'low', 
      label: 'Low Stock Items', 
      value: '24', 
      change: '-2.1%', 
      trend: 'down',
      icon: <AlertTriangle className="text-amber-500" />
    },
    { 
      id: 'orders', 
      label: 'Pending Orders', 
      value: '12', 
      change: '+1.3%', 
      trend: 'up',
      icon: <Truck className="text-accent" />
    }
  ]
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
          <p className="text-surface-500 dark:text-surface-400">Manage your products and stock levels</p>
        </div>
        
        <div className="flex gap-3">
          <button className="btn btn-outline flex items-center gap-2">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(stat => (
          <motion.div 
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className={`flex items-center gap-1 mt-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-100 dark:bg-surface-700">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 transition-colors ${
                activeTab === tab.id 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              {tab.label}
              {tab.alert && (
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
              )}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>
      
      {/* Main Feature */}
      <MainFeature activeTab={activeTab} searchQuery={searchQuery} />
    </div>
  )
}