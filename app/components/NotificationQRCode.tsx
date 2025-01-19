'use client'

import { useState } from 'react'
import { useNotificationQRCode } from '@/hooks/useNotificationQRCode'
import { QRCodeSVG } from 'qrcode.react'
import { UserRegistration } from './UserRegistration'
import { Loader2 } from 'lucide-react'

interface NotificationQRCodeProps {
  orderId: string
  storeNumber: string
}

export function NotificationQRCode({ orderId, storeNumber }: NotificationQRCodeProps) {
  const { generateQRCode, isGenerating, notificationUrl, error } = useNotificationQRCode()
  const [isNewUser, setIsNewUser] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderMessage, setOrderMessage] = useState('')
  const [detectedCellNumber, setDetectedCellNumber] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingError, setProcessingError] = useState<string | null>(null)

  const handleGenerateQRCode = async () => {
    setProcessingError(null)
    await generateQRCode(orderId, storeNumber)
  }

  const handleScanResult = async () => {
    if (!notificationUrl) return

    setIsProcessing(true)
    setProcessingError(null)

    try {
      const response = await fetch(notificationUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json()
        if (data.status === 'new_user') {
          setIsNewUser(true)
          setDetectedCellNumber(data.cellNumber)
        } else if (data.status === 'order_placed') {
          setOrderPlaced(true)
          setOrderMessage(data.message)
        } else {
          throw new Error('Unexpected response from server')
        }
      } else {
        throw new Error('Received non-JSON response from server')
      }
    } catch (error) {
      console.error('Error processing QR code:', error)
      setProcessingError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRegistrationComplete = () => {
    setIsNewUser(false)
    handleScanResult()
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {!orderPlaced && !isNewUser && (
        <button
          onClick={handleGenerateQRCode}
          disabled={isGenerating}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 flex items-center"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate QR Code'
          )}
        </button>
      )}

      {error && <p className="text-red-500" role="alert">{error}</p>}

      {notificationUrl && !isNewUser && !orderPlaced && (
        <div className="p-4 border rounded">
          <QRCodeSVG value={notificationUrl} size={256} />
          <p className="mt-2 text-sm text-center">Scan with your mobile device to notify restaurant</p>
          <button
            onClick={handleScanResult}
            disabled={isProcessing}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300 flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Simulate Scan'
            )}
          </button>
        </div>
      )}

      {processingError && (
        <div className="text-red-500 p-4 border border-red-300 rounded" role="alert">
          <p className="font-bold">Error processing QR code:</p>
          <p>{processingError}</p>
          <p className="mt-2">Please try again or contact support if the problem persists.</p>
        </div>
      )}

      {isNewUser && detectedCellNumber && (
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">New User Registration</h2>
          <p className="mb-4">Detected phone number: {detectedCellNumber}</p>
          <UserRegistration cellNumber={detectedCellNumber} onRegister={handleRegistrationComplete} />
        </div>
      )}

      {orderPlaced && (
        <div className="p-4 border rounded bg-green-100">
          <h2 className="text-xl font-bold mb-2">Order Placed!</h2>
          <p>{orderMessage}</p>
        </div>
      )}
    </div>
  )
}

