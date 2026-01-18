import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [isChecked, setIsChecked] = useState(true);

    // Mock role - in real app, this would come from user data/JWT
    const userRole = user?.email === 'admin@petcare.com' ? 'admin' : 'user';

    const handleTheme = () => {
        setIsChecked(!isChecked);
        if (isChecked) {
            document.querySelector('html').setAttribute('data-theme', 'dark');
        } else {
            document.querySelector('html').setAttribute('data-theme', 'light');
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Error logging out');
        }
    };

    // Logged-out routes (minimum 3)
    const publicRoutes = [
        { name: 'Home', path: '/', icon: '🏠' },
        { name: 'Services', path: '/services', icon: '🐾' }
    ];

    // Logged-in routes (minimum 5)
    const privateRoutes = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'My Services', path: '/dashboard/my-services', icon: '🐕' },
        { name: 'My Orders', path: '/dashboard/my-orders', icon: '📋' },
        { name: 'Add Service', path: '/dashboard/add-service', icon: '➕' },
        { name: 'Profile', path: '/dashboard/profile', icon: '👤' }
    ];

    // Admin additional routes
    const adminRoutes = [
        { name: 'All Services', path: '/dashboard/all-services', icon: '🔧' },
        { name: 'All Orders', path: '/dashboard/all-orders', icon: '📦' },
        { name: 'Users', path: '/dashboard/users', icon: '👥' },
        { name: 'Analytics', path: '/dashboard/analytics', icon: '📈' }
    ];

    const displayRoutes = user 
        ? (userRole === 'admin' ? [...privateRoutes, ...adminRoutes] : privateRoutes)
        : publicRoutes;

    return (
        <div className="navbar bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg sticky top-0 z-50">
            <div className="navbar-start">
                {/* Mobile Menu Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-64 p-2 shadow-xl border">
                        {/* Mobile Menu Header */}
                        <li className="menu-title">
                            <span className="text-primary font-bold">Navigation</span>
                        </li>
                        
                        {/* Public/Private Routes */}
                        {displayRoutes.map((route, index) => (
                            <li key={index}>
                                <Link to={route.path} className="flex items-center gap-3">
                                    <span className="text-lg">{route.icon}</span>
                                    {route.name}
                                </Link>
                            </li>
                        ))}
                        
                        {/* Mobile Auth Section */}
                        <div className="divider"></div>
                        {user ? (
                            <>
                                <li className="menu-title">
                                    <span className="text-secondary">Account</span>
                                </li>
                                <li>
                                    <div className="flex items-center gap-3 p-2">
                                        <div className="avatar">
                                            <div className="w-8 rounded-full">
                                                <img src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Profile" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium">{user?.displayName || 'User'}</div>
                                            <div className="text-xs opacity-70">{user?.email}</div>
                                        </div>
                                    </div>
                                </li>
                                <li><button onClick={handleSignOut} className="text-error">Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" className="btn btn-primary btn-sm">Login</Link></li>
                                <li><Link to="/register" className="btn btn-outline btn-sm mt-2">Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Brand Logo */}
                <Link to="/" className="btn btn-ghost text-xl font-bold">
                    <span className="text-2xl">🐾</span>
                    PawMart
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    {displayRoutes.slice(0, 5).map((route, index) => (
                        <li key={index}>
                            <Link 
                                to={route.path} 
                                className="btn btn-ghost btn-sm hover:bg-primary-focus hover:text-primary-content transition-all duration-200"
                            >
                                <span className="mr-2">{route.icon}</span>
                                {route.name}
                            </Link>
                        </li>
                    ))}
                    
                    {/* More Menu for Additional Routes */}
                    {displayRoutes.length > 5 && (
                        <li>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                                    More
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-base-content rounded-box z-[1] w-52 p-2 shadow-xl border">
                                    {displayRoutes.slice(5).map((route, index) => (
                                        <li key={index}>
                                            <Link to={route.path} className="flex items-center gap-3">
                                                <span>{route.icon}</span>
                                                {route.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    )}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end gap-2">
                {/* Theme Toggle */}
                <div className="tooltip tooltip-bottom" data-tip="Toggle Theme">
                    <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
                        <input type="checkbox" className="theme-controller" onChange={handleTheme} />
                        <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                        </svg>
                        <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                        </svg>
                    </label>
                </div>

                {/* User Authentication */}
                {user ? (
                    /* Advanced Profile Menu */
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    alt="Profile"
                                    src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-64 p-2 shadow-xl border">
                            {/* Profile Header */}
                            <li className="menu-title">
                                <div className="flex items-center gap-3 p-2">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <img src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Profile" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user?.displayName || 'User'}</div>
                                        <div className="text-xs opacity-70">{user?.email}</div>
                                        <div className="badge badge-primary badge-xs mt-1">{userRole.toUpperCase()}</div>
                                    </div>
                                </div>
                            </li>
                            
                            <div className="divider my-1"></div>
                            
                            {/* Quick Actions */}
                            <li className="menu-title">
                                <span>Quick Actions</span>
                            </li>
                            <li>
                                <Link to="/dashboard" className="flex items-center gap-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    </svg>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/profile" className="flex items-center gap-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/my-services" className="flex items-center gap-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    My Services
                                </Link>
                            </li>
                            
                            <div className="divider my-1"></div>
                            
                            {/* Settings & Logout */}
                            <li>
                                <Link to="/dashboard/profile" className="flex items-center gap-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Settings
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleSignOut} className="flex items-center gap-3 text-error hover:bg-error hover:text-error-content">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    /* Login/Register Buttons */
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost btn-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-primary btn-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;