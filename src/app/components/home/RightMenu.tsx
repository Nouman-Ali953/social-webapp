import React from "react";
import FriendsRequest from "../rightbar/FriendsRequest";
import Birthday from "../rightbar/Birthday";
import Ad from "../rightbar/Ad";
import UserDetails from "../profile/UserDetails";
import UserGalary from "../profile/UserGalary";
import FollowSuggestion from "../rightbar/FollowSuggestion";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

interface RightMenuProps {
  basePath: string | null;
  user: User ;
}
const RightMenu: React.FC<RightMenuProps> = async ({ basePath, user }) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const currentUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  return (
    <div className={`flex flex-col gap-6 sticky top-[16px]`}>
      {basePath ? (
        <>
          <UserDetails path={basePath} user={user} />
          <UserGalary user={user} />
        </>
      ) : null}
      {basePath === currentUser?.username || basePath === null ? (
        <>
          <FriendsRequest />
          <FollowSuggestion />
          <Birthday />
        </>
      ) : null}
      <Ad />
    </div>
  );
};

export default RightMenu;
