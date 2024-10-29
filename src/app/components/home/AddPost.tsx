"use client";
import Image from "next/image";
import React, { useState } from "react";
import PostSendButton from "./PostSendButton";
import { CldUploadWidget } from "next-cloudinary";
import { useUser } from "@clerk/nextjs";
import { addUserPost } from "@/lib/actions";
import PostLoader from "../loadings/PostLoader";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [postimage, setPostimage] = useState<any>("");
  if (!isLoaded) {
    return (
      <PostLoader/>
    );
  }
  if (!user) {
    return null;
  }

  return (
    <>
      <div className="p-2 bg-white rounded-lg shadow-md ">
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex flex-row w-full gap-1 px-1">
            <Image
              src={user?.imageUrl || "/noAvatar.png"}
              alt="imag"
              width={50}
              height={50}
              className="rounded-full cursor-pointer w-12 h-11"
            />
            <form
              action={(formData) =>
                addUserPost(postimage?.secure_url , formData)
              }
              className="flex flex-row w-full gap-4 px-4 items-center"
            >
              <textarea
                placeholder="What's on your mind..."
                name="desc"
                className="flex-1 bg-slate-100 px-2 pt-1 rounded-md h-11 text-sm outline-none"
              ></textarea>
             
              <PostSendButton />
            </form>
          </div>
          <div className="flex flex-row flex-wrap items-center gap-6 ml-[4.4rem]">
            <div className="flex flex-row gap-1 justify-center items-center cursor-pointer">
              <CldUploadWidget
                uploadPreset="social"
                onSuccess={(results) => setPostimage(results.info)}
              >
                {({ open }) => {
                  return (
                    <div onClick={() => open()} className="flex gap-1">
                      <Image
                        src="/Addimage.png"
                        alt="imag"
                        width={18}
                        height={18}
                      />
                      <span className="text-sm">Photo</span>
                    </div>
                  );
                }}
              </CldUploadWidget>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center cursor-pointer">
              <Image src="/Addvideo.png" alt="imag" width={18} height={18} />
              <span className="text-sm">Video</span>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center cursor-pointer">
              <Image src="/poll.png" alt="imag" width={18} height={18} />
              <span className="text-sm">Poll</span>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center cursor-pointer">
              <Image src="/events.png" alt="imag" width={18} height={18} />
              <span className="text-sm">Event</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
