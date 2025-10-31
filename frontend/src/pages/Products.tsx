import React from 'react'
import EmptyState from '../components/EmptyState'

export default function Products() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-primary-700 mb-6">Products</h1>
      <div className="card">
        <EmptyState
          title="No products yet"
          description="You don't have any products in your catalog. Add products to start tracking sales and inventory."
          actionText="Add Product"
          onAction={() => alert('Open Add Product modal (not implemented)')}
        />
      </div>
    </div>
  )
}
