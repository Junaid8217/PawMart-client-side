import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { toast } from 'react-toastify';

const DashboardLayout = () => {
    const { user, setUser } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    // Mock role - in real app, this would come from user data/JWT
    const userRole = user?.email === 'admin@petcare.com' ? 'admin' : 'user';

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            toast.error('Error logging out');
        }
    };

    const userMenuItems = [
        { name: 'Dashboard Overview', path: '/dashboard', icon: '📊' },
        { name: 'My Services', path: '/dashboard/my-services', icon: '🐾' },
        { name: 'My Orders', path: '/dashboard/my-orders', icon: '📋' },
        { name: 'Add Service', path: '/dashboard/add-service', icon: '➕' }
    ];

    const adminMenuItems = [
        { name: 'Dashboard Overview', path: '/dashboard', icon: '📊' },
        { name: 'All Services', path: '/dashboard/all-services', icon: '🐾' },
        { name: 'All Orders', path: '/dashboard/all-orders', icon: '📋' },
        { name: 'Users Management', path: '/dashboard/users', icon: '👥' },
        { name: 'Analytics', path: '/dashboard/analytics', icon: '📈' }
    ];

    const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <Link to="/dashboard" className="flex items-center ml-4 lg:ml-0">
                                <span className="text-xl font-bold text-blue-600">PetCare Dashboard</span>
                            </Link>
                        </div>

                        {/* Navigation and Profile */}
                        <div className="flex items-center gap-3">
                            {/* Back to Landing Page Button */}
                            <Link 
                                to="/" 
                                className="btn btn-outline btn-sm"
                                title="Back to Landing Page"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="hidden sm:inline">Home</span>
                            </Link>

                            {/* Profile Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Profile"
                                            src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li className="menu-title">
                                        <span>{user?.displayName || user?.email}</span>
                                        <span className="badge badge-sm badge-primary">{userRole}</span>
                                    </li>
                                    <li><Link to="/dashboard/profile">Profile</Link></li>
                                    <li><Link to="/dashboard">Dashboard Home</Link></li>
                                    <li><Link to="/">Back to Landing Page</Link></li>
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex pt-16">
                {/* Sidebar */}
                <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                    <div className="flex flex-col h-full pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <span className="text-lg font-semibold text-gray-800">Navigation</span>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                                >
                                    <span className="mr-3 text-lg">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-0">
                    <main className="p-6">
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default DashboardLayout;