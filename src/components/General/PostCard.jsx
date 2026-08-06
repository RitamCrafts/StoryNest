import { ArrowRight, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { useMemo, useState } from "react";
import { getRelativeTime } from "../../utils";

function PostCard({
    $id,
    title,
    featuredimage,
    $updatedAt,
    author = null,
}) {
    const [loaded, setLoaded] = useState(false);

    const featuredImageFile = useMemo(() => {
        try {
            return appwriteService.getFileView(featuredimage);
        } catch (error) {
            console.error(
                `Error loading featured image for post ${title} id=${$id}:`,
                error
            );
            return "";
        }
    }, [featuredimage, title, $id]);

    return (
        <Link
            to={`/story/${$id}`}
            className="
                group
                flex
                w-full
                flex-row
                overflow-hidden
                rounded-2xl
                border border-green-100/70
                bg-white/80
                shadow-md
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                md:flex-col
            "
        >
            {/* Image */}
            <div
                className="
                    relative
                    w-[38%]
                    md:w-full
                    h-[120px]
                    md:h-[140px]
                    shrink-0
                    overflow-hidden
                "
            >
                {!loaded && (
                    <div className="absolute inset-0 animate-pulse bg-gray-200" />
                )}

                <img
                    src={featuredImageFile}
                    alt={title}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    onError={() => setLoaded(true)}
                    className={`
                        h-full
                        w-full
                        object-cover
                        transition-all
                        duration-500
                        group-hover:scale-105
                        ${loaded ? "opacity-100" : "opacity-0"}
                    `}
                />
            </div>

            {/* Content */}
            <div
                className="
                    flex
                    min-w-0
                    flex-1
                    items-start
                    justify-between
                    p-5
                "
            >
                <div className="min-w-0 flex-1">
                    <h3
                        className="
                            truncate
                            text-lg
                            font-semibold
                            text-gray-900
                            transition-colors
                            group-hover:text-green-700
                            sm:text-xl
                        "
                        title={title}
                    >
                        {title}
                    </h3>

                    {author && (
                        <div className="mt-1 flex items-center gap-2 min-w-0 -mb-3">
                            <span className="truncate text-sm text-gray-500">
                                by {author}
                            </span>
                        </div>
                    )}

                    <p className={`mt-3 text-sm text-gray-500`}>
                        Updated {getRelativeTime($updatedAt)} ago
                    </p>
                </div>

                <div className="ml-4 flex shrink-0 items-end">
                    <ArrowRight
                        size={24}
                        className="
                            text-green-700
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                        "
                    />
                </div>
            </div>
        </Link>
    );
}

export default PostCard;