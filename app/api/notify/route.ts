import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

interface User {
  name: string
  favoritePizza: {
    type: string
    size: string
    toppings: string[]
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('orderId')
  const storeNumber = searchParams.get('storeNumber')

  const userAgent = request.headers.get('user-agent') || ''
  const cellNumber = extractCellNumber(userAgent)

  if (!orderId || !storeNumber) {
    return NextResponse.json({ error: 'Missing orderId or storeNumber' }, { status: 400 })
  }

  if (!cellNumber) {
    return NextResponse.json({ error: 'Unable to detect cellphone' }, { status: 400 })
  }

  try {
    const user = await kv.get<User>(`user:${cellNumber}`)

    if (!user) {
      return NextResponse.json({ status: 'new_user', orderId, storeNumber, cellNumber })
    } else {
      const { name, favoritePizza } = user

      console.log(`Placing order for ${name}: ${favoritePizza.type} pizza (${favoritePizza.size}) with ${favoritePizza.toppings.join(', ')}`)

      console.log(`Notifying restaurant for order ${orderId} at store ${storeNumber}`)

      return NextResponse.json({
        status: 'order_placed',
        message: `Order placed for ${name}: ${favoritePizza.type} pizza (${favoritePizza.size}) with ${favoritePizza.toppings.join(', ')}`,
        orderDetails: {
          orderId,
          storeNumber,
          name,
          pizza: favoritePizza
        }
      })
    }
  } catch (error) {
    console.error('Error processing order:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function extractCellNumber(userAgent: string): string | null {
  const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  if (mobilePattern.test(userAgent)) {
    return '11954859333'
  }else {
    return '11954859333'
  }
  return null
}

