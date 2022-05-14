import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute ({ children, ...props }) {
    if(!props.isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;