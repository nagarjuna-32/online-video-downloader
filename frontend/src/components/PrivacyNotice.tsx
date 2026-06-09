import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { PRIVACY_NOTICE } from '../utils/constants'

const PrivacyNotice: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6 flex gap-3"
    >
      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 dark:text-amber-100">{PRIVACY_NOTICE}</p>
    </motion.div>
  )
}

export default PrivacyNotice
