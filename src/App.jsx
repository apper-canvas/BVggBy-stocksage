import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sun, Moon, Menu, X, Package, BarChart3, Users, ShoppingCart, Settings, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors md:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-xl">StockSage</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              AS
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={toggleSidebar}
            >
              <motion.div 
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0 left-0 bottom-0 w-64 bg-white dark:bg-surface-800 p-4"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-primary font-bold text-xl">StockSage</span>
                  <button 
                    onClick={toggleSidebar}
                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <SidebarContent />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sidebar for desktop */}
        <div className="hidden md:block w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 p-4">
          <SidebarContent />
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function SidebarContent() {
  const navItems = [
    { icon: <Package size={18} />, label: "Inventory", active: true },
    { icon: <ShoppingCart size={18} />, label: "Sales" },
    { icon: <Users size={18} />, label: "Suppliers" },
    { icon: <BarChart3 size={18} />, label: "Reports" },
    { icon: <Settings size={18} />, label: "Settings" },
  ]
  
  return (
    <div className="flex flex-col h-full">
      <nav className="space-y-1 flex-1">
        {navItems.map((item, index) => (
          <a 
            key={index}
            href="#"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              item.active 
                ? "bg-primary/10 text-primary dark:bg-primary/20" 
                : "hover:bg-surface-100 dark:hover:bg-surface-700"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.active && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></div>
            )}
          </a>
        ))}
      </nav>
      
      <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
        <a 
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </a>
      </div>
    </div>
  )
}

export default App