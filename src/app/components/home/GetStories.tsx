import Image from "next/image";
import React, { Suspense } from "react";
import Stories from "./Stories";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";


const GetStories = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  
  
  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followings: {
              some: {
                followerId: userId,
              },
            },
          },
        },
        {
          userId: userId,
        },
      ],
    },
    include: {
      user: true,
    },
  });
  return (
    <>
        <div className=" rounded-lg bg-white shadow-md overflow-scroll">
          <div className="flex gap-2 w-max p-1">
            <Stories stories={stories} userId={userId}/>
          </div>
        </div>
    </>
  );
};

export default GetStories;
