import React, { useState } from "react";
import UserAvatarIcon from "./UserAvatarIcon";
import ProfileDropdown from "./ProfileDropdown";

function ProfileBtn() {
  const [profileDropdownActive, setProfileDropdownActive] = useState(false);

  return (
    <div className="relative">
      <button
        title="Profile"
        className="rounded-full p-2 transition hover:bg-green-100 hover:scale-105"
        onClick={() => setProfileDropdownActive((prev) => !prev)}
      >
        <UserAvatarIcon size={35} />
      </button>

      {profileDropdownActive && (
        <ProfileDropdown
          closeDropdown={() => setProfileDropdownActive(false)}
        />
      )}
    </div>
  );
}

export default ProfileBtn;