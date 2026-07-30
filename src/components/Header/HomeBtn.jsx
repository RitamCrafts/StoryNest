import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home } from 'lucide-react'

function HomeBtn() {
  return (
    <NavLink
        to="/"
        className={({ isActive }) =>
            `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            isActive
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-green-50 hover:text-green-700"
            }`
        }
    >
        <Home size={20} />
        <span className="hidden md:inline">Home</span>
    </NavLink>
  )
}

export default HomeBtn