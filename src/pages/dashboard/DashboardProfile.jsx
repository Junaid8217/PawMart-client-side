import React, { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

const DashboardProfile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        email: user?.email || '',
        photoURL: user?.photoURL || '',
        phone: user?.phoneNumber || '',
        bio: 'Pet care enthusiast with years of experience in animal welfare.',
        location: 'New York, USA',
        joinDate: user?.metadata?.creationTime || new Date().toISOString()
    });

    // Mock role - in real app, this would come from user data/JWT
    const userRole = user?.email === 'admin@petcare.com' ? 'admin' : 'user';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            // Update Firebase profile
            await updateProfile(user, {
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });

            // Update local user state
            setUser({
                ...user,
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });

            // In a real app, you would also update the backend user profile
            // await axios.put(`/api/users/${user.uid}`, formData);

            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            displayName: user?.displayName || '',
            email: user?.email || '',
            photoURL: user?.photoURL || '',
            phone: user?.phoneNumber || '',
            bio: 'Pet care enthusiast with years of experience in animal welfare.',
            location: 'New York, USA',
            joinDate: user?.metadata?.creationTime || new Date().toISOString()
        });
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                        <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
                    </div>
                    <div className="flex space-x-3">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn btn-primary"
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleCancel}
                                    className="btn btn-ghost"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveProfile}
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Picture & Basic Info */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="text-center">
                            <div className="avatar mb-4">
                                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={formData.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        alt="Profile"
                                    />
                                </div>
                            </div>
                            
                            {isEditing && (
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Profile Picture URL</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="photoURL"
                                        value={formData.photoURL}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        placeholder="Enter image URL"
                                    />
                                </div>
                            )}

                            <h2 className="text-xl font-semibold text-gray-900">
                                {formData.displayName || 'User Name'}
                            </h2>
                            <p className="text-gray-600">{formData.email}</p>
                            
                            <div className="mt-4">
                                <span className={`badge ${userRole === 'admin' ? 'badge-error' : 'badge-primary'} badge-lg`}>
                                    {userRole.toUpperCase()}
                                </span>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center justify-center text-sm text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    {formData.location}
                                </div>
                                <div className="flex items-center justify-center text-sm text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    Joined {new Date(formData.joinDate).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
                        <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Services Created</span>
                                <span className="font-semibold">12</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Orders Placed</span>
                                <span className="font-semibold">8</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Spent</span>
                                <span className="font-semibold">$450</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Member Since</span>
                                <span className="font-semibold">2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    disabled={!isEditing}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className="input input-bordered"
                                    disabled
                                    placeholder="Email cannot be changed"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-gray-500">Email cannot be modified</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Phone Number</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    disabled={!isEditing}
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Location</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    disabled={!isEditing}
                                    placeholder="Enter your location"
                                />
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <label className="label">
                                <span className="label-text font-medium">Bio</span>
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="textarea textarea-bordered h-24"
                                disabled={!isEditing}
                                placeholder="Tell us about yourself..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
                        <h3 className="text-lg font-semibold mb-6">Account Settings</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">Email Notifications</h4>
                                    <p className="text-sm text-gray-600">Receive notifications about your orders and services</p>
                                </div>
                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">SMS Notifications</h4>
                                    <p className="text-sm text-gray-600">Get SMS updates for important activities</p>
                                </div>
                                <input type="checkbox" className="toggle toggle-primary" />
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">Marketing Communications</h4>
                                    <p className="text-sm text-gray-600">Receive promotional emails and offers</p>
                                </div>
                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="space-y-3">
                            <button className="btn btn-outline btn-warning w-full">
                                Change Password
                            </button>
                            <button className="btn btn-outline btn-error w-full">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;