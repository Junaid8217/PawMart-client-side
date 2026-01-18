import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';

const DashboardOverview = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalServices: 0,
        totalOrders: 0,
        recentOrders: [],
        recentServices: []
    });
    const [loading, setLoading] = useState(true);

    // Mock role - in real app, this would come from user data/JWT
    const userRole = user?.email === 'admin@petcare.com' ? 'admin' : 'user';

    useEffect(() => {
        fetchDashboardData();
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            if (userRole === 'admin') {
                // Admin sees all data
                const [servicesRes, ordersRes] = await Promise.all([
                    axios.get('http://localhost:3000/services'),
                    axios.get('http://localhost:3000/orders')
                ]);
                
                setStats({
                    totalServices: servicesRes.data.length,
                    totalOrders: ordersRes.data.length,
                    recentOrders: ordersRes.data.slice(-5).reverse(),
                    recentServices: servicesRes.data.slice(-5).reverse()
                });
            } else {
                // User sees only their data
                const [servicesRes, ordersRes] = await Promise.all([
                    axios.get(`http://localhost:3000/my-services?email=${user.email}`),
                    axios.get(`http://localhost:3000/orders?email=${user.email}`)
                ]);
                
                setStats({
                    totalServices: servicesRes.data.length,
                    totalOrders: ordersRes.data.length,
                    recentOrders: ordersRes.data.slice(-5).reverse(),
                    recentServices: servicesRes.data.slice(-5).reverse()
                });
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user?.displayName || user?.email}!
                </h1>
                <p className="text-blue-100">
                    {userRole === 'admin' ? 'Manage your pet care platform' : 'Manage your pet services and orders'}
                </p>
                <div className="mt-4 flex items-center">
                    <span className="badge badge-lg bg-white text-blue-600 font-semibold">
                        {userRole.toUpperCase()} DASHBOARD
                    </span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-primary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Services</div>
                    <div className="stat-value text-primary">{stats.totalServices}</div>
                    <div className="stat-desc">
                        {userRole === 'admin' ? 'All platform services' : 'Your services'}
                    </div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-secondary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Orders</div>
                    <div className="stat-value text-secondary">{stats.totalOrders}</div>
                    <div className="stat-desc">
                        {userRole === 'admin' ? 'All platform orders' : 'Your orders'}
                    </div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-accent">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                    <div className="stat-title">Growth</div>
                    <div className="stat-value text-accent">+12%</div>
                    <div className="stat-desc">This month</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-success">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value text-success">$2,400</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
                    <div className="h-64 flex items-end justify-around space-x-2">
                        {[65, 45, 78, 52, 89, 67].map((height, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div 
                                    className="bg-blue-500 w-8 rounded-t transition-all duration-500 hover:bg-blue-600"
                                    style={{ height: `${height}%` }}
                                ></div>
                                <span className="text-xs mt-2 text-gray-600">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">Service Categories</h3>
                    <div className="flex items-center justify-center h-64">
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="8"/>
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="8"
                                    strokeDasharray="75 25" strokeDashoffset="0"/>
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="8"
                                    strokeDasharray="15 85" strokeDashoffset="-75"/>
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="8"
                                    strokeDasharray="10 90" strokeDashoffset="-90"/>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{stats.totalServices}</div>
                                    <div className="text-sm text-gray-600">Services</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm">Veterinary (75%)</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm">Grooming (15%)</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-sm">Training (10%)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold">Recent Orders</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentOrders.length > 0 ? (
                                    stats.recentOrders.map((order, index) => (
                                        <tr key={index}>
                                            <td className="font-medium">{order.serviceName || 'Service'}</td>
                                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td>
                                                <span className="badge badge-success badge-sm">Completed</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center text-gray-500">No recent orders</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Services */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold">Recent Services</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentServices.length > 0 ? (
                                    stats.recentServices.map((service, index) => (
                                        <tr key={index}>
                                            <td className="font-medium">{service.serviceName}</td>
                                            <td>
                                                <span className="badge badge-outline badge-sm">
                                                    {service.category}
                                                </span>
                                            </td>
                                            <td className="font-semibold">${service.price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center text-gray-500">No recent services</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;