'use client'

import { useState } from 'react'
import { registerUser } from '@/app/actions/user'

interface UserRegistrationProps {
  cellNumber: string
  onRegister: () => void
}

interface FavoritePizza {
  type: string
  size: string
  toppings: string[]
}

export function UserRegistration({ cellNumber, onRegister }: UserRegistrationProps) {
  const [name, setName] = useState('')
  const [favoritePizza, setFavoritePizza] = useState<FavoritePizza>({
    type: '',
    size: '',
    toppings: []
  })
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegistering(true)
    setError(null)

    try {
      const result = await registerUser(name, cellNumber, favoritePizza)
      if (result.success) {
        onRegister()
      } else {
        throw new Error(result.error || 'Failed to register user')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* TODO Form */}
    </form>
  )
}

