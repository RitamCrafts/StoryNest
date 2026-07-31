import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import authService, { AuthService } from '../../appwrite/auth';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function LogoutBtn({closeDropdown}) {
    const auth=useAuthContext();
    const navigate = useNavigate();

    const logoutHandler = () => {
      authService.logout().then(()=>{
          navigate("/about");
          auth.logout();
          closeDropdown();
        })
    }
    
  return (
    <button
        onClick={logoutHandler}
        className="flex w-full items-center gap-3 cursor-pointer px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        <LogOut size={18} />
        <span>Logout</span>
    </button>
  )
}

export default LogoutBtn