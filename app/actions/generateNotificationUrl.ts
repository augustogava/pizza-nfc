'use server'

export async function generateNotificationUrl(orderId: string, storeNumber: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const notificationUrl = `${baseUrl}/api/notify?orderId=${orderId}&storeNumber=${storeNumber}`
  return notificationUrl
}

