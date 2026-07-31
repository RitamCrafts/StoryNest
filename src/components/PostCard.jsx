import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id,title,featuredImage}) {
  return (
    <div>
        <Link
            to={`/story/id=${$id}`}
            className="
                group
                block
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
            "
            >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden">
                <img
                src={appwriteService.getFilePreview(featuredImage)}
                alt={title}
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
            <div className="flex items-center justify-between p-5">
                <h3
                className="
                    line-clamp-2
                    text-lg
                    font-semibold
                    text-gray-800
                    transition-colors
                    group-hover:text-green-700
                "
                >
                {title}
                </h3>

                <ArrowRight
                size={22}
                className="
                    ml-4
                    shrink-0
                    text-green-700
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                "
                />
            </div>
        </Link>
    </div>
  )
}

export default PostCard