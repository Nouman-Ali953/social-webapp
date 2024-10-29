import React from "react";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import UserDetailInteraction from "./UserDetailInteraction";
import UpdateInteraction from "./UpdateInteraction";
import { User } from "@prisma/client";

interface UserDetailsProps {
  path: string;
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = async ({ path, user }) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const currentUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  const users = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!users) {
    return notFound();
  }

  const createdAtDate = new Date(users.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });

    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);
    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    followRes ? (isFollowing = true) : (isFollowing = false);
    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        recieverId: user.id,
      },
    });

    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }
  return (
    <div className="p-4 shadow-md rounded-sm bg-white flex flex-col gap-2">
      <UpdateInteraction users={user} covers={currentUser?.cover} />
      <div className="flex gap-1 items-center ">
        <p className="font-semibold">
          {users.name && users.surname
            ? users.name + " " + users.surname
            : users.username}
        </p>{" "}
        <span className="text-[.72rem] text-gray-400">
          {users.name && users.surname ? "@" + users.username : ""}
        </span>
      </div>
      <div className="text-[.71rem]">
        {users.description ? users.description : ""}
      </div>
      <div>
        {users.city ? (
          <p className="text-[.72rem] flex gap-1 items-center tracking-wide">
            <Image src="/map.png" alt="pngs" width={12} height={12} /> Living in{" "}
            <span className="font-semibold">{users.city}</span>
          </p>
        ) : null}
        {users.school ? (
          <p className="text-[.72rem] flex gap-1 items-center tracking-wide">
            <Image src="/school.png" alt="pngs" width={12} height={12} /> went
            to <span className="font-semibold">{users.school}</span>
          </p>
        ) : null}
        {users.work ? (
          <p className="text-[.72rem] flex gap-1 items-center tracking-wide">
            <Image src="/work.png" alt="pngs" width={12} height={12} /> works at
            <span className="font-semibold">{users.work}</span>
          </p>
        ) : null}

        <div className="flex justify-between mt-2">
          {users.website ? (
            <Link
              href="codezbit.com"
              className="text-blue-500 text-[.68rem] font-semibold flex gap-[.1rem] items-center"
            >
              <Image src="/link.png" alt="imsg" width={12} height={12} />
              {users.website}
            </Link>
          ) : null}
          <span className="flex items-center gap-1 text-[.65rem]">
            <Image src="/date.png" alt="imsg" width={12} height={12} />
            Joined {formattedDate}
          </span>
        </div>
      </div>
      {users.username && users.username !== currentUser?.username ? (
        <UserDetailInteraction
          userId={users.id}
          isUserBlocked={isUserBlocked}
          isFollowing={isFollowing}
          isFollowingSent={isFollowingSent}
        />
      ) : null}
    </div>
  );
};

export default UserDetails;
