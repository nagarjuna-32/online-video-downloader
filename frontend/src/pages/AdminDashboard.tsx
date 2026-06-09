import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Download, AlertCircle, TrendingUp } from 'lucide-react'
import { api } from '../utils/api'

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getAdminStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!stats) {
    return <div>Failed to load statistics</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-7xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-secondary p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Analyses</p>
              <p className="text-3xl font-bold">{stats.total_analyses}</p>
            </div>
            <BarChart3 className="w-10 h-10 text-primary opacity-20" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-secondary p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Downloads</p>
              <p className="text-3xl font-bold">{stats.total_downloads}</p>
            </div>
            <Download className="w-10 h-10 text-accent opacity-20" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-secondary p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Error Count</p>
              <p className="text-3xl font-bold">{stats.error_count}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-500 opacity-20" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-secondary p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Success Rate</p>
              <p className="text-3xl font-bold">
                {stats.total_analyses > 0
                  ? (((stats.total_analyses - stats.error_count) / stats.total_analyses) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
          </div>
        </motion.div>
      </div>

      {/* Platform Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-secondary rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Platform Usage</h2>
        <div className="space-y-2">
          {Object.entries(stats.platform_usage).map(([platform, count]: any) => (
            <div key={platform} className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">{platform}</span>
              <div className="flex items-center gap-4">
                <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(count / Math.max(...(Object.values(stats.platform_usage) as number[]))) * 100}%`,
                    }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="bg-primary h-2 rounded-full"
                  />
                </div>
                <span className="font-semibold w-12 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Popular Formats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-secondary rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-bold mb-4">Popular Formats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats.popular_formats)
            .sort((a: any, b: any) => b[1] - a[1])
            .slice(0, 6)
            .map(([format, count]: any) => (
              <div key={format} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold">{format}</p>
                <p className="text-2xl font-bold text-primary">{count}</p>
              </div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AdminDashboard
