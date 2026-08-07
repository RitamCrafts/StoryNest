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


                setPost(fetchedPost);

            } catch (error) {
                console.error(error);
                if (error.code === 401) {
                    toast.error("You don't have permission to edit this story.");
                } else if (error.code === 404) {
                    toast.error("Story not found.");
                } else {
                    toast.error("Something went wrong.");
                }
                navigate(`/story/${postId}`, { replace: true });
            }
        };

        fetchPost();
    }, [postId, navigate, authContext.userData]);

    if (!post) {
        return <div>
            <LoadingPage />
        </div>;
    }

    return <PostForm post={post} />;
}

export default EditPage;