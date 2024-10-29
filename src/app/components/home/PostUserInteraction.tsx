"use client";
import { DeletePost } from "@/lib/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PostUserInteraction = ({
  post,
  userId,
}: {
  post: any;
  userId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, isLoading] = useState(false);
  const router = useRouter();
  const userDetail = (go: any) => {
    router.push(`/profile/${go}`);
  };

  const deletePost = async (id: number) => {
    isLoading(true);
    await DeletePost(id);
  };
  return (
    <>
      <div
        className="flex flex-row gap-4 items-center justify-center cursor-pointer"
        onClick={() => userDetail(post.user?.username)}
      >
        <Image
          src={post.user?.avatar || "/noAvatar.png"}
          alt="user"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />{" "}
        <span className="font-bold">{post.user?.username}</span>
      </div>
      {post.userId === userId ? (
        <div onClick={() => setOpen((prev) => !prev)} className="relative">
          {loading ? (
            <div className="inline-block h-[14px] w-[14px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          ) : (
            <Image
              src="/more.png"
              alt="user"
              width={14}
              height={14}
              className="cursor-pointer"
            />
          )}
          {open && (
            <div className="flex items-center justify-center absolute top-3 right-4 w-20 h-7 bg-gray-100 shadow-md rounded-sm transition-opacity duration-300 ease-in-out opacity-100">
              <button
                className="text-red-600 h-full flex items-center justify-center"
                onClick={() => deletePost(post.id)}
              >
                delete
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default PostUserInteraction;
