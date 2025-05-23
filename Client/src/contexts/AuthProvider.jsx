import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext'; // Import the context from the separate file

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [mongoUser, setMongoUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    }

    const deleteUserAccount = () => {
        setLoading(true);
        return deleteUser(auth.currentUser);
    }

    // Function to fetch MongoDB user data
    const fetchMongoUser = async (email) => {
        try {
            console.log('Fetching MongoDB user for email:', email); // Debug log
            const response = await fetch(`https://espressoemporium.vercel.app/users/email/${email}`);
            if (response.ok) {
                const userData = await response.json();
                console.log('MongoDB user data received:', userData); // Debug log
                setMongoUser(userData);
            } else {
                console.log('MongoDB user not found, response status:', response.status);
                setMongoUser(null);
            }
        } catch (error) {
            console.error('Error fetching MongoDB user:', error);
            setMongoUser(null);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Firebase auth state changed:', currentUser?.email); // Debug log
            setUser(currentUser);

            // Fetch MongoDB user data when Firebase user changes
            if (currentUser?.email) {
                fetchMongoUser(currentUser.email);
            } else {
                setMongoUser(null);
            }

            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        mongoUser,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        deleteUserAccount,
        auth,
        fetchMongoUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;