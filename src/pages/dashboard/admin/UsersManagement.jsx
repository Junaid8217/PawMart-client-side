import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // In a real app, you'd have a users endpoint
            // For demo, we'll create mock users based on service providers
            const servicesResponse = await axios.get('http://localhost:3000/services');
            const ordersResponse = await axios.get('http://localhost:3000/orders');
            
            // Extract unique emails from services and orders
            const serviceEmails = [...new Set(servicesResponse.data.map(service => service.email))];
            const orderEmails = [...new Set(ordersResponse.data.map(order => order.buyerEmail))];
            const allEmails = [...new Set([...serviceEmails, ...orderEmails])];
            
            // Create mock user data
            const mockUsers = allEmails.map((email, index) => ({
                id: index + 1,
                email: email,
                name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                role: email === 'admin@petcare.com' ? 'admin' : 'user',
                status: 'active',
                joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
                lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                servicesCount: servicesResponse.data.filter(service => service.email === email).length,
                ordersCount: ordersResponse.data.filter(order => order.buyerEmail === email).length,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
            }));
            
            setUsers(mockUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const updateUserRole = (userId, newRole) => {
        setUsers(users.map(user => 
            user.id === userId ? { ...user, role: newRole } : user
        ));
        alert(`User role updated to: ${newRole}`);
    };

    const updateUserStatus = (userId, newStatus) => {
        setUsers(users.map(user => 
            user.id === userId ? { ...user, status: newStatus } : user
        ));
        alert(`User status updated to: ${newStatus}`);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === '' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const userStats = {
        total: users.length,
        active: users.filter(user => user.status === 'active').length,
        admins: users.filter(user => user.role === 'admin').length,
        users: users.filter(user => user.role === 'user').length
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
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                    <p className="text-gray-600 mt-1">Manage platform users and their permissions</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-primary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-primary">{userStats.total}</div>
                    <div className="stat-desc">Registered users</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-success">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="stat-title">Active Users</div>
                    <div className="stat-value text-success">{userStats.active}</div>
                    <div className="stat-desc">Currently active</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-error">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="stat-title">Administrators</div>
                    <div className="stat-value text-error">{userStats.admins}</div>
                    <div className="stat-desc">Admin users</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-info">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                    </div>
                    <div className="stat-title">Regular Users</div>
                    <div className="stat-value text-info">{userStats.users}</div>
                    <div className="stat-desc">Standard users</div>
                </div>
            </div>

            {/* User Activity Chart */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">User Activity Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            {users.filter(user => {
                                const lastLogin = new Date(user.lastLogin);
                                const daysDiff = Math.floor((new Date() - lastLogin) / (1000 * 60 * 60 * 24));
                                return daysDiff <= 7;
                            }).length}
                        </div>
                        <div className="text-sm text-blue-700">Active This Week</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                            {users.filter(user => {
                                const joinDate = new Date(user.joinDate);
                                const daysDiff = Math.floor((new Date() - joinDate) / (1000 * 60 * 60 * 24));
                                return daysDiff <= 30;
                            }).length}
                        </div>
                        <div className="text-sm text-green-700">New This Month</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                            {users.filter(user => user.servicesCount > 0).length}
                        </div>
                        <div className="text-sm text-purple-700">Service Providers</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="form-control flex-1">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="input input-bordered"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <select
                            className="select select-bordered"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            <option value="admin">Administrators</option>
                            <option value="user">Users</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add User
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Activity</th>
                                <th>Join Date</th>
                                <th>Last Login</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => (
                                    <tr key={user.id} className="hover">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={user.avatar}
                                                            alt={user.name}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.name}</div>
                                                    <div className="text-sm opacity-50">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className={`badge ${user.role === 'admin' ? 'badge-error' : 'badge-primary'} badge-sm cursor-pointer`}>
                                                    {user.role}
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                                                    <li><a onClick={() => updateUserRole(user.id, 'user')}>User</a></li>
                                                    <li><a onClick={() => updateUserRole(user.id, 'admin')}>Admin</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'} badge-sm cursor-pointer`}>
                                                    {user.status}
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                                                    <li><a onClick={() => updateUserStatus(user.id, 'active')}>Active</a></li>
                                                    <li><a onClick={() => updateUserStatus(user.id, 'suspended')}>Suspended</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                <div>{user.servicesCount} services</div>
                                                <div className="text-gray-500">{user.ordersCount} orders</div>
                                            </div>
                                        </td>
                                        <td>
                                            {new Date(user.joinDate).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                {new Date(user.lastLogin).toLocaleDateString()}
                                                <div className="text-xs text-gray-500">
                                                    {Math.floor((new Date() - new Date(user.lastLogin)) / (1000 * 60 * 60 * 24))} days ago
                                                </div>
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
                                                <button className="btn btn-error btn-xs">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-8">
                                        <div className="flex flex-col items-center">
                                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                            <p className="text-gray-500 text-lg">No users found</p>
                                            <p className="text-gray-400 text-sm">
                                                {searchTerm || roleFilter ? 'Try adjusting your filters' : 'No users available'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="btn btn-outline btn-primary">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Bulk Email
                    </button>
                    <button className="btn btn-outline btn-warning">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Export Users
                    </button>
                    <button className="btn btn-outline btn-info">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsersManagement;