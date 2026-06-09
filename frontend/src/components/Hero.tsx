import React from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

const Hero: React.FC<{ onScrollToInput: () => void }> = ({ onScrollToInput }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10 dark:from-primary/5 dark:via-secondary dark:to-accent/5 overflow-hidden"
    >
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-primary"
        >
          Download Smarter
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
        >
          Analyze and download videos from your favorite platforms. Faster. Simpler. Smarter.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onScrollToInput}
          className="px-8 py-4 bg-accent text-white rounded-lg font-semibold text-lg hover:bg-green-600 flex items-center gap-2 mx-auto shadow-lg"
        >
          <Download className="w-6 h-6" />
          Get Started
        </motion.button>

        {/* Ad placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto text-sm text-gray-600 dark:text-gray-400"
        >
          [Advertisement]
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Hero
