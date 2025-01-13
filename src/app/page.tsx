import { NotificationQRCode } from '@/components/NotificationQRCode'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Pizza Ordering System</h1>
      <NotificationQRCode orderId="123" storeNumber="456" />
    </main>
  )
}

