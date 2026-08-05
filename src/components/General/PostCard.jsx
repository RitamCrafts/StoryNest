import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
    const featuredImageFile = null;
    try {
        featuredImageFile = appwriteService.getFileView(featuredImage);
    } catch (error) {
        console.error(`Error loading featured image view for post ${id} :: `,error);
        throw error;
    }
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
            <div className="
                    
                w-[38%]
                md:w-full

                h-[120px]
                md:h-[140px]

                shrink-0
                overflow-hidden
            "
            >
                <img
                    src={featuredImageFile}
                    alt={title}
                    loading="lazy"
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
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
                <div className="min-w-0">
                    <h3
                        className="
                            line-clamp-2
                            text-lg
                            font-semibold
                            text-gray-900
                            transition-colors
                            group-hover:text-green-700

                            sm:text-xl
                        "
                    >
                        {title}
                    </h3>

                    <p className="mt-3 text-sm text-gray-500">
                        Updated 2 days ago
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