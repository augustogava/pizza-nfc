'use client'

import { useState } from 'react'
import { Smartphone } from 'lucide-react'

export function NFCScanner() {
  const [isSupported, setIsSupported] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return 'NDEFReader' in window
    }
    return false
  })

  const handleStartScan = async () => {
    try {
      if ('NDEFReader' in window) {
        const ndef = new (window as any).NDEFReader()
        await ndef.scan()
        
        ndef.addEventListener("reading", ({ message }: any) => {
          // Handle the NFC tag reading here
          console.log("NFC tag read:", message)
        })
      }
    } catch (error) {
      console.error("Error scanning NFC:", error)
      setIsSupported(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-2">Scan NFC Tag</h2>
      <p className="text-gray-600 mb-8">
        Tap your NFC-enabled device to quickly load your favorite pizza
      </p>
      
      <div className="flex flex-col items-center">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <Smartphone className="w-12 h-12 text-gray-600" />
        </div>
        
        <button
          onClick={handleStartScan}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Start NFC Scan
        </button>
        
        {!isSupported && (
          <p className="text-gray-500 mt-4 text-sm text-center">
            NFC is not supported on this device
          </p>
        )}
      </div>
    </div>
  )
}

