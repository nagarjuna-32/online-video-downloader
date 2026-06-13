import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { updateSEOMetadata } from '../utils/seo'
import { Download, Music, Shield, Zap, Smartphone, Check } from 'lucide-react'

const About: React.FC = () => {
  useEffect(() => {
    updateSEOMetadata({
      title: 'About DownloadMedia | Social Media Video & Audio Downloader',
      description: 'Learn about DownloadMedia, a fast and easy platform for downloading publicly accessible social media videos and audio.',
    })
  }, [])

  const platforms = [
    'YouTube',
    'Instagram',
    'TikTok',
    'Facebook',
    'X (Twitter)',
    'Pinterest',
    'LinkedIn',
  ]

  const features = [
    {
      icon: Download,
      title: 'Video Downloads',
      description: 'Convert and download videos instantly into standard high-quality MP4 format.',
    },
    {
      icon: Music,
      title: 'Audio Downloads',
      description: 'Extract and transcode audio tracks directly into crystal-clear 192kbps MP3 format.',
    },
    {
      icon: Shield,
      title: 'Secure Experience',
      description: 'No accounts, sign-ups, or personal data collection required. Purely browser-driven.',
    },
    {
      icon: Zap,
      title: 'Fast Analysis',
      description: 'Instantly processes video links and generates simplified, clean download choices.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-Friendly',
      description: 'Responsive glassmorphism design that fits and performs perfectly on any mobile device.',
    },
  ]

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-primary dark:text-accent tracking-tight">
            About DownloadMedia
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            DownloadMedia is a premium web application designed to help users save and access publicly accessible media content from major social networks quickly and safely.
          </p>
        </div>

        {/* Mission Section */}
        <div className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl space-y-4 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold">Our Mission</h3>
          <p className="text-lg italic text-gray-700 dark:text-gray-300">
            "Our mission is to provide a simple, accessible, and efficient way for users to manage and access media they have permission to use."
          </p>
        </div>

        {/* Features Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Core Platforms & Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-white dark:bg-secondary border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow space-y-3"
              >
                <feature.icon className="w-10 h-10 text-primary dark:text-accent" />
                <h4 className="text-lg font-bold">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Platforms Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Supported Platforms</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform, i) => (
              <span
                key={i}
                className="px-5 py-3 bg-white dark:bg-secondary border border-gray-200 dark:border-gray-700 rounded-full font-semibold text-sm shadow-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-green-500" />
                {platform}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}

export default About
