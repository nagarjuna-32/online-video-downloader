import axios from 'axios'
import type { AnalysisRequest, MetadataResponse, DownloadRequest, BatchDownloadRequest, DownloadHistoryItem } from '../types'

const API_BASE_URL = '/api'

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

export const api = {
  analyze: async (request: AnalysisRequest): Promise<MetadataResponse> => {
    const response = await client.post('/analyze', request)
    return response.data
  },

  download: async (request: DownloadRequest): Promise<Blob> => {
    const response = await client.post('/download', request, {
      responseType: 'blob',
    })
    return response.data
  },

  batchDownload: async (request: BatchDownloadRequest) => {
    const response = await client.post('/batch-download', request)
    return response.data
  },

  getHistory: async (): Promise<DownloadHistoryItem[]> => {
    const response = await client.get('/history')
    return response.data
  },

  clearHistory: async (): Promise<void> => {
    await client.delete('/history')
  },

  getAdminStats: async () => {
    const response = await client.get('/admin/stats')
    return response.data
  },
}
