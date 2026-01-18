import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { ToastContainer, toast } from 'react-toastify';

export const AuthContext = createContext()

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const registerWithEmailPAssword = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const loginWithEmailPassword = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass)
    }

    //to hold the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        //clear up function
        return () => {
            unsubscribe()
        }
    }, [])

    const handleGoogleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const authData = {
        registerWithEmailPAssword,
        loginWithEmailPassword,
        setUser,
        user,
        handleGoogleSignIn,
        loading,
        
    }

    return <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;