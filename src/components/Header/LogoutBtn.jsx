import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { AuthService } from '../../appwrite/auth';
import { LogOut } from 'lucide-react';

function LogoutBtn({closeDropdown}) {
    const auth=useAuthContext();
    
  return (
    <button
        onClick={closeDropdown}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        <LogOut size={18} />
        <span>Logout</span>
    </button>
  )
}

export default LogoutBtn