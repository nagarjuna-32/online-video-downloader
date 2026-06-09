import React from 'react'
import { motion } from 'framer-motion'
import { Download, Music, FileText, ListVideo } from 'lucide-react'

const Features: React.FC = () => {
  const features = [
    {
      icon: Download,
      title: 'Video Download',
      description: 'Download videos in multiple resolutions and formats',
    },
    {
      icon: Music,
      title: 'Audio Extraction',
      description: 'Extract audio in MP3, M4A, and other formats',
    },
    {
      icon: FileText,
      title: 'Subtitle Download',
      description: 'Download subtitles in SRT or VTT format',
    },
    {
      icon: ListVideo,
      title: 'Batch Processing',
      description: 'Download multiple videos in one go',
    },
  ]

  return (
    <section className="py-16 px-4 bg-background dark:bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
        >
          Powerful Features
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
