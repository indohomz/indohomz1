import React, { useState } from 'react'
import EmptyState from '../components/EmptyState'
import ProductsList from '../components/Products/ProductsList'

export default function Products() {
  const [empty, setEmpty] = useState(false)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-primary-700">Products</h1>
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-600">Show empty state</label>
          <input type="checkbox" checked={empty} onChange={() => setEmpty(e => !e)} className="h-4 w-4" />
        </div>
      </div>

      <div className="card">
        {/* Toggle to simulate empty state for testing */}
        {empty ? (
          <EmptyState
            title="No products yet"
            description="You don't have any products in your catalog. Add products to start tracking sales and inventory."
            actionText="Add Product"
            onAction={() => alert('Open Add Product modal (not implemented)')}
          />
        ) : (
          <ProductsList />
        )}
      </div>
    </div>
  )
}
