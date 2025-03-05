import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

// AuthProvider (Fixed Typo Here)
export const AuthProvide = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register a user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    // Login the user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    // Sign up with Google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    };

    // Logout the user
    const logout = () => {
        return signOut(auth);
    };

    // Password reset
    const doPasswordReset = async (email) => {
        return await sendPasswordResetEmail(auth, email);
    };

    // Password change
    const doPasswordChange = async (password) => {
        return await updatePassword(auth.currentUser, password);
    };

    // Email verification
    const doSendEmailVerification = async () => {
        return await sendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}/home`
        });
    };

    // Manage user authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
        doPasswordReset,
        doPasswordChange,
        doSendEmailVerification
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

