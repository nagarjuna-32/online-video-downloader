import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { updateSEOMetadata } from '../utils/seo'
import { FileText, CheckCircle, Scale, AlertTriangle, ShieldAlert, Edit } from 'lucide-react'

const TermsOfService: React.FC = () => {
  useEffect(() => {
    updateSEOMetadata({
      title: 'Terms of Service | DownloadMedia',
      description: 'Read the terms and conditions governing the use of DownloadMedia.',
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
          <FileText className="w-16 h-16 text-primary dark:text-accent mx-auto" />
          <h2 className="text-4xl font-extrabold text-primary dark:text-accent tracking-tight">
            Terms of Service
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: June 2026
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-800 dark:text-gray-200">
          <p className="text-lg leading-relaxed">
            Welcome to DownloadMedia. By accessing or using our website and downloader tools, you agree to comply with and be bound by the following Terms of Service. Please review them carefully.
          </p>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <CheckCircle className="w-5 h-5" />
              1. Acceptance of Terms
            </h3>
            <p className="leading-relaxed">
              By accessing, browsing, or utilizing the services provided by DownloadMedia, you acknowledge that you have read, understood, and agreed to these terms. If you do not agree with any part of these terms, you must not use our website.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <Scale className="w-5 h-5" />
              2. Permitted Use
            </h3>
            <p className="leading-relaxed">
              DownloadMedia acts as a technical client-side downloader utility. You may only download media content if you satisfy at least one of the following criteria:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are the original owner and copyright holder of the content.</li>
              <li>You have obtained explicit permission from the copyright owner to download the content.</li>
              <li>The content is explicitly public domain, has been licensed under Creative Commons, or you are otherwise legally entitled under fair use exceptions to save it for offline personal use.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <ShieldAlert className="w-5 h-5" />
              3. Prohibited Activities
            </h3>
            <p className="leading-relaxed">
              By using our service, you agree not to perform any of the following activities:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violating copyright laws or accessing protected intellectual property without authorization.</li>
              <li>Circumventing digital rights management (DRM) protections or downloading login-restricted media files.</li>
              <li>Redistributing, commercializing, or selling any downloaded material without explicit consent from its respective owner.</li>
              <li>Using automated crawlers, scrapers, or scripts to overload our application servers.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <AlertTriangle className="w-5 h-5" />
              4. Disclaimer of Warranties
            </h3>
            <p className="leading-relaxed font-light">
              DownloadMedia is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that our service will be uninterrupted, error-free, secure, or free from platform compatibility changes. Platform extractors depend on third-party site APIs and can stop operating at any time without notification.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <Scale className="w-5 h-5" />
              5. Limitation of Liability
            </h3>
            <p className="leading-relaxed">
              In no event shall DownloadMedia, its owners, operators, or contributors be held liable for any damages, losses, or legal disputes arising from your use of the site or how you utilize downloaded files. The user is solely responsible for obtaining the necessary copyrights and permissions.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary dark:text-accent">
              <Edit className="w-5 h-5" />
              6. Modifications
            </h3>
            <p className="leading-relaxed">
              We reserve the right to revise or modify these Terms of Service at any time without prior notice. By continuing to use the service after modifications are posted, you accept the revised terms.
            </p>
          </section>
        </div>
      </motion.div>
    </Layout>
  )
}

export default TermsOfService
