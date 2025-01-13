'use server'

import { cookies } from 'next/headers'

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

    const cookieStore = await cookies()
    cookieStore.set('sessionId', sessionId, {
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
  const cookieStore = await cookies()
  return cookieStore.get('sessionId')?.value
}

export async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get('sessionId')?.value
}

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}