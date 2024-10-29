import Image from "next/image";
import React from "react";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import FriendRequestList from "./FriendRequestList";

const FriendsRequest = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    return null;
  }
  const requests = await prisma.followRequest.findMany({
    where: {
      recieverId: currentUserId,
    },
    include: {
      sender: true,
    },
  });
  if (requests.length === 0) {
    return null;
  }
  return (
    <div className="p-4 shadow-md rounded-sm bg-white flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <p className="text-[0.79rem] font-semibold text-gray-500">
          Friend Requests
        </p>
        <button className="text-[0.7rem] text-blue-600 font-semibold">
          see all
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <FriendRequestList requests={requests} />
      </div>
    </div>
  );
};

export default FriendsRequest;
