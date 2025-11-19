
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, Product } from '../types';

const AdminPage: React.FC = () => {
  const { orders, updateOrderStatus, products, updateProduct } = useApp();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingProduct) {
      const { name, value } = e.target;
      setEditingProduct({
        ...editingProduct,
        [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
      });
    }
  };

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold font-serif text-gray-900">Admin Dashboard</h1>

      {/* Order Management */}
      <div>
        <h2 className="text-2xl font-semibold font-serif mb-4">Manage Orders</h2>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Customer ID</th>
                <th scope="col" className="px-6 py-3">Total</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">{order.userId}</td>
                  <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className="border-gray-300 rounded-md shadow-sm"
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Management */}
      <div>
        <h2 className="text-2xl font-semibold font-serif mb-4">Manage Inventory</h2>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Product Name</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Stock</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4">
                    {editingProduct?.id === product.id ? (
                      <input type="number" name="price" value={editingProduct.price} onChange={handleProductChange} className="w-24 border-gray-300 rounded-md shadow-sm" />
                    ) : `$${product.price.toFixed(2)}`}
                  </td>
                  <td className="px-6 py-4">
                    {editingProduct?.id === product.id ? (
                      <input type="number" name="stock" value={editingProduct.stock} onChange={handleProductChange} className="w-20 border-gray-300 rounded-md shadow-sm" />
                    ) : product.stock}
                  </td>
                  <td className="px-6 py-4">
                    {editingProduct?.id === product.id ? (
                      <button onClick={handleSaveProduct} className="font-medium text-green-600 hover:underline">Save</button>
                    ) : (
                      <button onClick={() => handleEditProduct(product)} className="font-medium text-blue-600 hover:underline">Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

