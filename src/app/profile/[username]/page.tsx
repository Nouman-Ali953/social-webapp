import React from "react";
import AddPost from "@/app/components/home/AddPost";
import Feed from "@/app/components/home/Feed";
import LeftMenu from "@/app/components/home/LeftMenu";
import RightMenu from "@/app/components/home/RightMenu";
import PersonMainProfile from "@/app/components/profile/PersonMainProfile";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import NotFound from "./not-found";

const page = async ({ params }: { params: { username: string } }) => {

  const username = params.username;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  
  const userPersonalPosts = await prisma.post.findMany({
    where: {
      userId:user.id
    },
    include: {
      user: true,
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  
  const basePath = user.username;
  // / Filter out posts with null images or provide a default image
  const formattedPosts = userPersonalPosts?.map((post) => ({
    ...post,
    img: post.img ?? "", // Default to an empty string if img is null
  }));

  const { userId: currentUserId } = auth();

  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  if (isBlocked) return <NotFound/>;

  return (
    <div className="flex gap-4 pt-6">
      <div className="hidden lg:block xl:block w-[20%]">
        <LeftMenu basePath={basePath} />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6 w-full">
          <PersonMainProfile basePath={basePath} user={user} />
          <AddPost />
          <Feed posts={formattedPosts}  />
        </div>
      </div>
      <div className="hidden md:hidden xl:block w-[30%]">
        <RightMenu basePath={basePath} user={user} />
      </div>
    </div>
  );
};

export default page;
