import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { updateSEOMetadata } from '../utils/seo'
import { ShieldCheck, Info, Cpu, RefreshCw, Send } from 'lucide-react'

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    updateSEOMetadata({
      title: 'Privacy Policy | DownloadMedia',
      description: 'Read how DownloadMedia handles information, analytics, and user privacy.',
    })
  }, [])

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10 max-w-3xl mx-auto"
      >
        <div className="text-center space-y-4">
          <ShieldCheck className="w-16 h-16 text-primary dark:text-accent mx-auto" />
          <h2 className="text-4xl font-extrabold text-primary dark:text-accent tracking-tight">
            Privacy Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: June 2026
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-800 dark:text-gray-200">
          <p className="text-lg leading-relaxed">
            At DownloadMedia, we prioritize the privacy of our visitors. This Privacy Policy document outlines the types of information we handle, how we process it, and your rights when using our web service.
          </p>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <Info className="w-5 h-5" />
              Information We Collect
            </h3>
            <p className="leading-relaxed">
              DownloadMedia does not require user accounts, email registration, or sign-ups to use our tool. We do not intentionally collect, store, or monitor any personal user information during standard operations.
            </p>
            <p className="leading-relaxed">
              To operate the service effectively, the following non-personally identifiable information may be processed:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Device & Browser Information:</strong> Basic device parameters (browser type, OS version, language preferences) to properly format downloading templates.</li>
              <li><strong>Anonymous Analytics:</strong> Aggregate logs of analyzed platform distributions and features usage to gauge website performance.</li>
              <li><strong>Error Logs:</strong> Temporary backend diagnostics generated in case a conversion fails, used strictly for troubleshooting extraction rules.</li>
              <li><strong>Third-party Cookies:</strong> Cookies set by advertising partners (such as Google AdSense) or analytics services to serve relative promotions.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <Cpu className="w-5 h-5" />
              How We Use Information
            </h3>
            <p className="leading-relaxed">
              The aggregate and technical metadata processed by DownloadMedia is utilized strictly to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ensure the service runs reliably and optimizes video extraction speed.</li>
              <li>Analyze aggregate trends to determine platform support priorities.</li>
              <li>Serve personalized or non-personalized advertisements via partner channels.</li>
              <li>Maintain rate-limiting rules to prevent infrastructure abuse and denial of service.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <RefreshCw className="w-5 h-5" />
              Third-Party Services
            </h3>
            <p className="leading-relaxed">
              We may integrate third-party APIs or analytics vendors to optimize monetization and performance. These external providers use their own security and cookie guidelines:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google AdSense:</strong> Serves advertisements based on previous site interactions. Users can manage or opt out of personalized ads via Google Ad Settings.</li>
              <li><strong>Google Analytics:</strong> Provides statistical analysis on user navigation patterns.</li>
              <li><strong>Hosting Partners:</strong> Provides the underlying server network infrastructure.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <ShieldCheck className="w-5 h-5" />
              User Rights
            </h3>
            <p className="leading-relaxed">
              Since we do not store personal details, profiles, or histories tied to your identity, you have full control over your usage. You may discontinue using our website at any time without leaving any trace of data. You can clear your browser storage and cookies to remove any local state.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <Send className="w-5 h-5" />
              Contact
            </h3>
            <p className="leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or data handling, please navigate to our Contact page or reach out directly at our support channel.
            </p>
          </section>
        </div>
      </motion.div>
    </Layout>
  )
}

export default PrivacyPolicy
