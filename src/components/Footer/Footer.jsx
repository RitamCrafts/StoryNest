import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="border-t border-green-200/70 bg-white/70 backdrop-blur-md mt-4">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <Logo width="200px" short={false} />
            </div>

            <p className="max-w-xs text-sm leading-6 text-gray-600">
              A peaceful place to write, read, and share stories. Discover
              ideas, express yourself, and connect with readers around the
              world.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-green-700">
              Explore
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 transition-colors hover:text-green-700"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/discover"
                  className="text-gray-600 transition-colors hover:text-green-700"
                >
                  Latest Stories
                </Link>
              </li>

              <li>
                <Link
                  to="/write"
                  className="text-gray-600 transition-colors hover:text-green-700"
                >
                  Write a Story
                </Link>
              </li>

            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-green-700">
              Support
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 transition-colors hover:text-green-700"
                >
                  Contact Us
                </Link>
              </li>


              <li>
                <Link
                  to="/feedback"
                  className="text-gray-600 transition-colors hover:text-green-700"
                >
                  Feedback
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-gray-600 transition-colors hover:text-green-700"
                >
                  About StoryNest
                </Link>
              </li>


            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-green-700">
              Legal
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 transition-colors hover:text-green-700"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 transition-colors hover:text-green-700"
                >
                  Terms &amp; Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/cookies"
                  className="text-gray-600 transition-colors hover:text-green-700"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-green-200/70 pt-6 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-green-700">StoryNest</span>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="transition-colors hover:text-green-700"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-green-700"
            >
              Terms
            </Link>

            <Link
              to="/contact"
              className="transition-colors hover:text-green-700"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}