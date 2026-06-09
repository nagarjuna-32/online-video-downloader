import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  const faqs = [
    {
      question: 'Is it legal to download videos?',
      answer: 'Only download content that you own or have explicit permission to download. Respect copyright and platform terms of service.',
    },
    {
      question: 'Which platforms are supported?',
      answer: 'We support YouTube, Instagram, Facebook, X, TikTok, Pinterest, LinkedIn, and other publicly accessible platforms.',
    },
    {
      question: 'What about private or DRM content?',
      answer: 'We cannot download private, copyrighted, DRM-protected, or login-required content. This tool is for publicly accessible media only.',
    },
    {
      question: 'How long are files stored?',
      answer: 'Downloaded files are temporarily stored and automatically deleted after a specified period for security and privacy.',
    },
    {
      question: 'Can I download playlists?',
      answer: 'Yes! You can download entire playlists or select specific videos from a playlist.',
    },
    {
      question: 'What video qualities are available?',
      answer: 'Available qualities depend on the source platform. Common options include 360p, 480p, 720p, and 1080p.',
    },
  ]

  return (
    <section className="py-16 px-4 bg-white dark:bg-primary/5">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-semibold text-left">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 py-4 bg-white dark:bg-secondary border-t border-gray-200 dark:border-gray-700"
                >
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
