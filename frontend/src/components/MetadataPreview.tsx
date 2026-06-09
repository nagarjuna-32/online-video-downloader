import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Music, FileText } from 'lucide-react'
import { formatFileSize, formatDuration, downloadFile } from '../utils/helpers'
import { api } from '../utils/api'
import type { MetadataResponse } from '../types'

interface MetadataPreviewProps {
  metadata: MetadataResponse
  url: string
  onDownloadComplete?: () => void
}

const MetadataPreview: React.FC<MetadataPreviewProps> = ({ metadata, url, onDownloadComplete }) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)
  const [downloadType, setDownloadType] = useState<'video' | 'audio' | 'subtitle'>('video')
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    if (!selectedFormat) return

    setDownloading(true)
    try {
      const blob = await api.download({
        url,
        format_id: selectedFormat,
        type: downloadType,
      })

      const filename = `${metadata.title}-${selectedFormat}.${selectedFormat.split('.').pop()}`
      downloadFile(blob, filename)
      onDownloadComplete?.()
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setDownloading(false)
    }
  }

  const formats = downloadType === 'audio' ? (metadata.audio_formats || []) : metadata.formats

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid md:grid-cols-3 gap-6 mt-8 bg-white dark:bg-secondary rounded-lg p-6 shadow-lg"
    >
      {/* Thumbnail & Info */}
      <div className="md:col-span-1">
        <motion.img
          src={metadata.thumbnail}
          alt={metadata.title}
          className="w-full rounded-lg mb-4 shadow-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        />
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Platform: <span className="text-primary">{metadata.platform}</span>
          </p>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Duration: <span className="text-primary">{formatDuration(metadata.duration)}</span>
          </p>
          {metadata.upload_date && (
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Uploaded: <span className="text-primary">{metadata.upload_date}</span>
            </p>
          )}
        </div>
      </div>

      {/* Details & Downloads */}
      <div className="md:col-span-2 space-y-4">
        <h3 className="text-2xl font-bold">{metadata.title}</h3>

        {/* Download Type Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setDownloadType('video')}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
              downloadType === 'video'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Download className="w-4 h-4" />
            Video
          </button>
          <button
            onClick={() => setDownloadType('audio')}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
              downloadType === 'audio'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Music className="w-4 h-4" />
            Audio
          </button>
          {metadata.subtitles.length > 0 && (
            <button
              onClick={() => setDownloadType('subtitle')}
              className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                downloadType === 'subtitle'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              Subtitles
            </button>
          )}
        </div>

        {/* Format Selection */}
        <div className="space-y-2">
          <label className="block font-semibold text-sm">Select Format:</label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {formats.map((format) => (
              <motion.button
                key={format.format_id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedFormat(format.format_id)}
                className={`p-3 rounded-lg text-left border-2 transition-all ${
                  selectedFormat === format.format_id
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <p className="font-semibold">{format.format_name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {format.filesize ? formatFileSize(format.filesize) : 'Size unknown'}
                </p>
                {format.bitrate && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">{format.bitrate}</p>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Ad placeholder */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center text-sm text-gray-600 dark:text-gray-400">
          [Advertisement]
        </div>

        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={!selectedFormat || downloading}
          className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-green-600 disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          {downloading ? 'Downloading...' : 'Download Now'}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default MetadataPreview
