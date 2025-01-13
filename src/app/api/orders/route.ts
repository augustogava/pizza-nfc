import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
  try {
    const orders = await kv.lrange('orders', 0, -1)
    return NextResponse.json(orders.map(order => JSON.parse(order)))
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

