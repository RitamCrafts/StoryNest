import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
    status: false,
    userData: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [status, setStatus] = useState(false);
    const [userData, setUserData] = useState(null);

    const login = (userData) => {
        setStatus(true);
        setUserData(userData);
    };

    const logout = () => {
        setStatus(false);
        setUserData(null);
    };

    return (
        <AuthContext.Provider
            value={{
                status,
                userData,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);