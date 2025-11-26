import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';

export const AuthContext = createContext()

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const registerWithEmailPAssword = (email, pass) => {
        // console.log(email, pass)
        return createUserWithEmailAndPassword(auth, email, pass)
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
        return signInWithPopup(auth, googleProvider)
    }

    const authData = {
        registerWithEmailPAssword,
        setUser,
        user,
        handleGoogleSignIn
    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;