import React, { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const DashboardAddService = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setImagePreview(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const formData = {
            productName: form.productName.value,
            category: form.category.value,
            price: parseInt(form.price.value),
            location: form.location.value,
            description: form.description.value,
            image: form.image.value,
            date: form.date.value,
            email: form.email.value,
        };

        try {
            const response = await axios.post('http://localhost:3000/services', formData);
            
            if (response.data.acknowledged) {
                Swal.fire({
                    title: "Success!",
                    text: "Service created successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate('/dashboard/my-services');
                });
            }
        } catch (error) {
            console.error('Error creating service:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Add New Service</h1>
                        <p className="text-gray-600 mt-1">Create a new pet care service offering</p>
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
                                        placeholder="https://example.com/image.jpg"
                                        className="input input-bordered"
                                        onChange={handleImageUrlChange}
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
                                        defaultValue={user?.email}
                                        className="input input-bordered bg-gray-50"
                                        readOnly
                                    />
                                    <label className="label">
                                        <span className="label-text-alt">This field is automatically filled</span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
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
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Create Service
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                        <h3 className="text-lg font-semibold mb-4">Preview</h3>
                        
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
                                        <p>Image preview will appear here</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tips */}
                        <div className="space-y-3">
                            <div className="alert alert-info">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold">Tips for better services:</h4>
                                    <ul className="text-sm mt-1 space-y-1">
                                        <li>• Use high-quality images</li>
                                        <li>• Write detailed descriptions</li>
                                        <li>• Set competitive prices</li>
                                        <li>• Specify clear locations</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAddService;