import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, AlertCircle } from 'lucide-react'
import { api } from '../utils/api'
import { isValidUrl } from '../utils/helpers'
import type { MetadataResponse } from '../types'

interface URLInputProps {
  onMetadataReceived: (metadata: MetadataResponse, url: string) => void
}

const URLInput: React.FC<URLInputProps> = ({ onMetadataReceived }) => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    setError('')

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL')
      return
    }

    setLoading(true)
    try {
      const metadata = await api.analyze({ url })
      onMetadataReceived(metadata, url)
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.message || 'Failed to analyze URL. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
          placeholder="Paste video URL here..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2 font-semibold"
        >
          <Play className="w-4 h-4" />
          {loading ? 'Analyzing...' : 'Analyze'}
        </motion.button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 mb-4 text-red-800 border border-red-200 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <AlertCircle className="flex-shrink-0 w-5 h-5 mt-0.5" />
          <div>
            <span className="font-semibold">Analysis Failed:</span> {error}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default URLInput
