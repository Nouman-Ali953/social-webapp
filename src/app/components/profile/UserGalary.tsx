import React from "react";
import Image from "next/image";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

const UserGalary = async ({ user }: { user: User }) => {

  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    return null;
  }
  if (!user) {
    return null;
  }
  const userImages = await prisma.post.findMany({
    where: {
      userId: user.id!,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-4 shadow-md rounded-sm bg-white flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <p className="text-[0.79rem] font-semibold text-gray-500">User Media</p>
        <button className="text-[0.7rem] text-blue-600 font-semibold">
          see all
        </button>
      </div>
      <div className="flex flex-row flex-wrap gap-[1.4rem]">
        {userImages.length ? (
          userImages.map((postImage, index) => (
            <div className="relative w-20 h-24" key={index}>
              <Image
                src={postImage.img!}
                alt="img"
                layout="fill"
                className="w-20 h-20 object-cover"
              />
            </div>
          ))
        ) : (
          <p>no images found</p>
        )}
      </div>
    </div>
  );
};

export default UserGalary;
