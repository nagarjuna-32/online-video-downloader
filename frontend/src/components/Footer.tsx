import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Twitter } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-secondary text-background dark:bg-gray-900 dark:text-background py-12 px-4 border-t border-gray-800"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
        {/* About */}
        <div>
          <h3 className="font-bold text-lg mb-3">DownloadMedia</h3>
          <p className="text-sm opacity-80">Download Smarter. Faster. Simpler.</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-3">
            <a href="#" className="hover:text-accent transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Ad placeholder */}
      <div className="bg-gray-800 dark:bg-gray-800 rounded-lg p-4 text-center text-sm text-gray-400 mb-8">
        [Advertisement]
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 pt-6 text-center text-sm opacity-70">
        <p>&copy; {currentYear} DownloadMedia. All rights reserved.</p>
      </div>
    </motion.footer>
  )
}

export default Footer
