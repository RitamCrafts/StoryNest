import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CommonBox from "../components/Common/CommonBox";
import CommonButton from "../components/Common/CommonButton";
import { useAuthContext } from "../context/AuthContext";
import LoadingPage from "./LoadingPage";
import appwriteService from "../appwrite/config";
import toast from "react-hot-toast";
import { CommonPopup } from "../components/Common";
import { Trash2,TriangleAlert } from "lucide-react";
import UserAvatarIcon from "../components/General/UserAvatarIcon";

const PLACEHOLDER_IMAGE = "https://placehold.net/default.png";

export default function StoryPage() {
    const { postId } = useParams();

    const [copied, setCopied] = useState(false);
    const [enlargeImage, setEnlargeImage] = useState(false);

    const [featuredImageSrc, setFeaturedImageSrc] = useState(PLACEHOLDER_IMAGE);

    const [author, setAuthor] = useState(null); // TODO
    const [post, setPost] = useState(null);

    const [userIsAuthor, setUserIsAuthor] = useState(false);
    const [loading, setLoading] = useState(true);

    const [canSee,setCanSee] = useState(false);

    const navigate = useNavigate();
    const authContext = useAuthContext();



    const handleDeleteStory = async () => {
        if (!userIsAuthor) {
            toast.error("You don't have permission to delete this story.");
            return;
        }
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this story?"
        );
        if (!confirmed) return;
        try {
            const deleted = await appwriteService.deletePost(post.$id);
            if (!deleted) {
                throw new Error("Delete failed.");
            }
            if (post.featuredimage) {
                try {
                    await appwriteService.deleteFile(post.featuredimage);
                } catch (error) {
                    console.error(error);
                    toast.error("Story deleted but cover image couldn't be removed.");
                }
            }

            toast.success("Story deleted successfully.");
            navigate("/discover", {
                replace: true,
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete story.");
        }
    };


    const formatDate = (date) => {
        const day = date.getDate();

        const suffix =
            ["th", "st", "nd", "rd"][
                day % 10 > 3 || Math.floor((day % 100) / 10) === 1
                    ? 0
                    : day % 10
            ];

        const month = date.toLocaleDateString("en-US", {
            month: "long",
        });

        const year = date.getFullYear();

        return `${day}${suffix} ${month}, ${year}`;
    };

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);

            toast.success("Story URL copied.");

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (err) {
            console.error(err);
            toast.error("Failed to copy Story URL.");
        }
    };

    useEffect(() => {

        const fetchPost = async () => {

            try {
                setLoading(true);
                const fetchedPost = await appwriteService.getPost(postId);

                if (!fetchedPost) {
                    throw new Error("Post not found");
                }


                const tempIsAuthor = fetchedPost.userid === authContext.userData?.$id;

                setUserIsAuthor(tempIsAuthor);

                setCanSee(fetchedPost.status === "Public" || tempIsAuthor);
                
                setPost(fetchedPost);

                try {

                    const imageUrl = appwriteService.getFileView(
                        fetchedPost.featuredimage
                    );

                    setFeaturedImageSrc(imageUrl || PLACEHOLDER_IMAGE);

                } catch (error) {

                    console.error(error);

                    setFeaturedImageSrc(PLACEHOLDER_IMAGE);

                    toast.error("Unable to load cover image.");

                }

                // Fetch author information later

            } catch (error) {

                console.error(error);

                if(error.code === 404) toast.error("Unable to find this story.");
                else toast.error("Error finding this story.");

                navigate("/discover", {
                    replace: true,
                });

            } finally {

                setLoading(false);

            }

        };

        fetchPost();

    }, [postId, navigate, authContext.userData?.$id]);

    if (loading) {
        return <LoadingPage />;
    }

    if (!loading && !canSee) {
        return (
            <div className="max-w-lg mx-auto my-4 px-4">
                <CommonBox className="text-center py-10">
                    <h2 className="text-2xl font-bold text-gray-800">
                        This post is {post?.status ?? "Private"}.
                    </h2>

                    <p className="mt-3 text-gray-600">
                        You don't have permission to view this story.
                    </p>

                    <div className="mt-6">
                        <CommonButton
                            onClick={() => navigate("/discover")}
                        >
                            Back to Discover
                        </CommonButton>
                    </div>
                </CommonBox>
            </div>
        );
    }
    return (
        <section className="mx-auto w-full max-w-[1400px] xl:px-20 md:px-10 sm:px-8 px-5 py-5">
            <CommonBox
                padding="p-4 md:p-7"
            >
                <div
                    className="
                        flex
                        flex-col
                        gap-8

                        lg:grid
                        lg:grid-cols-[minmax(0,1fr)_420px]
                        lg:gap-10
                    "
                >

                    {/* Image (Mobile) */}
                    <div className="overflow-hidden rounded-2xl lg:hidden">
                        <img
                            src={featuredImageSrc}
                            alt="Cover Image"
                            onClick={() => setEnlargeImage(true)}
                            onError={(e) => {
                                e.currentTarget.src = PLACEHOLDER_IMAGE;
                            }}
                            className="
                                aspect-[16/7]
                                w-full
                                cursor-pointer
                                object-cover
                            "
                        />
                    </div>

                    {/* Enlarged Image */}
                    {enlargeImage && (
                        <CommonPopup
                            isOpen={enlargeImage}
                            onClose={() => setEnlargeImage(false)}
                            closeOnEsc={true}
                            closeOnOverlay={true}
                        >
                            <img
                                src={featuredImageSrc}
                                alt="Cover Image"
                                onError={(e) => {
                                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                                }}
                                className="
                                    max-h-[90vh]
                                    w-auto
                                    max-w-full
                                    object-contain
                                    rounded-2xl
                                "
                            />
                        </CommonPopup>
                    )}

                    {/* Left Content */}
                    <div>
                        <h1
                            className="
                                text-3xl
                                font-bold
                                text-gray-900
                                md:text-4xl
                            "
                        >
                            {post.title}
                        </h1>

                        <div
                            className="
                                mt-6
                                flex
                                flex-col
                                gap-5
                                flex-wrap
                                md:flex-row
                                md:items-center
                                md:justify-between
                            "
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full">
                                    <UserAvatarIcon />
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {author?.name || "Author"}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {formatDate(new Date(post.$createdAt))}
                                    </p>
                                </div>
                            </div>

                            <div
                                className="
                                    flex
                                    gap-3
                                    md:justify-end
                                "
                            >
                                <CommonButton
                                    variant="outline"
                                    onClick={handleCopyUrl}
                                >
                                    {copied ? "Copied!" : "Copy Story URL"}
                                </CommonButton>

                                {userIsAuthor && (
                                    <CommonButton
                                        variant="primary"
                                        onClick={() =>
                                            navigate(`/edit/${post.$id}`)
                                        }
                                    >
                                        Edit Story
                                    </CommonButton>
                                )}
                            </div>
                        </div>

                        <div className="my-7 h-px bg-green-100" />

                        <article
                            className="
                                prose
                                prose-lg
                                max-w-none

                                prose-headings:font-bold
                                prose-headings:text-gray-900

                                prose-p:text-gray-700
                                prose-p:leading-8

                                prose-img:rounded-xl
                                prose-img:mx-auto

                                prose-strong:text-gray-900
                            "
                            dangerouslySetInnerHTML={{
                                __html: post.content,
                            }}
                        />


                        {userIsAuthor && 
                            <div className="mt-16 border-t border-red-200 pt-8">
                                <h2 className="flex items-center gap-2 text-xl font-bold text-red-700">
                                    <TriangleAlert className="h-5 w-5" />
                                    Danger Zone
                                </h2>

                                <p className="mt-2 text-sm text-gray-600">
                                    Deleting this story is permanent. This action cannot be undone.
                                </p>

                                <div className="mt-6">
                                    <CommonButton
                                        variant="danger"
                                        onClick={handleDeleteStory}
                                        className="flex items-center gap-2"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                        Delete Story
                                    </CommonButton>
                                </div>
                            </div>
                        }

                    </div>

                    {/* Sticky Image (Desktop) */}
                    <div
                        className="
                            hidden
                            lg:block
                        "
                    >
                        <div
                            className="
                                sticky
                                top-6
                                overflow-hidden
                                rounded-2xl
                            "
                        >
                            <img
                                src={featuredImageSrc}
                                alt="Cover Image"
                                onClick={() => setEnlargeImage(true)}
                                onError={(e) => {
                                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                                }}
                                className="
                                    h-[calc(100vh-5rem)]
                                    w-full
                                    cursor-pointer
                                    rounded-2xl
                                    object-cover
                                "
                            />
                        </div>
                    </div>

                </div>
            </CommonBox>
        </section>
    );
}