import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { createContext } from 'react';
import auth from '../firebase/firebase.config';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const registerWithEmailPAssword = (email, pass) => {
        // console.log(email, pass)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const authData = {
        registerWithEmailPAssword
    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;