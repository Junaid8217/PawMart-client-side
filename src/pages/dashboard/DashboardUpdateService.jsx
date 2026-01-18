import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const DashboardUpdateService = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState('');
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        price: '',
        location: '',
        description: '',
        image: '',
        date: '',
        email: user?.email || ''
    });

    useEffect(() => {
        if (id) {
            fetchServiceData();
        }
    }, [id]);

    const fetchServiceData = async () => {
        try {
            setFetchLoading(true);
            const response = await axios.get(`http://localhost:3000/services/${id}`);
            const service = response.data;
            
            setFormData({
                productName: service.productName || '',
                category: service.category || '',
                price: service.price || '',
                location: service.location || '',
                description: service.description || '',
                image: service.image || '',
                date: service.date || '',
                email: service.email || user?.email || ''
            });
            
            setImagePreview(service.image || '');
        } catch (error) {
            console.error('Error fetching service:', error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to load service data",
            });
            navigate('/dashboard/my-services');
        } finally {
            setFetchLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (name === 'image') {
            setImagePreview(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(`http://localhost:3000/update/${id}`, formData);
            
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Service updated successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate('/dashboard/my-services');
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No Changes",
                    text: "No changes were made to the service",
                });
            }
        } catch (error) {
            console.error('Error updating service:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong while updating!",
            });
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
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
                        <h1 className="text-2xl font-bold text-gray-900">Update Service</h1>
                        <p className="text-gray-600 mt-1">Modify your pet care service details</p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard/my-services')}
                        className="btn btn-ghost"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Services
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Service Name *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="productName"
                                            value={formData.productName}
                                            onChange={handleInputChange}
                                            placeholder="Enter service name"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Category *</span>
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="select select-bordered"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="pets">Pets</option>
                                            <option value="food">Food</option>
                                            <option value="accessories">Accessories</option>
                                            <option value="care-products">Care Products</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Price *</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                placeholder="0.00"
                                                className="input input-bordered pl-8"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Location *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="Service location"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>

                                    <div className="form-control md:col-span-2">
                                        <label className="label">
                                            <span className="label-text font-medium">Service Date *</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Description</h3>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Service Description</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe your service in detail..."
                                        className="textarea textarea-bordered h-32"
                                        rows="4"
                                    ></textarea>
                                    <label className="label">
                                        <span className="label-text-alt">Provide a detailed description of your service</span>
                                    </label>
                                </div>
                            </div>

                            {/* Image */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Service Image</h3>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Image URL *</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/image.jpg"
                                        className="input input-bordered"
                                        required
                                    />
                                    <label className="label">
                                        <span className="label-text-alt">Enter a valid image URL</span>
                                    </label>
                                </div>
                            </div>

                            {/* Provider Information */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Provider Information</h3>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Provider Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        className="input input-bordered bg-gray-50"
                                        readOnly
                                    />
                                    <label className="label">
                                        <span className="label-text-alt">This field cannot be modified</span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/dashboard/my-services')}
                                    className="btn btn-ghost flex-1"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-1"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            Update Service
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Preview & Info */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                        <h3 className="text-lg font-semibold mb-4">Current Service</h3>
                        
                        {/* Image Preview */}
                        <div className="mb-4">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Service preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                    onError={(e) => {
                                        e.target.src = "/api/placeholder/300/200";
                                    }}
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p>No image available</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Service Details */}
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold text-gray-900">{formData.productName || 'Service Name'}</h4>
                                <p className="text-sm text-gray-600">{formData.category || 'Category'}</p>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Price:</span>
                                <span className="font-semibold text-green-600">${formData.price || '0.00'}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Location:</span>
                                <span className="text-sm">{formData.location || 'Not specified'}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Date:</span>
                                <span className="text-sm">{formData.date || 'Not specified'}</span>
                            </div>
                        </div>

                        <div className="divider"></div>

                        {/* Update Tips */}
                        <div className="alert alert-info">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="font-semibold">Update Tips:</h4>
                                <ul className="text-sm mt-1 space-y-1">
                                    <li>• Keep information accurate</li>
                                    <li>• Update prices regularly</li>
                                    <li>• Use clear descriptions</li>
                                    <li>• Maintain quality images</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardUpdateService;