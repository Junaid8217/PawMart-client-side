import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const Navbar = () => {

    const {user} = useContext(AuthContext);

    const handleSignOut = () => {
        signOut(auth)
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Home</a></li>
                        <li><a>Services</a></li>
                        <li><a>My Profile</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">WarmPaws</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link>Home</Link></li>
                    <li><Link to='/services'>Services</Link></li>
                    <li><Link>My Profile</Link></li>
                </ul>
            </div>

            {
                user && <div className="navbar-end">
                <btn onClick={handleSignOut}  className="btn">Log Out</btn>
            </div>
            }
            {
                !user && <div className="navbar-end">
                <btn  className="btn">Log In</btn>
            </div>
            }

            
        </div>
    );
};

export default Navbar;