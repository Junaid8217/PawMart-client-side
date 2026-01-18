import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // Check if user is admin (in real app, this would come from user data/JWT)
    const isAdmin = user?.email === 'admin@petcare.com';

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-center">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
                    <button 
                        onClick={() => window.history.back()} 
                        className="btn btn-primary"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default AdminRoute;