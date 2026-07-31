import React from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo";
import HomeBtn from "./HomeBtn";
import DiscoverBtn from "./DiscoverBtn";
import CreatePostBtn from "./CreatePostBtn";
import ProfileBtn from "./ProfileBtn";
import AboutBtn from "./AboutBtn";
import SignUpBtn from "./SignUpBtn";
import LoginBtn from "./LoginBtn";
import { useAuthContext } from "../../context/AuthContext";

export default function Header() {
  const authContext = useAuthContext();

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl">
      <div className="px-2 py-2 sm:px-6">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-green-100/70 bg-white/70 px-6 shadow-lg">
          {/* Logo */}
          <Link
            to="/about"
            className="flex shrink-0 items-center gap-3"
          >
            {/* Full logo */}
            <Logo
              width="160px"
              short={false}
              className="hidden transition-transform duration-200 hover:scale-[1.02] sm:block"
            />

            {/* Mobile logo */}
            <Logo
              width="46px"
              short
              className="block transition-transform duration-200 hover:scale-[1.02] sm:hidden"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {authContext.status ? (
              <>
                <HomeBtn />
                <DiscoverBtn />
                <CreatePostBtn />
                <ProfileBtn />
              </>
            ) : (
              <>
                <AboutBtn />
                <LoginBtn />

                <div className="hidden h-5 w-px bg-green-200 sm:block" />

                <SignUpBtn />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}