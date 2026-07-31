import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'



function ProtectedRoute() {
    const auth = useAuthContext();
    if (!auth.status) {
        return <Navigate to="/login" replace />;
    }
  return (
    <Outlet/>
  )
}

export default ProtectedRoute