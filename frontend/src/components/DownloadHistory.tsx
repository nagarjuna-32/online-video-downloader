import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Trash2 } from 'lucide-react'
import { api } from '../utils/api'
import type { DownloadHistoryItem } from '../types'

const DownloadHistory: React.FC = () => {
  const [history, setHistory] = useState<DownloadHistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.getHistory()
        setHistory(data)
      } catch (error) {
        console.error('Failed to fetch history:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const handleClearHistory = async () => {
    if (confirm('Are you sure you want to clear all download history?')) {
      try {
        await api.clearHistory()
        setHistory([])
      } catch (error) {
        console.error('Failed to clear history:', error)
      }
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-secondary rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Download History</h2>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 py-8">
          No downloads yet. Start downloading videos to see them here.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Platform</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Format</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Downloaded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {history.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-sm truncate max-w-xs">{item.title}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                      {item.platform}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{item.format}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(item.downloaded_at).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}

export default DownloadHistory
