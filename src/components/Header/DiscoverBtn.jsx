import React from 'react'
import { NavLink } from 'react-router-dom'
import { Compass } from 'lucide-react'

function DiscoverBtn() {
  return (
    <NavLink
            to="/discover"
            className={({ isActive }) =>
              `flex items-center gap-2 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`
            }
          >
            <Compass size={20} />
            <span className="hidden md:inline">Discover</span>
    </NavLink>
  )
}

export default DiscoverBtn