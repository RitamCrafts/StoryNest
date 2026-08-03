import React from "react";
import { X } from "lucide-react";
import UserAvatarIcon from "./UserAvatarIcon";
import LogoutBtn from "./LogoutBtn";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileDropdown({
  user = {
    name: "You",
    email: "no@data.com",
  },
  onLogout,
  closeDropdown,
}) {
  const auth = useAuthContext();
  user.email = auth.userData.email;
  user.name = auth.userData.name;
  return (
    <div className="absolute -right-4 top-14 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-green-100 bg-[#fbfefb] shadow-2xl backdrop-blur-3xl">

      {/* Close Button */}
      <button
        onClick={closeDropdown}
        className="absolute cursor-pointer right-3 top-3 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
      >
        <X size={16} />
      </button>

      {/* User Info */}
      <div className="flex items-center gap-3 border-b border-green-100 px-4 py-4">
        <UserAvatarIcon size={40} />

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-gray-800">
            {user?.name}
          </h3>

          <p className="truncate text-xs text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Logout */}
      <LogoutBtn closeDropdown={closeDropdown}/>
      
    </div>
  );
}