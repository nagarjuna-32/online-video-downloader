import React from 'react'
import { motion } from 'framer-motion'
import { SUPPORTED_PLATFORMS } from '../utils/constants'

const PlatformBadges: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="py-12 px-4 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 mb-6 uppercase tracking-wide">
          Supported Platforms
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {SUPPORTED_PLATFORMS.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="px-4 py-2 bg-white dark:bg-secondary rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <span className="text-sm font-medium">{platform.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default PlatformBadges
