import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("movieUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                };
                setCurrentUser(userInfo);
                localStorage.setItem("movieUser", JSON.stringify(userInfo));
            } else {
                setCurrentUser(null);
                localStorage.removeItem("movieUser");
            }
        });
        return unsubscribe;
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ currentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
