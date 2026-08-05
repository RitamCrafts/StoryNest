import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import authService from '../../appwrite/auth';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function LogoutBtn({closeDropdown}) {
    const auth = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const logoutHandler = async () => {
      if (loading) return;
      setLoading(true);
      try {
        await authService.logout();
        auth.logout();
        closeDropdown();
        navigate("/about");
      } catch (err) {
        console.error("Logout failed:", err);
        toast.error("Failed to log out. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
  return (
    <button
        onClick={logoutHandler}
        disabled={loading}
        className="flex w-full items-center gap-3 cursor-pointer px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
      >
        <LogOut size={18} />
        <span>{loading ? "Logging out..." : "Logout"}</span>
    </button>
  )
}

export default LogoutBtn