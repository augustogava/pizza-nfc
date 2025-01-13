import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
  try {
    // Check if the KV store is properly initialized
    if (!kv) {
      console.error('KV store is not initialized')
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    // Fetch all user keys
    const userKeys = await kv.keys('user:*')

    // Fetch user data for each key
    const usersPromises = userKeys.map(async (key) => {
      const userData = await kv.get(key)
      if (typeof userData === 'object' && userData !== null) {
        return { id: key.replace('user:', ''), ...userData }
      } else {
        return { id: key.replace('user:', ''), data: userData }
      }
    })

    const users = await Promise.all(usersPromises)

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}