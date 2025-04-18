import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Edit, Trash2, XCircle, Eye, ArrowUpDown, MoreVertical, Users, Building, MapPin, Phone, Mail, Link, CheckCircle, Info, ExternalLink, Box, Calendar, FileText } from 'lucide-react'
import { format } from 'date-fns'

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    category: '',
    notes: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [supplierProducts, setSupplierProducts] = useState([])
  const [supplierOrders, setSupplierOrders] = useState([])

  // Mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockSuppliers = [
        {
          id: 1,
          name: "EcoTextiles Inc.",
          contactName: "Sarah Johnson",
          email: "sarah@ecotextiles.com",
          phone: "(555) 123-4567",
          address: "123 Green St, Portland, OR 97204",
          website: "www.ecotextiles.com",
          category: "Apparel",
          status: "active",
          notes: "Specializes in organic and sustainable fabrics.",
          lastOrderDate: "2023-10-15"
        },
        {
          id: 2,
          name: "TechGadgets Ltd.",
          contactName: "Michael Chen",
          email: "michael@techgadgets.com",
          phone: "(555) 987-6543",
          address: "456 Innovation Ave, San Jose, CA 95113",
          website: "www.techgadgets.com",
          category: "Electronics",
          status: "active",
          notes: "Our primary supplier for all electronic components.",
          lastOrderDate: "2023-11-02"
        },
        {
          id: 3,
          name: "EcoLiving Supplies",
          contactName: "Emma Wilson",
          email: "emma@ecolivingsupplies.com",
          phone: "(555) 456-7890",
          address: "789 Sustainable Blvd, Austin, TX 78701",
          website: "www.ecolivingsupplies.com",
          category: "Home Goods",
          status: "active",
          notes: "Eco-friendly home products supplier.",
          lastOrderDate: "2023-10-28"
        },
        {
          id: 4,
          name: "NaturalBeauty Co.",
          contactName: "James Rodriguez",
          email: "james@naturalbeauty.com",
          phone: "(555) 789-0123",
          address: "101 Organic Way, Miami, FL 33101",
          website: "www.naturalbeauty.com",
          category: "Beauty",
          status: "active",
          notes: "Organic beauty product supplier with vegan options.",
          lastOrderDate: "2023-11-05"
        },
        {
          id: 5,
          name: "OfficePro Supplies",
          contactName: "Linda Taylor",
          email: "linda@officepro.com",
          phone: "(555) 234-5678",
          address: "222 Corporate Dr, Chicago, IL 60601",
          website: "www.officeprosupplies.com",
          category: "Furniture",
          status: "inactive",
          notes: "Office furniture and supplies. Currently reviewing contract.",
          lastOrderDate: "2023-09-20"
        }
      ]
      
      const mockProducts = [
        {
          id: 1,
          name: "Organic Cotton T-Shirt",
          sku: "APP-TS-001",
          category: "Apparel",
          price: 24.99,
          cost: 12.50,
          quantity: 45,
          supplierId: 1
        },
        {
          id: 2,
          name: "Wireless Bluetooth Headphones",
          sku: "ELEC-HP-002",
          category: "Electronics",
          price: 79.99,
          cost: 42.00,
          quantity: 12,
          supplierId: 2
        },
        {
          id: 3,
          name: "Stainless Steel Water Bottle",
          sku: "HOME-WB-003",
          category: "Home Goods",
          price: 18.95,
          cost: 8.75,
          quantity: 78,
          supplierId: 3
        },
        {
          id: 4,
          name: "Organic Facial Cleanser",
          sku: "BEAUTY-FC-004",
          category: "Beauty",
          price: 22.50,
          cost: 11.25,
          quantity: 8,
          supplierId: 4
        },
        {
          id: 5,
          name: "Ergonomic Office Chair",
          sku: "FURN-CH-005",
          category: "Furniture",
          price: 189.99,
          cost: 95.00,
          quantity: 5,
          supplierId: 5
        },
        {
          id: 6,
          name: "Wireless Charging Pad",
          sku: "ELEC-CP-006",
          category: "Electronics",
          price: 29.99,
          cost: 14.50,
          quantity: 32,
          supplierId: 2
        },
        {
          id: 7,
          name: "Organic Bamboo Socks",
          sku: "APP-SK-007",
          category: "Apparel",
          price: 12.99,
          cost: 6.25,
          quantity: 120,
          supplierId: 1
        }
      ]
      
      const mockOrders = [
        {
          id: 1,
          supplierId: 1,
          orderNumber: "PO-2023-0001",
          date: "2023-10-15",
          total: 1250.00,
          status: "Delivered",
          items: [
            { productId: 1, name: "Organic Cotton T-Shirt", quantity: 100, price: 12.50 }
          ]
        },
        {
          id: 2,
          supplierId: 2,
          orderNumber: "PO-2023-0002",
          date: "2023-11-02",
          total: 2520.00,
          status: "Delivered",
          items: [
            { productId: 2, name: "Wireless Bluetooth Headphones", quantity: 60, price: 42.00 }
          ]
        },
        {
          id: 3,
          supplierId: 3,
          orderNumber: "PO-2023-0003",
          date: "2023-10-28",
          total: 875.00,
          status: "Delivered", 
          items: [
            { productId: 3, name: "Stainless Steel Water Bottle", quantity: 100, price: 8.75 }
          ]
        },
        {
          id: 4,
          supplierId: 4,
          orderNumber: "PO-2023-0004",
          date: "2023-11-05",
          total: 1125.00,
          status: "Delivered",
          items: [
            { productId: 4, name: "Organic Facial Cleanser", quantity: 100, price: 11.25 }
          ]
        },
        {
          id: 5,
          supplierId: 5,
          orderNumber: "PO-2023-0005",
          date: "2023-09-20",
          total: 950.00,
          status: "Delivered",
          items: [
            { productId: 5, name: "Ergonomic Office Chair", quantity: 10, price: 95.00 }
          ]
        },
        {
          id: 6,
          supplierId: 2,
          orderNumber: "PO-2023-0006",
          date: "2023-10-10",
          total: 1450.00,
          status: "Delivered",
          items: [
            { productId: 6, name: "Wireless Charging Pad", quantity: 100, price: 14.50 }
          ]
        },
        {
          id: 7,
          supplierId: 1,
          orderNumber: "PO-2023-0007",
          date: "2023-09-05",
          total: 625.00,
          status: "Delivered",
          items: [
            { productId: 7, name: "Organic Bamboo Socks", quantity: 100, price: 6.25 }
          ]
        }
      ]
      
      setSuppliers(mockSuppliers)
      setSupplierProducts(mockProducts)
      setSupplierOrders(mockOrders)
      setLoading(false)
    }, 800)
  }, [])

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter(supplier => {
    if (!searchQuery) return true
    
    const searchLower = searchQuery.toLowerCase()
    return (
      supplier.name.toLowerCase().includes(searchLower) ||
      supplier.contactName.toLowerCase().includes(searchLower) ||
      supplier.email.toLowerCase().includes(searchLower) ||
      supplier.category.toLowerCase().includes(searchLower)
    )
  })

  // Sort suppliers
  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
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
    
    if (!formData.name.trim()) errors.name = "Supplier name is required"
    if (!formData.contactName.trim()) errors.contactName = "Contact name is required"
    
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }
    
    if (!formData.phone.trim()) errors.phone = "Phone number is required"
    
    if (!formData.category.trim()) errors.category = "Category is required"
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    if (selectedSupplier) {
      // Update existing supplier
      const updatedSuppliers = suppliers.map(supplier => 
        supplier.id === selectedSupplier.id 
          ? { 
              ...supplier, 
              name: formData.name,
              contactName: formData.contactName,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              website: formData.website,
              category: formData.category,
              notes: formData.notes
            } 
          : supplier
      )
      setSuppliers(updatedSuppliers)
    } else {
      // Add new supplier
      const newSupplier = {
        id: suppliers.length + 1,
        name: formData.name,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        website: formData.website,
        category: formData.category,
        status: "active",
        notes: formData.notes,
        lastOrderDate: ""
      }
      setSuppliers([...suppliers, newSupplier])
    }
    
    // Reset form and close modal
    resetForm()
  }

  // Open modal for adding/editing supplier
  const openModal = (supplier = null) => {
    if (supplier) {
      setSelectedSupplier(supplier)
      setFormData({
        name: supplier.name,
        contactName: supplier.contactName,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        website: supplier.website,
        category: supplier.category,
        notes: supplier.notes
      })
    } else {
      setSelectedSupplier(null)
      resetForm()
    }
    setIsModalOpen(true)
  }

  // Open detail modal
  const openDetailModal = (supplier) => {
    setSelectedSupplier(supplier)
    setIsDetailModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (supplier) => {
    setSelectedSupplier(supplier)
    setIsDeleteModalOpen(true)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      category: '',
      notes: ''
    })
    setFormErrors({})
    setIsModalOpen(false)
    setSelectedSupplier(null)
  }

  // Delete supplier
  const deleteSupplier = () => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== selectedSupplier.id))
    setIsDeleteModalOpen(false)
  }

  // Get supplier products
  const getSupplierProducts = (supplierId) => {
    return supplierProducts.filter(product => product.supplierId === supplierId)
  }

  // Get supplier orders
  const getSupplierOrders = (supplierId) => {
    return supplierOrders.filter(order => order.supplierId === supplierId)
  }

  // Toggle supplier status
  const toggleSupplierStatus = (supplierId) => {
    setSuppliers(suppliers.map(supplier => {
      if (supplier.id === supplierId) {
        return { ...supplier, status: supplier.status === 'active' ? 'inactive' : 'active' }
      }
      return supplier
    }))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Suppliers</h1>
        <p className="text-surface-500 dark:text-surface-400">
          Manage your suppliers and their product information
        </p>
      </div>
      
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-surface-400" />
            </div>
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <button 
            onClick={() => openModal()} 
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span>Add Supplier</span>
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {sortedSuppliers.length === 0 ? (
              <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-12 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-600 flex items-center justify-center mb-4">
                  <Users size={24} className="text-surface-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No suppliers found</h3>
                <p className="text-surface-500 dark:text-surface-400 mb-6">
                  {searchQuery 
                    ? "Try adjusting your search criteria" 
                    : "Add your first supplier to get started"}
                </p>
                <button 
                  onClick={() => openModal()} 
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <Plus size={18} />
                  <span>Add Supplier</span>
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
                          Supplier
                          {sortField === 'name' && (
                            <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'} />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button 
                          onClick={() => handleSort('contactName')} 
                          className="flex items-center gap-1 font-semibold text-surface-700 dark:text-surface-300"
                        >
                          Contact
                          {sortField === 'contactName' && (
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
                      <th className="px-4 py-3 text-left">Phone</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedSuppliers.map((supplier) => (
                      <motion.tr 
                        key={supplier.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800/60"
                      >
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{supplier.name}</div>
                            <div className="text-sm text-surface-500 dark:text-surface-400">
                              {supplier.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{supplier.contactName}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="badge badge-primary">{supplier.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          {supplier.phone}
                        </td>
                        <td className="px-4 py-3">
                          <span 
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${
                              supplier.status === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                            }`}
                          >
                            {supplier.status === 'active' ? (
                              <>
                                <CheckCircle size={14} />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <Info size={14} />
                                <span>Inactive</span>
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="relative group">
                            <button className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300">
                              <MoreVertical size={16} />
                            </button>
                            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-surface-800 rounded-lg shadow-lg py-1 z-10 hidden group-hover:block border border-surface-200 dark:border-surface-700">
                              <button 
                                onClick={() => openDetailModal(supplier)}
                                className="w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 flex items-center gap-2"
                              >
                                <Eye size={14} />
                                <span>View Details</span>
                              </button>
                              <button 
                                onClick={() => openModal(supplier)}
                                className="w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 flex items-center gap-2"
                              >
                                <Edit size={14} />
                                <span>Edit Supplier</span>
                              </button>
                              <button 
                                onClick={() => toggleSupplierStatus(supplier.id)}
                                className="w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 flex items-center gap-2"
                              >
                                <Info size={14} />
                                <span>{supplier.status === 'active' ? 'Mark Inactive' : 'Mark Active'}</span>
                              </button>
                              <button 
                                onClick={() => openDeleteModal(supplier)}
                                className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 flex items-center gap-2"
                              >
                                <Trash2 size={14} />
                                <span>Delete Supplier</span>
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
          </>
        )}
      </div>
      
      {/* Add/Edit Supplier Modal */}
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
                    {selectedSupplier ? "Edit Supplier" : "Add New Supplier"}
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
                        Supplier Name*
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
                      <label htmlFor="contactName" className="block text-sm font-medium mb-1">
                        Contact Person*
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        className={`input ${formErrors.contactName ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {formErrors.contactName && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.contactName}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`input ${formErrors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone*
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`input ${formErrors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium mb-1">
                        Website
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="input"
                        placeholder="www.example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-1">
                        Category*
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
                        <option value="Food & Beverage">Food & Beverage</option>
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.category && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium mb-1">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="input min-h-20"
                        placeholder="Additional information about this supplier"
                      ></textarea>
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
                      {selectedSupplier ? "Update Supplier" : "Add Supplier"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Supplier Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && selectedSupplier && (
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
              className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Supplier Details</h2>
                  <button 
                    onClick={() => setIsDetailModalOpen(false)}
                    className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Supplier Information */}
                  <div className="md:col-span-1">
                    <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-surface-200 dark:bg-surface-600">
                        <Building size={32} className="text-primary" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-center mb-1">{selectedSupplier.name}</h3>
                      <p className="text-center text-surface-500 dark:text-surface-400 mb-4">
                        <span className="badge badge-primary">{selectedSupplier.category}</span>
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Users size={18} className="text-surface-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Contact Person</p>
                            <p>{selectedSupplier.contactName}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Mail size={18} className="text-surface-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p>{selectedSupplier.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Phone size={18} className="text-surface-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p>{selectedSupplier.phone}</p>
                          </div>
                        </div>
                        
                        {selectedSupplier.address && (
                          <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-surface-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Address</p>
                              <p>{selectedSupplier.address}</p>
                            </div>
                          </div>
                        )}
                        
                        {selectedSupplier.website && (
                          <div className="flex items-start gap-3">
                            <Link size={18} className="text-surface-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Website</p>
                              <a 
                                href={`https://${selectedSupplier.website}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-1"
                              >
                                {selectedSupplier.website}
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {selectedSupplier.notes && (
                        <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-600">
                          <p className="text-sm font-medium mb-1">Notes</p>
                          <p className="text-surface-600 dark:text-surface-300">
                            {selectedSupplier.notes}
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-6 flex gap-2">
                        <button
                          onClick={() => {
                            setIsDetailModalOpen(false)
                            openModal(selectedSupplier)
                          }}
                          className="btn btn-outline btn-sm flex-1"
                        >
                          Edit
                        </button>
                        
                        <button
                          onClick={() => toggleSupplierStatus(selectedSupplier.id)}
                          className={`btn btn-sm flex-1 ${
                            selectedSupplier.status === 'active'
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30'
                              : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30'
                          }`}
                        >
                          {selectedSupplier.status === 'active' ? 'Mark Inactive' : 'Mark Active'}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tabs for Products & Orders */}
                  <div className="md:col-span-2">
                    <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
                      <div className="border-b border-surface-200 dark:border-surface-700">
                        <div className="flex">
                          <button
                            className="px-4 py-3 font-medium border-b-2 border-primary text-primary"
                          >
                            Products ({getSupplierProducts(selectedSupplier.id).length})
                          </button>
                          <button
                            className="px-4 py-3 font-medium text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200"
                          >
                            Orders ({getSupplierOrders(selectedSupplier.id).length})
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        {/* Products Tab */}
                        <div>
                          {getSupplierProducts(selectedSupplier.id).length === 0 ? (
                            <div className="text-center py-8">
                              <Box size={32} className="mx-auto mb-2 text-surface-400" />
                              <p className="text-surface-500 dark:text-surface-400">
                                No products from this supplier
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {getSupplierProducts(selectedSupplier.id).map(product => (
                                <div 
                                  key={product.id} 
                                  className="bg-surface-50 dark:bg-surface-700 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                >
                                  <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-sm text-surface-500 dark:text-surface-400">
                                      SKU: {product.sku}
                                    </p>
                                  </div>
                                  <div className="flex flex-wrap gap-3 items-center">
                                    <span className="badge badge-outline">{product.category}</span>
                                    <div className="text-right">
                                      <p className="font-medium">${product.price.toFixed(2)}</p>
                                      <p className="text-sm text-surface-500 dark:text-surface-400">
                                        Cost: ${product.cost.toFixed(2)}
                                      </p>
                                    </div>
                                    <div className="bg-white dark:bg-surface-800 px-2 py-1 rounded border border-surface-200 dark:border-surface-600">
                                      <p className="text-sm font-medium">Stock: {product.quantity}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Orders Tab (Hidden by default) */}
                        <div className="hidden">
                          {getSupplierOrders(selectedSupplier.id).length === 0 ? (
                            <div className="text-center py-8">
                              <FileText size={32} className="mx-auto mb-2 text-surface-400" />
                              <p className="text-surface-500 dark:text-surface-400">
                                No orders with this supplier
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {getSupplierOrders(selectedSupplier.id).map(order => (
                                <div 
                                  key={order.id} 
                                  className="bg-surface-50 dark:bg-surface-700 rounded-lg p-3"
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <div>
                                      <p className="font-medium">{order.orderNumber}</p>
                                      <div className="flex items-center gap-1 text-sm text-surface-500 dark:text-surface-400">
                                        <Calendar size={14} />
                                        <span>{order.date}</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center">
                                      <span className="badge badge-success">{order.status}</span>
                                      <div className="font-medium">
                                        ${order.total.toFixed(2)}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-2 pt-2 border-t border-surface-200 dark:border-surface-600">
                                    <p className="text-sm font-medium mb-1">Order Items:</p>
                                    <ul className="text-sm space-y-1">
                                      {order.items.map((item, index) => (
                                        <li key={index} className="flex justify-between">
                                          <span>{item.name} (x{item.quantity})</span>
                                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedSupplier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsDeleteModalOpen(false)}
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
                  <h2 className="text-xl font-bold text-red-500">Delete Supplier</h2>
                  <button 
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="mb-4">
                    Are you sure you want to delete <strong>{selectedSupplier.name}</strong>? This action cannot be undone.
                  </p>
                  
                  {getSupplierProducts(selectedSupplier.id).length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info size={18} className="mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Warning</p>
                          <p className="text-sm">
                            This supplier has {getSupplierProducts(selectedSupplier.id).length} products associated with it. 
                            Deleting this supplier may affect product information.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteSupplier}
                    className="btn bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete Supplier
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}