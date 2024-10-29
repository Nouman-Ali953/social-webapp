"use client";
import { addUserStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { Suspense, useEffect, useOptimistic, useState } from "react";
import { MdLibraryAdd } from "react-icons/md";
import StoryLoader from "../loadings/StoryLoader";
import { IoIosCloseCircleOutline } from "react-icons/io";

type StoryWithUser = Story & {
  user: User;
};

const Stories = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [storyImage, setStoryImage] = useState<any>();
  const [storyList, setStoryList] = useState(stories);
  const [storyImg, setStoryImg] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval:any;

    if (open) {
      setProgress(0); // Reset progress when a new image is opened
      interval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + 1;
          if (nextProgress >= 100) {
            setOpen(false);
            clearInterval(interval);
          }
          return nextProgress;
        });
      }, 100); // This will update the progress every 100ms
    }

    return () => clearInterval(interval); // Cleanup the interval on unmount or if open changes
  }, [open]);

  const { user } = useUser();
  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );
  const add = async () => {
    if (!storyImage?.secure_url) return;

    addOptimisticStory({
      id: Math.random(),
      img: storyImage?.secure_url || "",
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        username: "sending...",
        avatar: user?.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });
    const createdStory = await addUserStory(storyImage.secure_url);
    setStoryList((prev) => [createdStory!, ...prev]);
    setStoryImage("");
  };

  const storyOpen = (img: string) => {
    setOpen(true);
    setStoryImg(img);
  };
  return (
    <>
      <Suspense fallback={<StoryLoader />}>
        <div className="flex flex-col items-center py-1 gap-1 cursor-pointer px-2">
          {storyImage ? (
            <Image
              src={storyImage?.secure_url || ""}
              alt="ok"
              width={56}
              height={56}
              className="object-cover w-[4.4rem] h-[4.4rem] rounded-full"
            />
          ) : (
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(results) => setStoryImage(results.info)}
            >
              {({ open }) => {
                return (
                  <div
                    onClick={() => open()}
                    className="flex gap-1 w-[4.4rem] h-[4.4rem]  rounded-full ring-1 justify-center items-center"
                  >
                    <MdLibraryAdd style={{ fontSize: "1.5rem" }} />
                  </div>
                );
              }}
            </CldUploadWidget>
          )}
          <form action={add}>
            <button
              className={` ${
                storyImage ? "block" : "hidden"
              } text-sm bg-blue-500 text-white px-3 rounded-md py-[0.14rem] `}
            >
              {storyImage ? "send" : "Add Story"}
            </button>
          </form>
        </div>
        {optimisticStories?.map((story) => (
          <div
            className="flex flex-col items-center py-1 gap-1 cursor-pointer px-2"
            key={story.id}
          >
            <Image
              src={story.img}
              alt="story image"
              width={80}
              height={80}
              className="w-[4.4rem] h-[4.4rem]  rounded-full ring-2"
              onClick={() => storyOpen(story.img)}
            />
            {open ? (
              <div className="z-50 absolute top-0 left-0 bg-opacity-35 bg-black w-[100%] h-[100vh] flex items-center justify-center">
                <div className="relative rounded-md  w-[95%] h-[95%] md:w-[50%] md:h-[95%] bg-white">
                  <span className="absolute top-2 right-3 cursor-pointer ">
                    <IoIosCloseCircleOutline
                      style={{ fontSize: "1.5rem", color: "white" }}
                      onClick={() => setOpen(false)}
                    />
                  </span>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gray-300">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <Image
                    src={storyImg}
                    alt="afsadf"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            ) : null}
            <span className="text-sm">{story.user.username}</span>
          </div>
        ))}
      </Suspense>
    </>
  );
};

export default Stories;
