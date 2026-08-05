import React, { useEffect, useState } from "react";
import PostForm from "../components/PostForm/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import toast from "react-hot-toast";
import LoadingPage from "./LoadingPage";
import { useAuthContext } from "../context/AuthContext";


function EditPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const authContext = useAuthContext();

    useEffect(() => {
        if (!authContext.userData) return;
        const fetchPost = async () => {
            try {
                const fetchedPost = await appwriteService.getPost(postId);

                if (!fetchedPost) {
                    const error = new Error("Post not found");
                    error.code = 404;
                    throw error;
                }

                if (fetchedPost.userid !== authContext.userData.$id) {
                    const error = new Error("Unauthorized");
                    error.code = 403;
                    throw error;
                }

                setPost(fetchedPost);

            } catch (error) {
                console.error(error);
                if (error.code === 403) {
                    toast.error("You don't have permission to edit this story.");
                } else {
                    toast.error("Error finding your story.");
                }
                navigate(`/story/${postId}`, { replace: true });
            }
        };

        fetchPost();
    }, [postId, navigate]);

    if (!post) {
        return <div>
            <LoadingPage />
        </div>;
    }

    return <PostForm post={post} />;
}

export default EditPage;