import React, { useCallback, useEffect } from 'react'
import {CommonBox,CommonSelect,CommonInput,CommonButton} from '../Common'
import UploadImage from '../General/UploadImage'
import { useForm } from 'react-hook-form';
import RTE from '../General/RTE'
import appwriteService from '../../appwrite/config';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';


function PostForm({post}) {
  const editForm = post ? true : false;
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const userData = authContext.userData;
  const { register,handleSubmit,watch,control,setValue,getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "Public"
    }
  });

  const submit = async (data) => {
    if (post) {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
        const newPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined 
        })
        if (newPost && file) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        if (!newPost && file) {
            await appwriteService.deleteFile(file.$id);
        }
        if(newPost) {
          navigate(`/story/id=${newPost.$id}`);
        }
    } else { //if !post
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null; 
      if (file){
        const fileId = file.$id;
        data.featuredImage = fileId;
        const newPost = await appwriteService.createPost({...data, userId: userData.$id});
        if(newPost) {
          navigate(`/story/id=${newPost.$id}`);
        }
        if (!newPost && file) {
            await appwriteService.deleteFile(file.$id);
        }
      }
    }
  }

 const slugTransform = useCallback((value = "") => {
      return value
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+|-+$/g, "");
    }, []);

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if ( name === 'title' ){
        setValue('slug',slugTransform(value.title),{shouldValidate:true})
      }
    });
    return () => {subscription.unsubscribe()};
  },[watch, slugTransform, setValue])

  return (
      <form
          onSubmit={handleSubmit(submit)}
          className="mx-auto w-full max-w-7xl space-y-8"
      >
          {/* Heading */}
          <div className='mt-4 md:mt-6 mx-4'>
            <div className="text-center">
              <div className='flex flex-row overflow-clip items-center justify-center gap-x-2'>
                <h1 className="text-4xl font-bold text-gray-900">
                    Write a Story
                </h1>
                <Leaf className='text-green-700 h-8 w-8 mt-1' strokeWidth={3}/>
              </div>

                <p className="mt-2 text-gray-500">
                    Turn your thoughts into something worth sharing.
                </p>
            </div>
          </div>

          <div className='mx-auto w-full max-w-[1400px] lg:px-10 md:px-8 sm:px-6 px-4 py-5 pt-0'>
            <CommonBox padding='sm:p-8 p-4 py-6'>
              {/* Main */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">

                  {/* LEFT */}
                  <div className="space-y-6">

                      <CommonInput
                          label="Title"
                          labelClassName='mb-2 block text-sm font-semibold text-gray-800'
                          inputClassName='!shadow-none !border-2 !border-gray-200 focus:!border-green-300'
                          placeholder="Enter an engaging title..."
                          {...register("title")}
                      />

                      <CommonInput
                          label="Slug"
                          inputClassName='!shadow-none !border-2 !border-gray-200 focus:!border-green-300'
                          labelClassName='mb-2 block text-sm font-semibold text-gray-800'
                          placeholder="your-story-slug"
                          {...register("slug")}
                      />

                      <RTE
                          label="Content"
                          name="content"
                          
                          control={control}
                          defaultValue={getValues("content")}
                      />

                  </div>

                  {/* RIGHT */}
                  <aside className="h-fit space-y-6 lg:sticky lg:top-26 lg:mt-6">

                      <UploadImage
                          register={register}
                          name="image"
                          boxSize="h-72 w-full"
                          textSize="text-sm"
                          scaleBtns="px-3 py-2 text-sm"
                      />

                      <CommonSelect
                          label="Status"
                          options={["Public", "Private"]}
                          {...register("status")}
                      />

                      <CommonButton
                          type="submit"
                          className="w-full"
                      >
                          {post ? "Update Story" : "Publish Story"}
                      </CommonButton>

                      <p className="flex items-start gap-1.5 text-sm text-gray-500">
                          <span>⚠️</span>
                          <span>
                              Changes you make may not be saved until publish.
                          </span>
                      </p>

                  </aside>

              </div>
            </CommonBox>
          </div>
      </form>
  );
}

export default PostForm