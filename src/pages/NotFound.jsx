import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="mb-6 relative">
          <div className="text-9xl font-bold text-primary/10 dark:text-primary/20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-bold text-surface-800 dark:text-surface-100">Page Not Found</div>
          </div>
        </div>
        
        <p className="text-surface-600 dark:text-surface-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary flex items-center justify-center gap-2">
            <Home size={18} />
            <span>Go to Dashboard</span>
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}