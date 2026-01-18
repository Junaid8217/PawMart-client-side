import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            // In a real app, you'd have an admin endpoint to get all orders
            // For now, we'll simulate this by getting orders without email filter
            const response = await axios.get('http://localhost:3000/orders');
            setAllOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            // If the endpoint doesn't exist, we'll show mock data
            setAllOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const getOrderStatus = (order) => {
        const orderDate = new Date(order.date);
        const now = new Date();
        const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) return { status: 'pending', color: 'badge-warning' };
        if (daysDiff < 3) return { status: 'processing', color: 'badge-info' };
        if (daysDiff < 7) return { status: 'shipped', color: 'badge-primary' };
        return { status: 'delivered', color: 'badge-success' };
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        // In a real app, you'd have an API endpoint to update order status
        console.log(`Updating order ${orderId} to status: ${newStatus}`);
        // For demo purposes, we'll just show a success message
        alert(`Order status updated to: ${newStatus}`);
    };

    const filteredAndSortedOrders = allOrders
        .filter(order => {
            const matchesSearch = order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                order.buyerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                order.phone?.toLowerCase().includes(searchTerm.toLowerCase());
            const orderStatus = getOrderStatus(order);
            const matchesStatus = statusFilter === '' || orderStatus.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.date) - new Date(a.date);
                case 'oldest':
                    return new Date(a.date) - new Date(b.date);
                case 'amount-high':
                    return (b.price * b.quantity) - (a.price * a.quantity);
                case 'amount-low':
                    return (a.price * a.quantity) - (b.price * b.quantity);
                default:
                    return 0;
            }
        });

    const totalRevenue = allOrders.reduce((sum, order) => sum + (order.price * order.quantity || 0), 0);
    const totalItems = allOrders.reduce((sum, order) => sum + (order.quantity || 0), 0);
    const statusCounts = allOrders.reduce((acc, order) => {
        const status = getOrderStatus(order).status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Orders Management</h1>
                    <p className="text-gray-600 mt-1">Monitor and manage all platform orders</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-primary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Orders</div>
                    <div className="stat-value text-primary">{allOrders.length}</div>
                    <div className="stat-desc">Platform wide</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-secondary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value text-secondary">${totalRevenue.toFixed(2)}</div>
                    <div className="stat-desc">All time revenue</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-accent">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="stat-title">Items Sold</div>
                    <div className="stat-value text-accent">{totalItems}</div>
                    <div className="stat-desc">Total quantity</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-success">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="stat-title">Avg Order</div>
                    <div className="stat-value text-success">
                        ${allOrders.length > 0 ? (totalRevenue / allOrders.length).toFixed(2) : '0.00'}
                    </div>
                    <div className="stat-desc">Per order value</div>
                </div>
            </div>

            {/* Status Distribution */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending || 0}</div>
                        <div className="text-sm text-yellow-700">Pending</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{statusCounts.processing || 0}</div>
                        <div className="text-sm text-blue-700">Processing</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-2xl font-bold text-purple-600">{statusCounts.shipped || 0}</div>
                        <div className="text-sm text-purple-700">Shipped</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{statusCounts.delivered || 0}</div>
                        <div className="text-sm text-green-700">Delivered</div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Search orders, customers..."
                            className="input input-bordered"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <select
                            className="select select-bordered"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <select
                            className="select select-bordered"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="amount-high">Amount: High to Low</option>
                            <option value="amount-low">Amount: Low to High</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Order #</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedOrders.length > 0 ? (
                                filteredAndSortedOrders.map((order, index) => {
                                    const orderStatus = getOrderStatus(order);
                                    return (
                                        <tr key={index} className="hover">
                                            <td className="font-mono text-sm">
                                                #{String(index + 1).padStart(4, '0')}
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="font-medium">{order?.buyerEmail}</div>
                                                    <div className="text-sm text-gray-500">{order?.phone}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-medium">{order?.productName}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {order?.address}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge badge-outline">
                                                    {order?.quantity}
                                                </span>
                                            </td>
                                            <td className="font-bold">
                                                ${(order?.price * order?.quantity).toFixed(2)}
                                            </td>
                                            <td>
                                                <div className="dropdown dropdown-end">
                                                    <div tabIndex={0} role="button" className={`badge ${orderStatus.color} badge-sm cursor-pointer`}>
                                                        {orderStatus.status}
                                                    </div>
                                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                        <li><a onClick={() => updateOrderStatus(order._id, 'pending')}>Pending</a></li>
                                                        <li><a onClick={() => updateOrderStatus(order._id, 'processing')}>Processing</a></li>
                                                        <li><a onClick={() => updateOrderStatus(order._id, 'shipped')}>Shipped</a></li>
                                                        <li><a onClick={() => updateOrderStatus(order._id, 'delivered')}>Delivered</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-sm">
                                                    {order?.date &&
                                                        new Date(order.date).toLocaleDateString("en-US", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {order?.date &&
                                                        new Date(order.date).toLocaleTimeString("en-US", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        })}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button className="btn btn-info btn-xs">
                                                        View
                                                    </button>
                                                    <button className="btn btn-warning btn-xs">
                                                        Edit
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-8">
                                        <div className="flex flex-col items-center">
                                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            <p className="text-gray-500 text-lg">No orders found</p>
                                            <p className="text-gray-400 text-sm">
                                                {searchTerm || statusFilter ? 'Try adjusting your filters' : 'No orders available'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Activity */}
            {allOrders.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Order Activity</h3>
                    <div className="space-y-4">
                        {allOrders.slice(0, 5).map((order, index) => {
                            const orderStatus = getOrderStatus(order);
                            return (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-3 h-3 rounded-full ${orderStatus.status === 'delivered' ? 'bg-green-500' : orderStatus.status === 'shipped' ? 'bg-blue-500' : orderStatus.status === 'processing' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                                        <div>
                                            <p className="font-medium">{order.productName}</p>
                                            <p className="text-sm text-gray-600">
                                                Order by {order.buyerEmail} • ${(order.price * order.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`badge ${orderStatus.color} badge-sm`}>
                                            {orderStatus.status}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(order.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllOrders;