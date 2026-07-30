import React from "react";
import { Link, NavLink } from "react-router-dom";


import Logo from "../Logo";
import UserAvatarIcon from "./UserAvatarIcon";
import HomeBtn from "./HomeBtn";
import DiscoverBtn from "./DiscoverBtn";
import CreateBlogBtn from "./CreateBlogBtn";
import ProfileBtn from "./ProfileBtn";
import AboutBtn from "./AboutBtn";

import SignUpBtn from "./SignUpBtn";
import LoginBtn from "./LoginBtn";
import { useAuthContext } from "../../context/AuthContext";

export default function Header() {
  const authContext = useAuthContext();
  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-green-100/70 bg-white/70 px-6 shadow-xl backdrop-blur-xl">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 flex-shrink-0"
        >
          {/* Full logo on sm and above */}
          <Logo
            width="140px"
            short={false}
            className="hidden sm:block transition-transform duration-200 hover:scale-[1.02]"
          />

          {/* Short logo below sm */}
          <Logo
            width="46px"
            short={true}
            className="block sm:hidden transition-transform duration-200 hover:scale-[1.02]"
          />

        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 md:gap-3 sm:gap-2">

          {!authContext.status?(
            <>

              <HomeBtn/>

              <DiscoverBtn/>

              <CreateBlogBtn/>

              <ProfileBtn/>

            </>

          ):(
            <>

              <AboutBtn/>

              <LoginBtn/>

              <div className="h-5 w-px bg-green-200 sm:inline-block hidden" />

              <SignUpBtn/>

            </>

          )}

        </nav>
      </div>
    </header>
  );
}