'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Simulated database of restaurants
const restaurants = {
  'restaurant1': { password: 'password123' },
  'restaurant2': { password: 'password456' },
}

export async function login(username: string, password: string) {
  try {
    console.log(`Attempting login for username: ${username}`)

    const restaurant = restaurants[username as keyof typeof restaurants]
    
    if (!restaurant) {
      return { success: false, error: 'Restaurant not found' }
    }

    if (restaurant.password !== password) {
      return { success: false, error: 'Invalid password' }
    }

    const sessionId = generateSessionId()
    
    cookies().set('sessionId', sessionId, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    })

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'An error occurred during login' }
  }
}

export async function logout() {
  cookies().delete('sessionId')
  redirect('/login')
}

export async function getSession() {
  const cookieStore = cookies()
  return cookieStore.get('sessionId')?.value
}

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

