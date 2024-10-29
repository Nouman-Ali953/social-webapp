"use client";
import { addUserLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";

const Interaction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  const {userId} = useAuth()
  const [liked, setLiked] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const addLike = async () => {
    await addUserLike(postId);
    setLiked((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }))
  };
  return (
    <div className="flex flex-row items-center justify-between mt-2">
      <div className="flex flex-row gap-4">
        <div className=" cursor-pointer flex flex-row gap-2 items-center bg-slate-100 px-2 rounded-xl justify-center">
          <form action={() => addLike()}>
            <button>
              <Image
                src={liked.isLiked ? "/liked.png" : "/like.png"}
                alt="like"
                width={15}
                height={15}
                unoptimized={true}
              />
            </button>
          </form>
          <span className="mb-1 text-sm text-gray-300">|</span>
          <span className="text-[.79rem]">
            {liked.likeCount}
            <span className="hidden md:inline"> Likes</span>
          </span>
        </div>
        <div className=" cursor-pointer flex flex-row gap-2 items-center bg-slate-100 px-2 rounded-xl justify-center">
          <Image src="/messages.png" alt="like" width={15} height={15} />
          <span className="mb-1 text-sm text-gray-300">|</span>
          <span className="text-[.79rem]">
            {commentNumber}
            <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      <div className=" cursor-pointer flex flex-row gap-2 items-center bg-slate-100 px-2 rounded-xl justify-center">
        <Image src="/share.png" alt="like" width={14} height={14} />
        <span className="mb-1 text-sm text-gray-300">|</span>
        <span className="text-[.79rem]">
          <span className="hidden md:inline"> Share</span>
        </span>
      </div>
    </div>
  );
};

export default Interaction;
