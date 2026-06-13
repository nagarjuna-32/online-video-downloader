import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, History, Menu, X } from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import { Link } from './Link'
import { navigate } from '../utils/navigation'

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, currentRoute } = useAppStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleHomeAnchor = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (currentRoute !== '/') {
      e.preventDefault()
      navigate('/' + hash)
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-secondary border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              DM
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">DownloadMedia</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Download Smarter</p>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#features"
            onClick={(e) => handleHomeAnchor(e, '#features')}
            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
          >
            Features
          </a>
          <a
            href="#faq"
            onClick={(e) => handleHomeAnchor(e, '#faq')}
            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
          >
            FAQ
          </a>
          <Link
            to="/about"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              currentRoute === '/about' ? 'text-primary' : ''
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              currentRoute === '/contact' ? 'text-primary' : ''
            }`}
          >
            Contact
          </Link>
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

        {/* Mobile Menu Toggle */}
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
          <a
            href="#features"
            onClick={(e) => {
              handleHomeAnchor(e, '#features')
              setMobileMenuOpen(false)
            }}
            className="block text-sm font-medium hover:text-primary"
          >
            Features
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              handleHomeAnchor(e, '#faq')
              setMobileMenuOpen(false)
            }}
            className="block text-sm font-medium hover:text-primary"
          >
            FAQ
          </a>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-medium hover:text-primary ${
              currentRoute === '/about' ? 'text-primary' : ''
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-medium hover:text-primary ${
              currentRoute === '/contact' ? 'text-primary' : ''
            }`}
          >
            Contact
          </Link>
          <Link
            to="/privacy-policy"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-medium hover:text-primary ${
              currentRoute === '/privacy-policy' ? 'text-primary' : ''
            }`}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-medium hover:text-primary ${
              currentRoute === '/terms-of-service' ? 'text-primary' : ''
            }`}
          >
            Terms of Service
          </Link>
          <button className="block w-full text-left text-sm font-medium hover:text-primary">
            History
          </button>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Header
