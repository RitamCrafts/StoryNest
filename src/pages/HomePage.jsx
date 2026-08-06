import { FileText } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import WelcomeSection from "../components/Home/WelcomeSection";
import QuoteBox from "../components/Home/QuoteBox";
import testImage from "../assets/testImage.jpeg"
import UserPostsHeader from "../components/Home/UserPostsHeader.jsx";
import PostCardGrid from "../components/General/PostCardGrid.jsx";
import { Query } from "appwrite";
import appwriteService from "../appwrite/config.js";
import { useState,useEffect } from "react";


function HomePage() {
    const auth = useAuthContext();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!auth.userData) return;

        const fetchPosts = async () => {
            try {
                const result = await appwriteService.getPosts([
                    Query.equal("userid", auth.userData.$id),
                    Query.orderDesc("$createdAt"),
                ]);

                setPosts(result.documents);
            } catch (error) {
                console.error(error);
                toast.error("Error fetching posts.");
            }
        };

        fetchPosts();
    }, [auth.userData]);
    
    return (
        <div className="mx-auto w-full max-w-[1400px] lg:px-20 md:px-13 sm:px-8 px-5 py-5">

            {/* Hero */}
            <section className="pb-7 flex flex-col gap-y-8 md:flex-row md:justify-between h-xs">
                <WelcomeSection name={auth.userData.name} />
                <QuoteBox />
            </section>

            {/*Post Grid*/}
            {(posts.length>0) && 
                <>
                    <UserPostsHeader margin="mb-6 md:mb-9 lg:-ml-4"/>
                    <PostCardGrid posts={posts} />
                </>
            }

        </div>
    );
}

export default HomePage;