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

interface UsersListProps {
  users: User[]
}

export function UsersList({ users }: UsersListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Users and Their Favorite Pizzas</h2>
      {users.length === 0 ? (
        <p>No users registered yet.</p>
      ) : (
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user.id} className="border p-4 rounded-md">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Cell Number:</strong> {user.cellNumber}</p>
              <p><strong>Favorite Pizza:</strong> {user.favoritePizza.type} ({user.favoritePizza.size})</p>
              <p><strong>Favorite Toppings:</strong> {user.favoritePizza.toppings.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

