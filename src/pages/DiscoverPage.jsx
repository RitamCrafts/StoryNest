import { Compass, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { Query } from "appwrite";
import appwriteService from "../appwrite/config";
import LoadingPage from "./LoadingPage";

import PostCardGrid from "../components/General/PostCardGrid";

function DiscoverPage() {
    const [posts, setPosts] = useState([]);
    const [loading,setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if(loading){
        return(
            <LoadingPage/>
        )
    }

    return (
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 md:px-10 lg:px-20 py-5">
            <section className="mb-7">
                <div className="flex items-center gap-3 sm:-ml-1"> 
                    <h1 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-3xl font-bold leading-none tracking-tight text-gray-900">

                      <div className="flex shrink-0 items-center gap-2">
                          <Compass
                              size={25}
                              strokeWidth={2.3}
                              className="text-green-700 hidden sm:inline-block"
                          />

                          <span className="text-green-700">
                              Discover
                          </span>
                      </div>


                      <div className="flex shrink-0 items-center gap-2">
                          <span>Stories</span>

                          <Leaf
                              size={20}
                              strokeWidth={2.5}
                              className="translate-y-1 text-green-800/60"
                          />
                      </div>

                  </h1>
                </div>

                <p className="mt-3 max-w-2xl text-lg font-medium text-gray-500">
                    Explore the latest stories shared by writers from around the
                    world.
                </p>
            </section>

            <section className="mb-6 flex items-center gap-4">
                <span className="text-sm font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap">
                    Showing {Math.min(posts.length, 30)} stories
                </span>

                <div className="h-px flex-1 bg-green-800/20" />
            </section>

            <PostCardGrid posts={posts} />
        </div>
    );
}

export default DiscoverPage;