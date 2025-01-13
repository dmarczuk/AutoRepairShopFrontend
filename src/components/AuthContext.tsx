import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    userRoles: string[];
    setUserRoles: React.Dispatch<React.SetStateAction<string[]>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userRoles, setUserRoles] = useState<string[]>([]); // Store roles in state

    return (
        <AuthContext.Provider value={{ userRoles, setUserRoles }}>
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};