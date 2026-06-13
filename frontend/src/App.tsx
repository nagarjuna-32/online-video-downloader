import { useEffect } from 'react'
import { useAppStore } from './stores/appStore'
import Home from './pages/Home'
import About from './pages/About'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import './index.css'

function App() {
  const { currentRoute, setCurrentRoute } = useAppStore()

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [setCurrentRoute])

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <Home />
      case '/about':
        return <About />
      case '/privacy-policy':
        return <PrivacyPolicy />
      case '/terms-of-service':
        return <TermsOfService />
      case '/contact':
        return <Contact />
      case '/admin':
        return <AdminDashboard />
      default:
        return <Home />
    }
  }

  return renderPage()
}

export default App
