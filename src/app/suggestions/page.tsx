import React from "react";
import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import ButtonSuggestions from "../components/rightbar/ButtonSuggestions";
import { auth } from "@clerk/nextjs/server";
const page = async () => {
  const { userId: currentUserId } = auth();

  const allUsers = await prisma.$queryRaw<User[]>`
  SELECT * FROM \`User\`
  WHERE \`id\` != ${currentUserId}
  AND \`id\` NOT IN (
    SELECT \`recieverId\` FROM \`FollowRequest\` WHERE \`senderId\` = ${currentUserId}
    UNION
    SELECT \`followingId\` FROM \`Follower\` WHERE \`followerId\` = ${currentUserId}
    
  )
  ORDER BY RAND()
  LIMIT 32;
`;

  return (
    <>
      <div className="flex flex-wrap gap-8 flex-row justify-evenly items-center w-full min-h-screen">
        {allUsers.length > 0 ? allUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-col gap-3 items-center justify-between bg-white w-[12rem] h-[13rem] shadow-md rounded-md"
          >
            <div className="w-full h-[60%]">
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt="ok"
                width={90}
                height={90}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col w-full h-[40%]">
              <span className="text-sm font-semibold px-2">
                {user.username}
              </span>
              <ButtonSuggestions userId={user.id} />
            </div>
          </div>
        )) : 'no user to follow because this social app is only one day old 🤗'}
      </div>
    </>
  );
};

export default page;
