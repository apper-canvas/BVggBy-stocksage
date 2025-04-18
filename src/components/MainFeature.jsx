import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Trash2, AlertTriangle, CheckCircle, XCircle, Eye, ArrowUpDown, MoreVertical, ShoppingCart } from 'lucide-react'

export default function MainFeature({ activeTab, searchQuery }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    cost: '',
    quantity: '',
    reorderPoint: ''
  })
  const [formErrors, setFormErrors] = useState({})

  // Mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: "Organic Cotton T-Shirt",
          sku: "APP-TS-001",
          category: "Apparel",
          price: 24.99,
          cost: 12.50,
          quantity: 45,
          reorderPoint: 15,
          supplier: "EcoTextiles Inc.",
          lastRestocked: "2023-10-15"
        },
        {
          id: 2,
          name: "Wireless Bluetooth Headphones",
          sku: "ELEC-HP-002",
          category: "Electronics",
          price: 79.99,
          cost: 42.00,
          quantity: 12,
          reorderPoint: 10,
          supplier: "TechGadgets Ltd.",
          lastRestocked: "2023-11-02"
        },
        {
          id: 3,
          name: "Stainless Steel Water Bottle",
          sku: "HOME-WB-003",
          category: "Home Goods",
          price: 18.95,
          cost: 8.75,
          quantity: 78,
          reorderPoint: 25,
          supplier: "EcoLiving Supplies",
          lastRestocked: "2023-10-28"
        },
        {
          id: 4,
          name: "Organic Facial Cleanser",
          sku: "BEAUTY-FC-004",
          category: "Beauty",
          price: 22.50,
          cost: 11.25,
          quantity: 8,
          reorderPoint: 15,
          supplier: "NaturalBeauty Co.",
          lastRestocked: "2023-11-05"
        },
        {
          id: 5,
          name: "Ergonomic Office Chair",
          sku: "FURN-CH-005",
          category: "Furniture",
          price: 189.99,
          cost: 95.00,
          quantity: 5,
          reorderPoint: 3,
          supplier: "OfficePro Supplies",
          lastRestocked: "2023-09-20"
        },
        {
          id: 6,
          name: "Wireless Charging Pad",
          sku: "ELEC-CP-006",
          category: "Electronics",
          price: 29.99,
          cost: 14.50,
          quantity: 32,
          reorderPoint: 10,
          supplier: "TechGadgets Ltd.",
          lastRestocked: "2023-10-10"
        }
      ]
      
      setProducts(mockProducts)
      setLoading(false)
    }, 800)
  }, [])

  // Filter products based on active tab and search query
  const filteredProducts = products.filter(product => {
    // Filter by tab
    if (activeTab === 'low' && product.quantity > product.reorderPoint) {
      return false
    }
    
    // Filter by search
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.sku.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) errors.name = "Product name is required"
    if (!formData.category.trim()) errors.category = "Category is required"
    
    if (!formData.price.trim()) {
      errors.price = "Price is required"
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      errors.price = "Price must be a positive number"
    }
    
    if (!formData.cost.trim()) {
      errors.cost = "Cost is required"
    } else if (isNaN(parseFloat(formData.cost)) || parseFloat(formData.cost) <= 0) {
      errors.cost = "Cost must be a positive number"
    }
    
    if (!formData.quantity.trim()) {
      errors.quantity = "Quantity is required"
    } else if (isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) < 0) {
      errors.quantity = "Quantity must be a non-negative integer"
    }
    
    if (!formData.reorderPoint.trim()) {
      errors.reorderPoint = "Reorder point is required"
    } else if (isNaN(parseInt(formData.reorderPoint)) || parseInt(formData.reorderPoint) < 0) {
      errors.reorderPoint = "Reorder point must be a non-negative integer"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    if (selectedProduct) {
      // Update existing product
      const updatedProducts = products.map(product => 
        product.id === selectedProduct.id 
          ? { 
              ...product, 
              name: formData.name,
              category: formData.category,
              price: parseFloat(formData.price),
              cost: parseFloat(formData.cost),
              quantity: parseInt(formData.quantity),
              reorderPoint: parseInt(formData.reorderPoint)
            } 
          : product
      )
      setProducts(updatedProducts)
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        name: formData.name,
        sku: `SKU-${Math.floor(Math.random() * 10000)}`,
        category: formData.category,
        price: parseFloat(formData.price),
        cost: parseFloat(formData.cost),
        quantity: parseInt(formData.quantity),
        reorderPoint: parseInt(formData.reorderPoint),
        supplier: "New Supplier",
        lastRestocked: new Date().toISOString().split('T')[0]
      }
      setProducts([...products, newProduct])
    }
    
    // Reset form and close modal
    resetForm()
  }

  // Open modal for adding/editing product
  const openModal = (product = null) => {
    if (product) {
      setSelectedProduct(product)
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        cost: product.cost.toString(),
        quantity: product.quantity.toString(),
        reorderPoint: product.reorderPoint.toString()
      })
    } else {
      setSelectedProduct(null)
      resetForm()
    }
    setIsModalOpen(true)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      cost: '',
      quantity: '',
      reorderPoint: ''
    })
    setFormErrors({})
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  // Delete product
  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id))
  }

  // Update stock quantity
  const updateStock = (id, amount) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const newQuantity = Math.max(0, product.quantity + amount)
        return { ...product, quantity: newQuantity }
      }
      return product
    }))
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {sortedProducts.length === 0 ? (
            <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center mb-4">
                <ShoppingCart size={24} className="text-surface-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-surface-500 dark:text-surface-400 mb-6">
                {searchQuery 
                  ? "Try adjusting your search criteria" 
                  : "Add your first product to get started"}
              </p>
              <button 
                onClick={() => openModal()} 
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <Plus size={18} />
                <span>Add Product</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-100 dark:bg-surface-700">
                    <th className="px-4 py-3 text-left">
                      <button 
                        onClick={() => handleSort('name')} 
                        className="flex items-center gap-1 font-semibold text-surface-700 dark:text-surface-300"
                      >
                        Product
                        {sortField === 'name' && (
                          <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'} />
                        )}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button 
                        onClick={() => handleSort('category')} 
                        className="flex items-center gap-1 font-semibold text-surface-700 dark:text-surface-300"
                      >
                        Category
                        {sortField === 'category' && (
                          <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'} />
                        )}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button 
                        onClick={() => handleSort('price')} 
                        className="flex items-center gap-1 font-semibold text-surface-700 dark:text-surface-300"
                      >
                        Price
                        {sortField === 'price' && (
                          <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'} />
                        )}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button 
                        onClick={() => handleSort('quantity')} 
                        className="flex items-center gap-1 font-semibold text-surface-700 dark:text-surface-300"
                      >
                        Stock
                        {sortField === 'quantity' && (
                          <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'} />
                        )}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((product) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800/60"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-surface-500 dark:text-surface-400">{product.sku}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="badge badge-primary">{product.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium">${product.price.toFixed(2)}</div>
                          <div className="text-sm text-surface-500 dark:text-surface-400">Cost: ${product.cost.toFixed(2)}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{product.quantity}</div>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => updateStock(product.id, -1)}
                              className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700"
                            >
                              <span className="font-bold">-</span>
                            </button>
                            <button 
                              onClick={() => updateStock(product.id, 1)}
                              className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700"
                            >
                              <span className="font-bold">+</span>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {product.quantity <= product.reorderPoint ? (
                          <div className="flex items-center gap-1 text-amber-500">
                            <AlertTriangle size={14} />
                            <span>Low Stock</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-green-500">
                            <CheckCircle size={14} />
                            <span>In Stock</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openModal(product)}
                            className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
                            aria-label="Edit product"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
                            aria-label="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Add/Edit Product Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={resetForm}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">
                        {selectedProduct ? "Edit Product" : "Add New Product"}
                      </h2>
                      <button 
                        onClick={resetForm}
                        className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Product Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`input ${formErrors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                          {formErrors.name && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium mb-1">
                            Category
                          </label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`input ${formErrors.category ? 'border-red-500 dark:border-red-500' : ''}`}
                          >
                            <option value="">Select a category</option>
                            <option value="Apparel">Apparel</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Home Goods">Home Goods</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Furniture">Furniture</option>
                          </select>
                          {formErrors.category && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="price" className="block text-sm font-medium mb-1">
                              Price ($)
                            </label>
                            <input
                              type="text"
                              id="price"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              className={`input ${formErrors.price ? 'border-red-500 dark:border-red-500' : ''}`}
                            />
                            {formErrors.price && (
                              <p className="mt-1 text-sm text-red-500">{formErrors.price}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="cost" className="block text-sm font-medium mb-1">
                              Cost ($)
                            </label>
                            <input
                              type="text"
                              id="cost"
                              name="cost"
                              value={formData.cost}
                              onChange={handleChange}
                              className={`input ${formErrors.cost ? 'border-red-500 dark:border-red-500' : ''}`}
                            />
                            {formErrors.cost && (
                              <p className="mt-1 text-sm text-red-500">{formErrors.cost}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                              Quantity
                            </label>
                            <input
                              type="text"
                              id="quantity"
                              name="quantity"
                              value={formData.quantity}
                              onChange={handleChange}
                              className={`input ${formErrors.quantity ? 'border-red-500 dark:border-red-500' : ''}`}
                            />
                            {formErrors.quantity && (
                              <p className="mt-1 text-sm text-red-500">{formErrors.quantity}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="reorderPoint" className="block text-sm font-medium mb-1">
                              Reorder Point
                            </label>
                            <input
                              type="text"
                              id="reorderPoint"
                              name="reorderPoint"
                              value={formData.reorderPoint}
                              onChange={handleChange}
                              className={`input ${formErrors.reorderPoint ? 'border-red-500 dark:border-red-500' : ''}`}
                            />
                            {formErrors.reorderPoint && (
                              <p className="mt-1 text-sm text-red-500">{formErrors.reorderPoint}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="btn btn-outline"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          {selectedProduct ? "Update Product" : "Add Product"}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}