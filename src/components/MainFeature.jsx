import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Trash2, AlertTriangle, CheckCircle, XCircle, Eye, ArrowUpDown, MoreVertical, ShoppingCart, Plus, MinusCircle, PlusCircle, DollarSign, History, Info, ListFilter } from 'lucide-react'
import { format } from 'date-fns'

export default function MainFeature({ activeTab, searchQuery }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isStockModalOpen, setIsStockModalOpen] = useState(false)
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    cost: '',
    quantity: '',
    reorderPoint: ''
  })
  const [stockFormData, setStockFormData] = useState({
    quantity: '',
    reason: '',
    notes: ''
  })
  const [saleFormData, setSaleFormData] = useState({
    quantity: '',
    discount: '',
    notes: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [stockFormErrors, setStockFormErrors] = useState({})
  const [saleFormErrors, setSaleFormErrors] = useState({})
  const [transactionHistory, setTransactionHistory] = useState([])

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
          lastRestocked: "2023-10-15",
          description: "100% organic cotton t-shirt with sustainable manufacturing process.",
          location: "Warehouse A, Shelf B3",
          tags: ["Organic", "Sustainable", "Fashion"],
          images: [
            "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
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
          lastRestocked: "2023-11-02",
          description: "Over-ear wireless headphones with 30-hour battery life and noise cancellation.",
          location: "Warehouse B, Section E2",
          tags: ["Audio", "Wireless", "Tech"],
          images: [
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
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
          lastRestocked: "2023-10-28",
          description: "Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
          location: "Warehouse A, Shelf D5",
          tags: ["Eco-friendly", "Kitchen", "Outdoor"],
          images: [
            "https://images.unsplash.com/photo-1570087647464-b327298bad4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
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
          lastRestocked: "2023-11-05",
          description: "Gentle facial cleanser made with certified organic ingredients suitable for all skin types.",
          location: "Warehouse C, Section A1",
          tags: ["Organic", "Skincare", "Vegan"],
          images: [
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
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
          lastRestocked: "2023-09-20",
          description: "Adjustable ergonomic office chair with lumbar support and breathable mesh back.",
          location: "Warehouse B, Section F1",
          tags: ["Office", "Ergonomic", "Furniture"],
          images: [
            "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
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
          lastRestocked: "2023-10-10",
          description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
          location: "Warehouse B, Section E3",
          tags: ["Charging", "Wireless", "Tech"],
          images: [
            "https://images.unsplash.com/photo-1622438641787-b5e51e5b6911?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
        }
      ]
      
      const mockTransactions = [
        {
          id: 1,
          productId: 1,
          type: 'restock',
          quantity: 15,
          date: '2023-10-15',
          reason: 'Regular inventory replenishment',
          notes: 'Ordered from primary supplier'
        },
        {
          id: 2,
          productId: 2,
          type: 'sale',
          quantity: 3,
          date: '2023-11-03',
          amount: 239.97,
          notes: 'Bulk customer order'
        },
        {
          id: 3,
          productId: 4,
          type: 'adjustment',
          quantity: -2,
          date: '2023-11-05',
          reason: 'Damaged inventory',
          notes: 'Products damaged during shipping'
        }
      ]
      
      setProducts(mockProducts)
      setTransactionHistory(mockTransactions)
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

  // Handle stock form change
  const handleStockChange = (e) => {
    const { name, value } = e.target
    setStockFormData({
      ...stockFormData,
      [name]: value
    })
    
    // Clear error when field is edited
    if (stockFormErrors[name]) {
      setStockFormErrors({
        ...stockFormErrors,
        [name]: ''
      })
    }
  }

  // Handle sale form change
  const handleSaleChange = (e) => {
    const { name, value } = e.target
    setSaleFormData({
      ...saleFormData,
      [name]: value
    })
    
    // Clear error when field is edited
    if (saleFormErrors[name]) {
      setSaleFormErrors({
        ...saleFormErrors,
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

  // Validate stock form
  const validateStockForm = () => {
    const errors = {}
    
    if (!stockFormData.quantity.trim()) {
      errors.quantity = "Quantity is required"
    } else if (isNaN(parseInt(stockFormData.quantity))) {
      errors.quantity = "Quantity must be a number"
    }
    
    if (!stockFormData.reason.trim()) {
      errors.reason = "Reason is required"
    }
    
    setStockFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Validate sale form
  const validateSaleForm = () => {
    const errors = {}
    
    if (!saleFormData.quantity.trim()) {
      errors.quantity = "Quantity is required"
    } else if (isNaN(parseInt(saleFormData.quantity)) || parseInt(saleFormData.quantity) <= 0) {
      errors.quantity = "Quantity must be a positive number"
    } else if (parseInt(saleFormData.quantity) > selectedProduct.quantity) {
      errors.quantity = "Quantity cannot exceed current stock"
    }
    
    if (saleFormData.discount.trim() && (isNaN(parseFloat(saleFormData.discount)) || parseFloat(saleFormData.discount) < 0 || parseFloat(saleFormData.discount) > 100)) {
      errors.discount = "Discount must be between 0 and 100"
    }
    
    setSaleFormErrors(errors)
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
        lastRestocked: new Date().toISOString().split('T')[0],
        description: "",
        location: "Warehouse Storage",
        tags: [formData.category],
        images: [
          "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
      }
      setProducts([...products, newProduct])
    }
    
    // Reset form and close modal
    resetForm()
  }

  // Handle stock form submit
  const handleStockSubmit = (e) => {
    e.preventDefault()
    
    if (!validateStockForm()) return
    
    const quantityChange = parseInt(stockFormData.quantity)
    
    // Update product quantity
    const updatedProducts = products.map(product => {
      if (product.id === selectedProduct.id) {
        const newQuantity = Math.max(0, product.quantity + quantityChange)
        return { ...product, quantity: newQuantity }
      }
      return product
    })
    
    // Add to transaction history
    const newTransaction = {
      id: transactionHistory.length + 1,
      productId: selectedProduct.id,
      type: 'adjustment',
      quantity: quantityChange,
      date: new Date().toISOString().split('T')[0],
      reason: stockFormData.reason,
      notes: stockFormData.notes
    }
    
    setProducts(updatedProducts)
    setTransactionHistory([...transactionHistory, newTransaction])
    
    // Reset form and close modal
    setStockFormData({
      quantity: '',
      reason: '',
      notes: ''
    })
    setStockFormErrors({})
    setIsStockModalOpen(false)
  }

  // Handle sale form submit
  const handleSaleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateSaleForm()) return
    
    const quantitySold = parseInt(saleFormData.quantity)
    const discountPercent = saleFormData.discount.trim() ? parseFloat(saleFormData.discount) : 0
    
    // Calculate sale amount
    const unitPrice = selectedProduct.price
    const discountAmount = unitPrice * (discountPercent / 100)
    const finalUnitPrice = unitPrice - discountAmount
    const totalAmount = finalUnitPrice * quantitySold
    
    // Update product quantity
    const updatedProducts = products.map(product => {
      if (product.id === selectedProduct.id) {
        return { ...product, quantity: product.quantity - quantitySold }
      }
      return product
    })
    
    // Add to transaction history
    const newTransaction = {
      id: transactionHistory.length + 1,
      productId: selectedProduct.id,
      type: 'sale',
      quantity: quantitySold,
      date: new Date().toISOString().split('T')[0],
      amount: totalAmount,
      discount: discountPercent > 0 ? `${discountPercent}%` : null,
      notes: saleFormData.notes
    }
    
    setProducts(updatedProducts)
    setTransactionHistory([...transactionHistory, newTransaction])
    
    // Reset form and close modal
    setSaleFormData({
      quantity: '',
      discount: '',
      notes: ''
    })
    setSaleFormErrors({})
    setIsSaleModalOpen(false)
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

  // Open detail modal
  const openDetailModal = (product) => {
    setSelectedProduct(product)
    setIsDetailModalOpen(true)
  }

  // Open stock adjustment modal
  const openStockModal = (product) => {
    setSelectedProduct(product)
    setStockFormData({
      quantity: '',
      reason: '',
      notes: ''
    })
    setIsStockModalOpen(true)
  }

  // Open sale modal
  const openSaleModal = (product) => {
    setSelectedProduct(product)
    setSaleFormData({
      quantity: '1',
      discount: '',
      notes: ''
    })
    setIsSaleModalOpen(true)
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

  // Get product transaction history
  const getProductHistory = (productId) => {
    return transactionHistory.filter(transaction => transaction.productId === productId)
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
                        <div className="relative group">
                          <button className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300">
                            <MoreVertical size={16} />
                          </button>
                          <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-surface-800 rounded-lg shadow-lg py-1 z-10 hidden group-hover:block border border-surface-200 dark:border-surface-700">
                            <button 
                              onClick={() => openDetailModal(product)}
                              className="w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 flex items-center gap-2"
                            >
                              <Eye size={14} />
                              <span>View Details</span>
                            </button>
                            <button 
                              onClick={() => openModal(product)}
                              className="w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 flex items-center gap-2"
                            >
                              <Edit size={14} />
                              <span>Edit Product</span>
                            </button>
                            <button 
                              onClick={() => openStockModal(product)}
                              className="w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 flex items-center gap-2"
                            >
                              <PlusCircle size={14} />
                              <span>Adjust Stock</span>
                            </button>
                            <button 
                              onClick={() => openSaleModal(product)}
                              className="w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 flex items-center gap-2"
                            >
                              <DollarSign size={14} />
                              <span>Record Sale</span>
                            </button>
                            <button 
                              onClick={() => deleteProduct(product.id)}
                              className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 flex items-center gap-2"
                            >
                              <Trash2 size={14} />
                              <span>Delete Product</span>
                            </button>
                          </div>
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

          {/* Product Detail Modal */}
          <AnimatePresence>
            {isDetailModalOpen && selectedProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={() => setIsDetailModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Product Details</h2>
                      <button 
                        onClick={() => setIsDetailModalOpen(false)}
                        className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="bg-surface-100 dark:bg-surface-700 rounded-lg h-64 flex items-center justify-center overflow-hidden">
                          {selectedProduct.images && selectedProduct.images.length > 0 ? (
                            <img 
                              src={selectedProduct.images[0]} 
                              alt={selectedProduct.name} 
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <Package size={64} className="text-surface-400" />
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                          <p className="text-surface-500 dark:text-surface-400">{selectedProduct.sku}</p>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <span className="badge badge-primary">{selectedProduct.category}</span>
                            {selectedProduct.tags && selectedProduct.tags.map((tag, index) => (
                              <span key={index} className="badge badge-outline">{tag}</span>
                            ))}
                          </div>
                          
                          <p className="mt-4 text-surface-600 dark:text-surface-300">
                            {selectedProduct.description || "No description available."}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="card p-4">
                            <p className="text-sm text-surface-500 dark:text-surface-400">Price</p>
                            <p className="text-xl font-semibold">${selectedProduct.price.toFixed(2)}</p>
                          </div>
                          <div className="card p-4">
                            <p className="text-sm text-surface-500 dark:text-surface-400">Cost</p>
                            <p className="text-xl font-semibold">${selectedProduct.cost.toFixed(2)}</p>
                          </div>
                          <div className="card p-4">
                            <p className="text-sm text-surface-500 dark:text-surface-400">In Stock</p>
                            <p className="text-xl font-semibold">{selectedProduct.quantity}</p>
                          </div>
                          <div className="card p-4">
                            <p className="text-sm text-surface-500 dark:text-surface-400">Reorder Point</p>
                            <p className="text-xl font-semibold">{selectedProduct.reorderPoint}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Details</h4>
                          <table className="w-full text-sm">
                            <tbody>
                              <tr>
                                <td className="py-2 text-surface-500 dark:text-surface-400">Supplier</td>
                                <td className="py-2 text-right">{selectedProduct.supplier}</td>
                              </tr>
                              <tr>
                                <td className="py-2 text-surface-500 dark:text-surface-400">Last Restocked</td>
                                <td className="py-2 text-right">{selectedProduct.lastRestocked}</td>
                              </tr>
                              <tr>
                                <td className="py-2 text-surface-500 dark:text-surface-400">Location</td>
                                <td className="py-2 text-right">{selectedProduct.location}</td>
                              </tr>
                              <tr>
                                <td className="py-2 text-surface-500 dark:text-surface-400">Profit Margin</td>
                                <td className="py-2 text-right">
                                  {((selectedProduct.price - selectedProduct.cost) / selectedProduct.price * 100).toFixed(2)}%
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <History size={16} />
                            <span>Transaction History</span>
                          </h4>
                          <div className="bg-surface-50 dark:bg-surface-900 rounded-lg p-3 max-h-40 overflow-y-auto">
                            {getProductHistory(selectedProduct.id).length === 0 ? (
                              <p className="text-sm text-surface-500 dark:text-surface-400 text-center py-2">
                                No transaction history available
                              </p>
                            ) : (
                              <div className="space-y-2">
                                {getProductHistory(selectedProduct.id).map((transaction) => (
                                  <div 
                                    key={transaction.id} 
                                    className="text-sm p-2 rounded bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700"
                                  >
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        {transaction.type === 'sale' ? 'Sale' : 
                                         transaction.type === 'restock' ? 'Restock' : 'Adjustment'}
                                      </span>
                                      <span className="text-surface-500 dark:text-surface-400">
                                        {transaction.date}
                                      </span>
                                    </div>
                                    <div className="mt-1">
                                      {transaction.type === 'sale' ? (
                                        <span>
                                          Sold {transaction.quantity} units for ${transaction.amount.toFixed(2)}
                                        </span>
                                      ) : (
                                        <span>
                                          {transaction.quantity > 0 ? 'Added' : 'Removed'} {Math.abs(transaction.quantity)} units
                                          {transaction.reason && ` - ${transaction.reason}`}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() => setIsDetailModalOpen(false)}
                        className="btn btn-outline"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          setIsDetailModalOpen(false)
                          openModal(selectedProduct)
                        }}
                        className="btn btn-primary"
                      >
                        Edit Product
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stock Adjustment Modal */}
          <AnimatePresence>
            {isStockModalOpen && selectedProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={() => setIsStockModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Adjust Stock</h2>
                      <button 
                        onClick={() => setIsStockModalOpen(false)}
                        className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{selectedProduct.name}</span>
                        <span className="badge badge-primary">{selectedProduct.category}</span>
                      </div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">
                        Current stock: {selectedProduct.quantity} units
                      </p>
                    </div>
                    
                    <form onSubmit={handleStockSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="stock-quantity" className="block text-sm font-medium mb-1">
                            Quantity Change
                          </label>
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => {
                                const currentValue = parseInt(stockFormData.quantity) || 0
                                setStockFormData({...stockFormData, quantity: (currentValue - 1).toString()})
                              }}
                              className="py-2 px-3 bg-surface-100 dark:bg-surface-700 rounded-l-lg border border-surface-200 dark:border-surface-700"
                            >
                              <MinusCircle size={16} />
                            </button>
                            <input
                              type="text"
                              id="stock-quantity"
                              name="quantity"
                              value={stockFormData.quantity}
                              onChange={handleStockChange}
                              className={`input rounded-none border-l-0 border-r-0 text-center ${stockFormErrors.quantity ? 'border-red-500 dark:border-red-500' : ''}`}
                              placeholder="Enter amount"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const currentValue = parseInt(stockFormData.quantity) || 0
                                setStockFormData({...stockFormData, quantity: (currentValue + 1).toString()})
                              }}
                              className="py-2 px-3 bg-surface-100 dark:bg-surface-700 rounded-r-lg border border-surface-200 dark:border-surface-700"
                            >
                              <PlusCircle size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                            Use positive values to add stock, negative to remove
                          </p>
                          {stockFormErrors.quantity && (
                            <p className="mt-1 text-sm text-red-500">{stockFormErrors.quantity}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="stock-reason" className="block text-sm font-medium mb-1">
                            Reason
                          </label>
                          <select
                            id="stock-reason"
                            name="reason"
                            value={stockFormData.reason}
                            onChange={handleStockChange}
                            className={`input ${stockFormErrors.reason ? 'border-red-500 dark:border-red-500' : ''}`}
                          >
                            <option value="">Select a reason</option>
                            <option value="New Shipment">New Shipment</option>
                            <option value="Inventory Correction">Inventory Correction</option>
                            <option value="Damaged Goods">Damaged Goods</option>
                            <option value="Returns">Returns</option>
                            <option value="Internal Use">Internal Use</option>
                            <option value="Theft or Loss">Theft or Loss</option>
                          </select>
                          {stockFormErrors.reason && (
                            <p className="mt-1 text-sm text-red-500">{stockFormErrors.reason}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="stock-notes" className="block text-sm font-medium mb-1">
                            Notes (Optional)
                          </label>
                          <textarea
                            id="stock-notes"
                            name="notes"
                            value={stockFormData.notes}
                            onChange={handleStockChange}
                            className="input min-h-20"
                            placeholder="Additional details about this adjustment"
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsStockModalOpen(false)}
                          className="btn btn-outline"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Update Stock
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sales Modal */}
          <AnimatePresence>
            {isSaleModalOpen && selectedProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={() => setIsSaleModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Record Sale</h2>
                      <button 
                        onClick={() => setIsSaleModalOpen(false)}
                        className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{selectedProduct.name}</span>
                        <span className="badge badge-primary">{selectedProduct.category}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-surface-500 dark:text-surface-400">
                          Available: {selectedProduct.quantity} units
                        </span>
                        <span className="font-medium">
                          ${selectedProduct.price.toFixed(2)} per unit
                        </span>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSaleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="sale-quantity" className="block text-sm font-medium mb-1">
                            Quantity Sold
                          </label>
                          <input
                            type="number"
                            id="sale-quantity"
                            name="quantity"
                            value={saleFormData.quantity}
                            onChange={handleSaleChange}
                            min="1"
                            max={selectedProduct.quantity}
                            className={`input ${saleFormErrors.quantity ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                          {saleFormErrors.quantity && (
                            <p className="mt-1 text-sm text-red-500">{saleFormErrors.quantity}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="sale-discount" className="block text-sm font-medium mb-1">
                            Discount % (Optional)
                          </label>
                          <input
                            type="number"
                            id="sale-discount"
                            name="discount"
                            value={saleFormData.discount}
                            onChange={handleSaleChange}
                            min="0"
                            max="100"
                            step="0.1"
                            placeholder="0"
                            className={`input ${saleFormErrors.discount ? 'border-red-500 dark:border-red-500' : ''}`}
                          />
                          {saleFormErrors.discount && (
                            <p className="mt-1 text-sm text-red-500">{saleFormErrors.discount}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="sale-notes" className="block text-sm font-medium mb-1">
                            Notes (Optional)
                          </label>
                          <textarea
                            id="sale-notes"
                            name="notes"
                            value={saleFormData.notes}
                            onChange={handleSaleChange}
                            className="input min-h-20"
                            placeholder="Customer details or other notes"
                          ></textarea>
                        </div>
                        
                        <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-surface-600 dark:text-surface-300">Unit Price:</span>
                            <span>${selectedProduct.price.toFixed(2)}</span>
                          </div>
                          {saleFormData.discount && (
                            <div className="flex justify-between mb-1">
                              <span className="text-surface-600 dark:text-surface-300">Discount:</span>
                              <span>-${(selectedProduct.price * (parseFloat(saleFormData.discount) / 100) * parseInt(saleFormData.quantity || 1)).toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-medium pt-2 border-t border-surface-200 dark:border-surface-600">
                            <span>Total:</span>
                            <span>
                              ${((saleFormData.discount 
                                ? selectedProduct.price * (1 - parseFloat(saleFormData.discount) / 100) 
                                : selectedProduct.price) * parseInt(saleFormData.quantity || 1)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsSaleModalOpen(false)}
                          className="btn btn-outline"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={selectedProduct.quantity < 1}
                        >
                          Complete Sale
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