import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'




function ProtectedRoute() {
    const location = useLocation();
    const auth = useAuthContext();
    if (!auth.status) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoute