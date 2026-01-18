import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Link } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const DashboardMyServices = () => {
    const [myServices, setMyServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchMyServices();
    }, [user?.email]);

    const fetchMyServices = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/my-services?email=${user?.email}`);
            const data = await response.json();
            setMyServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
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
                            const filteredData = myServices.filter(service => service._id !== id);
                            setMyServices(filteredData);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your service has been deleted.",
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

    const filteredServices = myServices.filter(service => {
        const matchesSearch = service.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            service.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === '' || service.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
                    <p className="text-gray-600 mt-1">Manage your pet care services</p>
                </div>
                <Link to="/dashboard/add-service" className="btn btn-primary mt-4 sm:mt-0">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Service
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-primary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Services</div>
                    <div className="stat-value text-primary">{myServices.length}</div>
                    <div className="stat-desc">Active services</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-secondary">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                    <div className="stat-title">Average Price</div>
                    <div className="stat-value text-secondary">
                        ${myServices.length > 0 ? Math.round(myServices.reduce((sum, service) => sum + (service.price || 0), 0) / myServices.length) : 0}
                    </div>
                    <div className="stat-desc">Per service</div>
                </div>

                <div className="stat bg-white rounded-lg shadow-sm border">
                    <div className="stat-figure text-accent">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="stat-title">Categories</div>
                    <div className="stat-value text-accent">
                        {new Set(myServices.map(service => service.category)).size}
                    </div>
                    <div className="stat-desc">Different types</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="form-control flex-1">
                        <input
                            type="text"
                            placeholder="Search services..."
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
                </div>
            </div>

            {/* Services Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Service</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Location</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServices.length > 0 ? (
                                filteredServices.map(service => (
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
                                                <Link 
                                                    to={`/dashboard/update-service/${service?._id}`}
                                                    className="btn btn-primary btn-xs"
                                                >
                                                    Edit
                                                </Link>
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
                                    <td colSpan="6" className="text-center py-8">
                                        <div className="flex flex-col items-center">
                                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
                                            </svg>
                                            <p className="text-gray-500 text-lg">No services found</p>
                                            <p className="text-gray-400 text-sm">
                                                {searchTerm || filterCategory ? 'Try adjusting your filters' : 'Create your first service to get started'}
                                            </p>
                                            {!searchTerm && !filterCategory && (
                                                <Link to="/dashboard/add-service" className="btn btn-primary mt-4">
                                                    Add Your First Service
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardMyServices;