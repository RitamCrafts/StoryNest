import React, { useCallback, useEffect, useState } from 'react'
import {CommonBox,CommonSelect,CommonInput,CommonButton} from '../Common'
import UploadImage from '../General/UploadImage'
import { useForm } from 'react-hook-form';
import RTE from '../General/RTE'
import appwriteService from '../../appwrite/config';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import toast from 'react-hot-toast';
import { useClosestUniqueSlug } from '../../utils';


function PostForm({post}) {
  const isEdit = post ? true : false;
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(post ? false : true);
  const userData = authContext.userData;
  const { register,handleSubmit,watch,control,setValue,getValues,formState: { errors }, } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "Public"
    }
  });

  const submit = async (data) => {
    let file = null;
    let newPost = null;

    try {

      // Validation
      if (!post && !data.image?.length) {
        toast.error("Please upload a featured image.");
        return;
      }

      if (!["Public", "Private"].includes(data.status)) {
        toast.error("Invalid story status.");
        return;
      }

      setLoading(true);

      // ---------------- EDIT POST ----------------
      if (isEdit) {


        if (data.image?.length) {
          file = await appwriteService.uploadFile(data.image[0]);
          if (!file) throw new Error("File upload fail"); 
        }

        newPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage: file ? file.$id : post.featuredimage,
        });

        if(!newPost){
          throw new Error("New Post did not create."); 
        }


        if (file && post.featuredimage) {
          try {
            await appwriteService.deleteFile(post.featuredimage);
          } catch (cleanupErr) {
            console.warn("Old image deletion failed.", cleanupErr);
          }
        }

        toast.success("Story updated!");
        navigate(`/story/${newPost.$id}`);
        return;
      }



      // ---------------- CREATE POST ----------------
      if (!isEdit) {
        file = await appwriteService.uploadFile(data.image[0]);
        if (!file) throw new Error("File upload fail"); 
        if (!userData) throw new Error("User data is unavailable.");
      
        newPost = await appwriteService.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });

        if(!newPost){
          throw new Error("New Post did not create.");
        }

        toast.success("Story published!");
        navigate(`/story/${newPost.$id}`);
      }

    }
    catch (err) {
      if (file && !newPost) {
        try {
          await appwriteService.deleteFile(file.$id);
        } catch (cleanupErr) {
          console.warn("Uploaded file cleanup failed.", cleanupErr);
        } finally {
          file = null;
        }
      }

      if (err?.code === 409) {
        toast("Story ID already exists.");
        const toastId = toast.loading("Finding an available Story ID...");
        try {
          const newSlug = await useClosestUniqueSlug(data.slug);
          setValue("slug", newSlug);
          setAutoSlug(false);
          toast.success(`Story ID changed to:\n "${newSlug}"`, { id: toastId });
          toast("Please click publish again.")
        } catch (slugError) {
          console.error("Slug generation failed:", slugError);
          toast.error("Could not generate a unique Story ID.", { id: toastId });
        }
        return;
      }

      console.error("Post operation failed:", err);
      toast.error(isEdit ? "Failed to update story. Please try again.." : "Failed to publish story. Please try again..");
    }

     finally {
      setLoading(false);
    }
  };
    
  

  const slugTransform = useCallback((value = "") => {
      return value
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 36);
    }, []);

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if ( name === 'title' && autoSlug){
        setValue('slug',slugTransform(value.title),{shouldValidate:true})
      }
    });
    return () => {subscription.unsubscribe()};
  },[watch, slugTransform, setValue, autoSlug])

  return (
      <form
          onSubmit={handleSubmit(submit)}
          className="mx-auto w-full max-w-7xl space-y-8"
      >
          {/* Heading */}
          <div className='mt-6 md:mt-8 mx-4'>
            <div className="text-center">
              <div className='flex flex-row overflow-x-clip items-center justify-center gap-x-2'>
                <h1 className="text-4xl font-bold text-gray-900">
                    {isEdit ? " Continue writing." : "Write a Story."}
                </h1>
                <Leaf className='text-green-700 h-8 w-8 mt-1' strokeWidth={3}/>
              </div>

                <p className="mt-2 text-gray-500">
                    {isEdit ? "Edit your content and keep it fresh." : "Turn your thoughts into something worth sharing."}
                </p>
            </div>
          </div>

          <div className='mx-auto w-full max-w-[1400px] lg:px-10 md:px-8 sm:px-6 px-4 py-5 pt-0'>
            <CommonBox padding='sm:p-8 p-4 py-6'>
              {/* Main */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">

                  {/* LEFT */}
                  <div className="space-y-6">

                      <div className="space-y-1">
                        <CommonInput
                          label="Title"
                          labelClassName="mb-2 block text-sm font-semibold text-gray-800"
                          inputClassName="!shadow-none !border-2 !border-gray-200 focus:!border-green-300"
                          placeholder="Enter an engaging title..."
                          {...register("title", {
                            required: "Title is required",
                            minLength: {
                              value: 5,
                              message: "Title must be at least 5 characters",
                            },
                            maxLength: {
                              value: 100,
                              message: "Title is too long",
                            },
                          })}
                        />
                        {errors.title && (
                          <p className="text-xs text-red-600 md:pl-1">
                            {errors.title.message}
                          </p>
                        )}
                      </div>


                      <div className="space-y-1">
                        <CommonInput
                          disabled={isEdit}
                          label="Story ID"
                          labelClassName="mb-2 block text-sm font-semibold text-gray-800"
                          inputClassName="!shadow-none !border-2 !border-gray-200 focus:!border-green-300 disabled:bg-gray-100"
                          placeholder="your-story-id"
                          {...register("slug", {
                            required: "Story ID is required",
                            maxLength: {
                              value: 36,
                              message: "Story ID cannot exceed 36 characters",
                            },
                            pattern: {
                              value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                              message:
                                "Only lowercase letters, numbers and hyphens are allowed",
                            },
                            onChange: () => setAutoSlug(false),
                          })}
                        />

                        {errors.slug && (
                          <p className="text-xs text-red-600 md:pl-1">
                            {errors.slug.message}
                          </p>
                        )}
                      </div>

                      <RTE
                          label="Content"
                          name="content"
                          
                          control={control}
                          defaultValue={getValues("content")}
                      />

                  </div>

                  {/* RIGHT */}
                  <div className="h-fit space-y-6 lg:sticky lg:top-26 lg:mt-6">

                      <UploadImage
                        existingImage={
                          isEdit
                            ? appwriteService.getFileView(post.featuredimage)
                            : null
                        }
                        {...register("image", {
                          required: false, // handelled in submit
                        })}
                        boxSize="h-72 w-full"
                        textSize="text-sm"
                        scaleBtns="px-3 py-2 text-sm"
                      />
                      

                      <CommonSelect
                          label="Status"
                          options={["Public", "Private"]}
                          {...register("status",{
                            required: false, // handelled in submit
                          })}
                      />

                      <CommonButton
                          type="submit"
                          className="w-full"
                          disabled = {loading}
                      >
                          {isEdit ? (!loading ? "Update Story" : "Updating...") : (!loading ? "Publish Story" : "Publishing...")}
                      </CommonButton>

                      <p className="flex items-start gap-1.5 text-sm text-gray-500">
                          <span>⚠️</span>
                          <span>
                              Changes you make may not be saved until publish.
                          </span>
                      </p>

                  </div>

              </div>
            </CommonBox>
          </div>
      </form>
  );
}

export default PostForm