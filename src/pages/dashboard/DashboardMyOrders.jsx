import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';

const DashboardMyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchMyOrders();
    }, [user?.email]);

    const fetchMyOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/orders?email=${user?.email}`);
            setMyOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getOrderStatus = (order) => {
        // Mock status logic - in real app, this would come from backend
        const orderDate = new Date(order.date);
        const now = new Date();
        const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) return { status: 'pending', color: 'badge-warning' };
        if (daysDiff < 3) return { status: 'processing', color: 'badge-info' };
        if (daysDiff < 7) return { status: 'shipped', color: 'badge-primary' };
        return { status: 'delivered', color: 'badge-success' };
    };

    const filteredOrders = myOrders.filter(order => {
        const matchesSearch = order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.address?.toLowerCase().includes(searchTerm.toLowerCase());
        const orderStatus = getOrderStatus(order);
        const matchesStatus = statusFilter === '' || orderStatus.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalSpent = myOrders.reduce((sum, order) => sum + (order.price * order.quantity || 0), 0);
    const totalItems = myOrders.reduce((sum, order) => sum + (order.quantity || 0), 0);

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
                    <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-600 mt-1">Track and manage your pet service orders</p>
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
                    <div className="stat-value text-primary">{myOrders.length}</div>
                    <div className="stat-desc">All time orders</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-secondary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Spent</div>
                    <div className="stat-value text-secondary">${totalSpent.toFixed(2)}</div>
                    <div className="stat-desc">Lifetime spending</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-accent">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="stat-title">Items Ordered</div>
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
                        ${myOrders.length > 0 ? (totalSpent / myOrders.length).toFixed(2) : '0.00'}
                    </div>
                    <div className="stat-desc">Per order value</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="form-control flex-1">
                        <input
                            type="text"
                            placeholder="Search orders..."
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
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Order #</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, index) => {
                                    const orderStatus = getOrderStatus(order);
                                    return (
                                        <tr key={index} className="hover">
                                            <td className="font-mono text-sm">
                                                #{String(index + 1).padStart(4, '0')}
                                            </td>
                                            <td>
                                                <div className="font-medium">{order?.productName}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {order?.address}
                                                </div>
                                            </td>
                                            <td className="font-semibold">${order?.price}</td>
                                            <td>
                                                <span className="badge badge-outline">
                                                    {order?.quantity}
                                                </span>
                                            </td>
                                            <td className="font-bold">
                                                ${(order?.price * order?.quantity).toFixed(2)}
                                            </td>
                                            <td>
                                                <span className={`badge ${orderStatus.color} badge-sm`}>
                                                    {orderStatus.status}
                                                </span>
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
                                                <div className="text-sm">{order?.phone}</div>
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
                                                {searchTerm || statusFilter ? 'Try adjusting your filters' : 'You haven\'t placed any orders yet'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Timeline (for recent orders) */}
            {myOrders.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Order Activity</h3>
                    <div className="space-y-4">
                        {myOrders.slice(0, 3).map((order, index) => {
                            const orderStatus = getOrderStatus(order);
                            return (
                                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className={`w-3 h-3 rounded-full ${orderStatus.status === 'delivered' ? 'bg-green-500' : orderStatus.status === 'shipped' ? 'bg-blue-500' : orderStatus.status === 'processing' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                                    <div className="flex-1">
                                        <p className="font-medium">{order.productName}</p>
                                        <p className="text-sm text-gray-600">
                                            Order placed on {new Date(order.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`badge ${orderStatus.color} badge-sm`}>
                                        {orderStatus.status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardMyOrders;