'use server'

import { kv } from '@vercel/kv'

interface FavoritePizza {
  type: string
  size: string
  toppings: string[]
}

export async function registerUser(name: string, cellNumber: string, favoritePizza: FavoritePizza) {
  try {
    await kv.set(`user:${cellNumber}`, { name, favoritePizza })
    return { success: true }
  } catch (error) {
    console.error('Error registering user:', error)
    return { success: false, error: 'Failed to register user' }
  }
}

