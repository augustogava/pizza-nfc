'use client'

import { useState } from 'react'
import { generateNotificationUrl } from '@/app/actions/generateNotificationUrl'

export function useNotificationQRCode() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [notificationUrl, setNotificationUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateQRCode = async (orderId: string, storeNumber: string) => {
    setIsGenerating(true)
    setError(null)

    try {
      const url = await generateNotificationUrl(orderId, storeNumber)
      setNotificationUrl(url)
    } catch (err) {
      setError('Failed to generate notification URL')
      setNotificationUrl(null)
    } finally {
      setIsGenerating(false)
    }
  }

  return { generateQRCode, isGenerating, notificationUrl, error }
}

