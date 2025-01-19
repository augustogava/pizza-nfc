'use client'

import { useState, useEffect } from 'react'
import { NewOrders } from './NewOrders'
import { UsersList } from './UsersList'
import { Loader2 } from 'lucide-react'

interface Order {
  id: string
  userId: string
  pizza: {
    type: string
    size: string
    toppings: string[]
  }
  status: 'new' | 'preparing' | 'ready' | 'delivered'
  createdAt: string
}

interface User {
  id: string
  name: string
  cellNumber: string
  favoritePizza: {
    type: string
    size: string
    toppings: string[]
  }
}

export function RestaurantOwnerDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, usersResponse] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/users')
        ])

        if (!ordersResponse.ok) {
          throw new Error(`Failed to fetch orders: ${ordersResponse.statusText}`)
        }

        if (!usersResponse.ok) {
          throw new Error(`Failed to fetch users: ${usersResponse.statusText}`)
        }

        const ordersData = await ordersResponse.json()
        const usersData = await usersResponse.json()

        setOrders(ordersData)
        setUsers(usersData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>Error: {error}</p>
        <p>Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NewOrders orders={orders} setOrders={setOrders} />
      <UsersList users={users} />
    </div>
  )
}

