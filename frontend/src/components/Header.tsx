import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, History, Menu, X } from 'lucide-react'
import { useAppStore } from '../stores/appStore'

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-secondary border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            SG
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">SocialGrab</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Download Smarter</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
            FAQ
          </a>
          <button className="flex items-center gap-2 text-sm font-medium hover:text-primary">
            <History className="w-4 h-4" />
            History
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-t border-gray-200 dark:border-gray-700 p-4 space-y-2"
        >
          <a href="#features" className="block text-sm font-medium hover:text-primary">
            Features
          </a>
          <a href="#faq" className="block text-sm font-medium hover:text-primary">
            FAQ
          </a>
          <button className="block w-full text-left text-sm font-medium hover:text-primary">
            History
          </button>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Header
