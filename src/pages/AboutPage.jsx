import React from "react";
import { CommonBox, CommonButton } from "../components/Common";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

function AboutPage() {
    return (
        <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-8">

            {/* Intro */}
            <CommonBox>
                <div className="flex flex-col items-center text-center">

                    {/* Logo */}
                    <div className="mb-6 rounded-full border border-green-100/70 bg-white/70 p-4 shadow-[0_10px_35px_rgba(22,101,52,0.08)] backdrop-blur-xl">
                        <Logo width="72px" />
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold">
                        <span className="text-green-700">About</span>{" "}
                        <span className="text-gray-800">StoryNest</span>
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                        StoryNest is a simple and peaceful space for writing,
                        sharing, and discovering stories. It is designed to
                        keep publishing and reading straightforward, with a
                        clean interface that stays out of your way.
                    </p>

                    {/* Actions */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link to="/signup">
                            <CommonButton variant="primary">
                                Join StoryNest
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

            {/* Features */}
            <div className="mt-8 grid gap-6 md:grid-cols-3">

                <CommonBox>
                    <h2 className="mb-3 text-xl font-semibold text-green-700">
                        Write
                    </h2>

                    <p className="text-sm leading-6 text-gray-600">
                        Create and edit your own stories with a clean writing
                        experience. Add featured images, format your content,
                        and manage your published posts from one place.
                    </p>
                </CommonBox>

                <CommonBox>
                    <h2 className="mb-3 text-xl font-semibold text-green-700">
                        Discover
                    </h2>

                    <p className="text-sm leading-6 text-gray-600">
                        Browse published stories through StoryNest's discovery
                        experience and find content from other writers without
                        unnecessary clutter.
                    </p>
                </CommonBox>

                <CommonBox>
                    <h2 className="mb-3 text-xl font-semibold text-green-700">
                        Your Account
                    </h2>

                    <p className="text-sm leading-6 text-gray-600">
                        Manage your own content and profile while authenticated
                        access keeps private actions restricted to the
                        appropriate account.
                    </p>
                </CommonBox>

            </div>

            {/* Built with Care */}
            <CommonBox className="mt-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                    Built with Care
                </h2>

                <div className="space-y-4 leading-7 text-gray-600">
                    <p>
                        StoryNest is built around a clean and easy-to-use
                        interface. Creating, editing, discovering, and reading
                        stories should feel natural rather than complicated.
                    </p>

                    <p>
                        Security is an important part of the platform.
                        Database permissions restrict access to user-owned
                        content and actions, while authenticated routes protect
                        features that require an account.
                    </p>

                    <p>
                        The application also handles common failures
                        gracefully, including some authentication errors, missing
                        content, failed uploads, and other service-related
                        problems, so unexpected errors don't have to become a
                        confusing experience.
                    </p>

                    <p>
                        User-owned posts can be managed by their respective
                        authors, while published content can be discovered by
                        other users according to its visibility settings.
                    </p>

                    <p>
                        The goal is simple: give writers a comfortable place
                        to publish and readers a pleasant place to discover
                        stories.
                    </p>
                </div>
            </CommonBox>

        </div>
    );
}

export default AboutPage;