import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if the user's token exists in localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        // If no token exists, redirect the user to the login page
        return <Navigate to="/login" replace />;
    }

    // If a token exists, render the page they were trying to access
    return children;
};

export default ProtectedRoute;