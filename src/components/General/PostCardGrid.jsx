import PostCard from "./PostCard";

function PostCardGrid({ posts = [] }) {
    return (
        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-7
            "
        >
            {posts.map((post) => (
                <div
                    key={post.$id}
                    className="
                        w-full
                        md:max-w-[400px]
                        md:mx-auto
                    "
                >
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    );
}

export default PostCardGrid;