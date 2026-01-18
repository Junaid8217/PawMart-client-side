import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllServices = () => {
    const [allServices, setAllServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetchAllServices();
    }, []);

    const fetchAllServices = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/services');
            setAllServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the service!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/delete/${id}`)
                    .then(res => {
                        if (res.data.deletedCount === 1) {
                            const filteredData = allServices.filter(service => service._id !== id);
                            setAllServices(filteredData);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Service has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.error('Error deleting service:', err);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete service.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const filteredAndSortedServices = allServices
        .filter(service => {
            const matchesSearch = service.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                service.email?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === '' || service.category === filterCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'price-high':
                    return (b.price || 0) - (a.price || 0);
                case 'price-low':
                    return (a.price || 0) - (b.price || 0);
                case 'name':
                    return (a.productName || '').localeCompare(b.productName || '');
                default:
                    return 0;
            }
        });

    const categoryStats = allServices.reduce((acc, service) => {
        acc[service.category] = (acc[service.category] || 0) + 1;
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
                    <h1 className="text-2xl font-bold text-gray-900">All Services Management</h1>
                    <p className="text-gray-600 mt-1">Manage all platform services and providers</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-primary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Services</div>
                    <div className="stat-value text-primary">{allServices.length}</div>
                    <div className="stat-desc">Platform wide</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-secondary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                    </div>
                    <div className="stat-title">Active Providers</div>
                    <div className="stat-value text-secondary">
                        {new Set(allServices.map(service => service.email)).size}
                    </div>
                    <div className="stat-desc">Unique providers</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-accent">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                    <div className="stat-title">Categories</div>
                    <div className="stat-value text-accent">{Object.keys(categoryStats).length}</div>
                    <div className="stat-desc">Service types</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-success">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="stat-title">Avg Price</div>
                    <div className="stat-value text-success">
                        ${allServices.length > 0 ? Math.round(allServices.reduce((sum, service) => sum + (service.price || 0), 0) / allServices.length) : 0}
                    </div>
                    <div className="stat-desc">Per service</div>
                </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(categoryStats).map(([category, count]) => (
                        <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-primary">{count}</div>
                            <div className="text-sm text-gray-600 capitalize">{category}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Search services, providers..."
                            className="input input-bordered"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <select
                            className="select select-bordered"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="pets">Pets</option>
                            <option value="food">Food</option>
                            <option value="accessories">Accessories</option>
                            <option value="care-products">Care Products</option>
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
                            <option value="price-high">Price: High to Low</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="name">Name: A to Z</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Services Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Service</th>
                                <th>Provider</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Location</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedServices.length > 0 ? (
                                filteredAndSortedServices.map(service => (
                                    <tr key={service._id} className="hover">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={service?.image || "/api/placeholder/48/48"}
                                                            alt={service?.productName}
                                                            onError={(e) => {
                                                                e.target.src = "/api/placeholder/48/48";
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{service?.productName}</div>
                                                    <div className="text-sm opacity-50 truncate max-w-xs">
                                                        {service?.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                <div className="font-medium">{service?.email}</div>
                                                <div className="text-gray-500">Provider</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-outline badge-sm">
                                                {service?.category}
                                            </span>
                                        </td>
                                        <td className="font-semibold">${service?.price}</td>
                                        <td>{service?.location}</td>
                                        <td>
                                            {service?.createdAt ? 
                                                new Date(service.createdAt).toLocaleDateString() : 
                                                'N/A'
                                            }
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button className="btn btn-info btn-xs">
                                                    View
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(service?._id)} 
                                                    className="btn btn-error btn-xs"
                                                >
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
                                            </svg>
                                            <p className="text-gray-500 text-lg">No services found</p>
                                            <p className="text-gray-400 text-sm">
                                                {searchTerm || filterCategory ? 'Try adjusting your filters' : 'No services available'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination would go here in a real app */}
            {filteredAndSortedServices.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            Showing {filteredAndSortedServices.length} of {allServices.length} services
                        </span>
                        <div className="join">
                            <button className="join-item btn btn-sm">«</button>
                            <button className="join-item btn btn-sm btn-active">1</button>
                            <button className="join-item btn btn-sm">2</button>
                            <button className="join-item btn btn-sm">3</button>
                            <button className="join-item btn btn-sm">»</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllServices;