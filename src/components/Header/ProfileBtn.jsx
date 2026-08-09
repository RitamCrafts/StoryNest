// ProfileBtn.jsx
import React, { useState, useRef } from "react";
import UserAvatarIcon from "../General/UserAvatarIcon";
import ProfileDropdown from "./ProfileDropdown";

function ProfileBtn() {
  const [profileDropdownActive, setProfileDropdownActive] = useState(false);
  const buttonRef = useRef(null);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        title="Profile"
        className="rounded-full cursor-pointer p-2 transition hover:bg-green-100 hover:scale-105"
        onClick={() => setProfileDropdownActive((prev) => !prev)}
      >
        <UserAvatarIcon size={35} />
      </button>

      {profileDropdownActive && (
        <ProfileDropdown
          closeDropdown={() => setProfileDropdownActive(false)}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
}

export default ProfileBtn;