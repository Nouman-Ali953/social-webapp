import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import SuggestionButton from "./SuggestionButton";
import AllUsersFollow from "./AllUsersFollow";
const FollowSuggestion = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    return null;
  }

  const alreadyFollowing = await prisma.follower.findMany({
    where: {
      followerId: currentUserId,
    },
  });

  const alreadySendRequest = await prisma.followRequest.findMany({
    where: {
      senderId: currentUserId,
    },
  });

  const SuggestPeoples = await prisma.user.findMany({
    where: {
      id: {
        not: currentUserId,
        notIn: [
          ...alreadySendRequest.map((foll) => foll.recieverId),
          ...alreadyFollowing.map((foll) => foll.followingId),
        ],
      },
    },
    take:4
  });

  // Shuffle function
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle and take a random subset
const shuffledUsers = shuffleArray(SuggestPeoples);
const randomUsers = shuffledUsers.slice(0, 4);



  return (
    <div className="p-4 shadow-md rounded-sm bg-white flex flex-col gap-4">
      <AllUsersFollow/>
      <div className="flex flex-col gap-3">
        {randomUsers.map((people) => (
          <>
            <div
              key={people.id}
              className="flex justify-between px-1 py-1 items-center"
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={people.avatar || "/noAvatar.png"}
                  alt="isg"
                  width={26}
                  height={26}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <p className="text-sm">{people.username}</p>
              </div>
              <SuggestionButton userId={people.id}/>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default FollowSuggestion;
