'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/api/auth' // Updated import statement

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await login(username, password)
      if (result.success) {
        router.push('/dashboard')
      } else {
        setError(result.error || 'An error occurred during login')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label className="block" htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mt-4">
        <label className="block" htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && (
        <div className="text-red-500 mt-2 p-2 bg-red-100 border border-red-300 rounded">
          {error}
        </div>
      )}
      <div className="flex items-baseline justify-between mt-4">
        <button 
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-300 transition-colors duration-300" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  )
}

