'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
      router.push('/login')
    })
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging out...
        </>
      ) : (
        'Logout'
      )}
    </Button>
  )
}

