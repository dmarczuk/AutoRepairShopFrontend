import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    allowedRoles: string[]; // Roles allowed to access this route
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, children }) => {
    const token = localStorage.getItem('token');
    const userRoles = JSON.parse(localStorage.getItem('roles') || '[]'); // Parse roles from localStorage

    // Check if user has a valid token and the required role
    const hasAccess = token && allowedRoles.some((allowedRoles) => userRoles.includes(allowedRoles));

    return hasAccess ? <>{children}</> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;