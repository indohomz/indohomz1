import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'

interface ProductItem {
  id: number
  name: string
  sku: string
  stock: number
  price: number
}

const mockProducts: ProductItem[] = [
  { id: 1, name: 'Wireless Headphones', sku: 'WH-001', stock: 120, price: 99.99 },
  { id: 2, name: 'Smartphone X', sku: 'SP-010', stock: 32, price: 699.0 },
  { id: 3, name: 'Coffee Maker', sku: 'CM-23', stock: 0, price: 49.5 },
]

const ProductsList: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Products</h2>
        <div className="flex items-center space-x-2">
          <button className="btn-outline">Import</button>
          <button className="btn-primary">Add Product</button>
        </div>
      </div>

      <div className="overflow-auto rounded-lg border border-gray-100">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {mockProducts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500">Category: Electronics</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.sku}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${p.stock === 0 ? 'text-red-500' : 'text-gray-700'}`}>{p.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${p.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button title="Edit" className="p-2 mr-2 text-gray-500 hover:text-primary-600"><Edit2 className="h-4 w-4"/></button>
                  <button title="Delete" className="p-2 text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsList
import React from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { Product } from '../../services/api'

const mockProducts: Product[] = [
  { id: 1, name: 'Running Shoes', category: 'Footwear', price: 89.99, sku: 'SH-001', stock_quantity: 48, reorder_level: 10, is_active: true, created_at: new Date().toISOString(), total_spent: 0, total_orders: 0, brand: 'Stride', description: '', cost: 50, subcategory: '', updated_at: undefined },
  { id: 2, name: 'Classic T-Shirt', category: 'Apparel', price: 19.99, sku: 'TS-013', stock_quantity: 120, reorder_level: 30, is_active: true, created_at: new Date().toISOString(), total_spent: 0, total_orders: 0, brand: 'Basics', description: '', cost: 6, subcategory: '', updated_at: undefined },
  { id: 3, name: 'Wireless Headphones', category: 'Electronics', price: 149.99, sku: 'HP-078', stock_quantity: 12, reorder_level: 5, is_active: true, created_at: new Date().toISOString(), total_spent: 0, total_orders: 0, brand: 'AudioMax', description: '', cost: 70, subcategory: '', updated_at: undefined },
]

const ProductsList: React.FC = () => {
  const products = mockProducts

  if (!products.length) {
    return <div className="p-6">No products</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-500 border-b">
            <th className="py-3 px-2">Product</th>
            <th className="py-3 px-2">Category</th>
            <th className="py-3 px-2">Price</th>
            <th className="py-3 px-2">Stock</th>
            <th className="py-3 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="py-3 px-2">
                <div className="font-medium text-gray-900 dark:text-white">{p.name}</div>
                <div className="text-xs text-gray-500">SKU: {p.sku}</div>
              </td>
              <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">{p.category}</td>
              <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">${p.price.toFixed(2)}</td>
              <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">{p.stock_quantity}</td>
              <td className="py-3 px-2">
                <div className="flex items-center space-x-2">
                  <button title="Edit" className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Edit className="h-4 w-4 text-primary-600" />
                  </button>
                  <button title="Delete" className="p-2 rounded hover:bg-red-50 dark:hover:bg-red-900">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsList
