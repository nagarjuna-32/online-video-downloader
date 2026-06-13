import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useAppStore } from '../stores/appStore'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useAppStore()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background dark:bg-secondary text-text dark:text-background flex flex-col justify-between transition-colors duration-200">
        <div className="flex-grow">
          <Header />
          <main className="max-w-4xl mx-auto px-4 py-12">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
