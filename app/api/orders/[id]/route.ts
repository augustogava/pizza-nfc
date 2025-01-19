import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { status } = await request.json()

  try {
    const orderIndex = await kv.lpos('orders', id)
    if (orderIndex === null) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const orderJson = await kv.lindex('orders', orderIndex)
    const order = JSON.parse(orderJson)
    order.status = status

    await kv.lset('orders', orderIndex, JSON.stringify(order))

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

