import { redirect } from 'next/navigation'
import { getSession } from '@/app/actions/auth'
import { RestaurantOwnerDashboard } from '@/app/components/RestaurantOwnerDashboard'
import { LogoutButton } from '@/app/components/LogoutButton'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Restaurant Owner Dashboard</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">Welcome, Restaurant Owner</p>
          <LogoutButton />
        </div>
      </div>
      <RestaurantOwnerDashboard />
    </div>
  )
}

