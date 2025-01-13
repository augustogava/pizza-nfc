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

  // Get the cellphone number from the User-Agent header
  const userAgent = request.headers.get('user-agent') || ''
  const cellNumber = extractCellNumber(userAgent)

  if (!orderId || !storeNumber) {
    return NextResponse.json({ error: 'Missing orderId or storeNumber' }, { status: 400 })
  }

  if (!cellNumber) {
    return NextResponse.json({ error: 'Unable to detect cellphone' }, { status: 400 })
  }

  try {
    // Check if it's a new user
    const user = await kv.get<User>(`user:${cellNumber}`)

    if (!user) {
      // If it's a new user, we'll return a response indicating that registration is needed
      return NextResponse.json({ status: 'new_user', orderId, storeNumber, cellNumber })
    } else {
      // If it's an existing user, place the order with their favorite pizza
      const { name, favoritePizza } = user

      // In a real application, you would implement the actual order placement logic here
      console.log(`Placing order for ${name}: ${favoritePizza.type} pizza (${favoritePizza.size}) with ${favoritePizza.toppings.join(', ')}`)

      // Simulate notifying the restaurant
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
  // This is a simplified example. In a real-world scenario, you'd use a more robust method
  // to identify the device and extract the phone number, possibly involving device fingerprinting
  // or integration with mobile OS APIs.
  const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  if (mobilePattern.test(userAgent)) {
    // For demonstration, we're returning a dummy number. 
    // In reality, you'd need to implement a secure way to obtain the actual number.
    return '11954859333'
  }else {
    return '11954859333'
  }
  return null
}

