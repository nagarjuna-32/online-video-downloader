import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import PrivacyNotice from '../components/PrivacyNotice'
import URLInput from '../components/URLInput'
import MetadataPreview from '../components/MetadataPreview'
import PlatformBadges from '../components/PlatformBadges'
import Features from '../components/Features'
import FAQ from '../components/FAQ'
import { useAppStore } from '../stores/appStore'
import type { MetadataResponse } from '../types'

const Home: React.FC = () => {
  const [metadata, setMetadata] = useState<MetadataResponse | null>(null)
  const [currentUrl, setCurrentUrl] = useState('')
  const inputRef = useRef<HTMLDivElement>(null)
  const { darkMode } = useAppStore()

  const handleScrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMetadataReceived = (meta: MetadataResponse, url: string) => {
    setCurrentUrl(url)
    setMetadata(meta)
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background dark:bg-secondary text-text dark:text-background">
        <Header />
        
        <Hero onScrollToInput={handleScrollToInput} />
        
        <PlatformBadges />

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <PrivacyNotice />

            <div ref={inputRef}>
              <URLInput onMetadataReceived={handleMetadataReceived} />
            </div>

            {metadata && (
              <MetadataPreview 
                metadata={metadata} 
                url={currentUrl}
                onDownloadComplete={() => {
                  setTimeout(() => setMetadata(null), 2000)
                }}
              />
            )}
          </div>
        </section>

        <Features />
        <FAQ />

        <Footer />
      </div>
    </div>
  )
}

export default Home
