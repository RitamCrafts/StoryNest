import { Compass, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { Query } from "appwrite";
import appwriteService from "../appwrite/config";

import PostCardGrid from "../components/General/PostCardGrid";

function DiscoverPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch latest public posts
                const postResponse = await appwriteService.getPosts([
                    Query.equal("status", ["Public"]),
                    Query.orderDesc("$createdAt"),
                    Query.limit(30),
                ]);

                const postDocs = postResponse.documents;

                // Unique user IDs
                const userIds = [...new Set(postDocs.map(post => post.userid))];

                // Fetch all authors in ONE request
                const userResponse = await appwriteService.getUserProfiles([
                    Query.equal("$id", userIds),
                ]);

                // userid -> profile lookup
                const authorMap = Object.fromEntries(
                    userResponse.documents.map(user => [
                        user.$id,
                        user.name,
                    ])
                );

                // Attach author name to every post
                const postsWithAuthors = postDocs.map(post => ({
                    ...post,
                    author: authorMap[post.userid] ?? "Anonymous",
                }));

                setPosts(postsWithAuthors);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 md:px-10 lg:px-20 py-5">
            {/* ... */}

            <PostCardGrid posts={posts} />
        </div>
    );
}

export default DiscoverPage;