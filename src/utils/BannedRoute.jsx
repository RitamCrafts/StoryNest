import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'


function BannedRoute() {
    const location = useLocation();
    return <Navigate to="/" state={{ from: location }} replace />;
}

export default BannedRoute