'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MenuItem {
  name: string
  price: number
  description: string
  tags: string[]
}

const menuItems: MenuItem[] = [
  {
    name: "Margherita",
    price: 12.99,
    description: "Fresh tomatoes, mozzarella, basil, and olive oil",
    tags: ["Vegetarian", "Classic"]
  },
  {
    name: "Pepperoni",
    price: 14.99,
    description: "Pepperoni, mozzarella, and tomato sauce",
    tags: ["Spicy", "Popular"]
  },
  {
    name: "Hawaiian",
    price: 13.99,
    description: "Ham, pineapple, mozzarella, and tomato sauce",
    tags: ["Sweet", "Controversial"]
  }
]

export function Menu() {
  const handleAddToCart = (item: MenuItem) => {
    console.log(`Added ${item.name} to cart`)
    // Implement cart functionality here
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="flex flex-col space-y-2 pb-6 last:pb-0 last:border-0 border-b"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex gap-2 mt-2">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold">${item.price.toFixed(2)}</span>
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="block mt-2"
                  size="sm"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

