'use client'

import { useState } from 'react'
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

interface NewOrdersProps {
  orders: Order[]
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

export function NewOrders({ orders, setOrders }: NewOrdersProps) {
  const [processingOrder, setProcessingOrder] = useState<string | null>(null)

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    setProcessingOrder(orderId)
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update order status')
      }

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch (error) {
      console.error('Error updating order status:', error)
      // You might want to show an error message to the user here
    } finally {
      setProcessingOrder(null)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">New Orders</h2>
      {orders.length === 0 ? (
        <p>No new orders at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="border p-4 rounded-md">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Pizza:</strong> {order.pizza.type} ({order.pizza.size})</p>
              <p><strong>Toppings:</strong> {order.pizza.toppings.join(', ')}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              {order.status === 'new' && (
                <button
                  onClick={() => handleUpdateStatus(order.id, 'preparing')}
                  disabled={processingOrder === order.id}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {processingOrder === order.id ? (
                    <>
                      <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Start Preparing'
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

