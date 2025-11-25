import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';

export const AuthContext = createContext()

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

    const authData = {
        registerWithEmailPAssword,
        setUser,
        user,
    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;