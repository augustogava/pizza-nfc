'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions/auth'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
    >
      Logout
    </button>
  )
}

