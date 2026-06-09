export interface VideoFormat {
  format_id: string
  format_name: string
  ext: string
  resolution?: string
  filesize?: number
  bitrate?: string
}

export interface Subtitle {
  language: string
  ext: string
}

export interface MetadataResponse {
  platform: string
  title: string
  thumbnail: string
  duration: number
  uploader?: string
  upload_date?: string
  formats: VideoFormat[]
  audio_formats?: VideoFormat[]
  subtitles: Subtitle[]
  playlist_count?: number
}

export interface DownloadRequest {
  url: string
  format_id: string
  type: 'video' | 'audio' | 'subtitle'
}

export interface DownloadHistoryItem {
  id: string
  title: string
  platform: string
  format: string
  downloaded_at: string
  file_size?: number
}

export interface AnalysisRequest {
  url: string
}

export interface BatchDownloadRequest {
  urls: string[]
  format_id: string
  type: 'video' | 'audio'
}

export interface BatchDownloadStatus {
  url: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress?: number
  error?: string
}
