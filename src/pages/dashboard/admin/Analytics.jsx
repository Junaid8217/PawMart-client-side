import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState({
        services: [],
        orders: [],
        loading: true
    });

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            const [servicesRes, ordersRes] = await Promise.all([
                axios.get('http://localhost:3000/services'),
                axios.get('http://localhost:3000/orders')
            ]);
            
            setAnalyticsData({
                services: servicesRes.data,
                orders: ordersRes.data,
                loading: false
            });
        } catch (error) {
            console.error('Error fetching analytics data:', error);
            setAnalyticsData({
                services: [],
                orders: [],
                loading: false
            });
        }
    };

    const { services, orders, loading } = analyticsData;

    // Calculate metrics
    const totalRevenue = orders.reduce((sum, order) => sum + (order.price * order.quantity || 0), 0);
    const totalOrders = orders.length;
    const totalServices = services.length;
    const totalProviders = new Set(services.map(service => service.email)).size;

    // Monthly data for charts
    const getMonthlyData = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        return months.map((month, index) => {
            const monthOrders = orders.filter(order => {
                const orderMonth = new Date(order.date).getMonth();
                return orderMonth === index;
            });
            const monthRevenue = monthOrders.reduce((sum, order) => sum + (order.price * order.quantity || 0), 0);
            return {
                month,
                orders: monthOrders.length,
                revenue: monthRevenue,
                services: Math.floor(Math.random() * 20) + 10 // Mock data for services
            };
        });
    };

    const monthlyData = getMonthlyData();

    // Category distribution
    const categoryData = services.reduce((acc, service) => {
        acc[service.category] = (acc[service.category] || 0) + 1;
        return acc;
    }, {});

    // Top performing services
    const servicePerformance = services.map(service => {
        const serviceOrders = orders.filter(order => order.productName === service.productName);
        const revenue = serviceOrders.reduce((sum, order) => sum + (order.price * order.quantity || 0), 0);
        return {
            ...service,
            orderCount: serviceOrders.length,
            revenue: revenue
        };
    }).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

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
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                        <p className="text-gray-600 mt-1">Comprehensive platform insights and metrics</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="btn btn-outline btn-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-primary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value text-primary">${totalRevenue.toFixed(2)}</div>
                    <div className="stat-desc">↗︎ 400 (22%) this month</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-secondary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Orders</div>
                    <div className="stat-value text-secondary">{totalOrders}</div>
                    <div className="stat-desc">↗︎ 90 (14%) this month</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-accent">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-title">Active Services</div>
                    <div className="stat-value text-accent">{totalServices}</div>
                    <div className="stat-desc">↗︎ 12 (8%) this month</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-success">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                    </div>
                    <div className="stat-title">Service Providers</div>
                    <div className="stat-value text-success">{totalProviders}</div>
                    <div className="stat-desc">↗︎ 3 (5%) this month</div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">Monthly Revenue Trend</h3>
                    <div className="h-64 flex items-end justify-around space-x-2">
                        {monthlyData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="relative group">
                                    <div 
                                        className="bg-blue-500 w-8 rounded-t transition-all duration-500 hover:bg-blue-600 cursor-pointer"
                                        style={{ height: `${Math.max((data.revenue / Math.max(...monthlyData.map(d => d.revenue))) * 200, 10)}px` }}
                                    ></div>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${data.revenue.toFixed(0)}
                                    </div>
                                </div>
                                <span className="text-xs mt-2 text-gray-600">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Orders Chart */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">Monthly Orders</h3>
                    <div className="h-64 flex items-end justify-around space-x-2">
                        {monthlyData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="relative group">
                                    <div 
                                        className="bg-green-500 w-8 rounded-t transition-all duration-500 hover:bg-green-600 cursor-pointer"
                                        style={{ height: `${Math.max((data.orders / Math.max(...monthlyData.map(d => d.orders))) * 200, 10)}px` }}
                                    ></div>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {data.orders} orders
                                    </div>
                                </div>
                                <span className="text-xs mt-2 text-gray-600">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Distribution & Top Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Distribution */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">Service Categories</h3>
                    <div className="space-y-4">
                        {Object.entries(categoryData).map(([category, count]) => {
                            const percentage = (count / totalServices) * 100;
                            return (
                                <div key={category} className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium capitalize">{category}</span>
                                        <span className="text-sm text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Top Performing Services */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Performing Services</h3>
                    <div className="space-y-4">
                        {servicePerformance.map((service, index) => (
                            <div key={service._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold text-sm">#{index + 1}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{service.productName}</p>
                                        <p className="text-xs text-gray-600">{service.orderCount} orders</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-green-600">${service.revenue.toFixed(2)}</p>
                                    <p className="text-xs text-gray-600">revenue</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
                        </div>
                        <div className="text-sm text-blue-700">Average Order Value</div>
                        <div className="text-xs text-gray-600 mt-1">
                            {totalOrders > 0 ? '+5.2% from last month' : 'No data available'}
                        </div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                            {totalProviders > 0 ? (totalServices / totalProviders).toFixed(1) : '0'}
                        </div>
                        <div className="text-sm text-green-700">Services per Provider</div>
                        <div className="text-xs text-gray-600 mt-1">
                            {totalProviders > 0 ? '+2.1% from last month' : 'No data available'}
                        </div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                            {totalServices > 0 ? ((totalOrders / totalServices) * 100).toFixed(1) : '0'}%
                        </div>
                        <div className="text-sm text-purple-700">Conversion Rate</div>
                        <div className="text-xs text-gray-600 mt-1">
                            {totalServices > 0 ? '+1.8% from last month' : 'No data available'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {orders.slice(0, 5).map((order, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div>
                                    <p className="font-medium">New order placed</p>
                                    <p className="text-sm text-gray-600">
                                        {order.productName} by {order.buyerEmail}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">${(order.price * order.quantity).toFixed(2)}</p>
                                <p className="text-xs text-gray-600">
                                    {new Date(order.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;