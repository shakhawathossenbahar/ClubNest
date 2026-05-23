import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase";
import Loading from '../components/animation/Loading';


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const updateUser = (userInfo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,userInfo)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleProvider = new GoogleAuthProvider()
    const googleLogIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = ()=>{
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    if(loading) return <div className='min-h-screen flex justify-center items-center'><Loading /></div>


    const authData = {
        user,
        setUser,
        createUser,
        signInUser,
        googleLogIn,
        loading,
        setLoading,
        logOut,
        updateUser
    }


    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;