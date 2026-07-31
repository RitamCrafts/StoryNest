import React from "react";
import { CommonBox, CommonButton } from "../components/Common";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="mx-auto my-4 max-w-5xl px-4">
      <CommonBox>
        <div className="flex flex-col items-center text-center">

          {/* Logo */}
          <div className="mb-6 rounded-full border border-green-100/70 bg-white/70 p-4 shadow-[0_10px_35px_rgba(22,101,52,0.08)] backdrop-blur-xl">
            <Logo width="72px" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold">
            <span className="text-green-700">About</span>{" "}
            <span className="text-gray-800">BlogNest</span>
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600 leading-7">
            BlogNest is a clean and peaceful platform built for people who
            love to write, share ideas, and discover meaningful stories.
            Whether you're publishing your first article or reading something
            inspiring, BlogNest keeps the experience simple and distraction
            free.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <CommonButton variant="primary">
                Join BlogNest
              </CommonButton>
            </Link>

            <Link to="/discover">
              <CommonButton variant="secondary">
                Explore Stories
              </CommonButton>
            </Link>
          </div>
        </div>
      </CommonBox>

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <CommonBox>
          <h2 className="mb-3 text-xl font-semibold text-green-700">
            Write
          </h2>

          <p className="text-sm leading-6 text-gray-600">
            Create beautiful blog posts with an intuitive editor and share
            your thoughts with readers around the world.
          </p>
        </CommonBox>

        <CommonBox>
          <h2 className="mb-3 text-xl font-semibold text-green-700">
            Discover
          </h2>

          <p className="text-sm leading-6 text-gray-600">
            Explore articles across different topics and find stories that
            inspire, educate, and entertain.
          </p>
        </CommonBox>

        <CommonBox>
          <h2 className="mb-3 text-xl font-semibold text-green-700">
            Connect
          </h2>

          <p className="text-sm leading-6 text-gray-600">
            Become part of a growing community where writers and readers can
            exchange ideas in a calm and welcoming environment.
          </p>
        </CommonBox>

      </div>

      <CommonBox className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Why BlogNest?
        </h2>

        <div className="space-y-4 text-gray-600 leading-7">
          <p>
            We believe writing should feel effortless and reading should feel
            peaceful. That's why BlogNest focuses on clean design, minimal
            distractions, and a pleasant reading experience.
          </p>

          <p>
            As the platform grows, you'll see more features such as rich text
            editing, user profiles, bookmarks, search, categories, and much
            more—all while keeping the interface simple and familiar.
          </p>
        </div>
      </CommonBox>
    </div>
  );
}

export default About;