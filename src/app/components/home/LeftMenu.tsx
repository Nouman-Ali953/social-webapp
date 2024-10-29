import React from "react";
import Ad from "../rightbar/Ad";
import Menu from "../leftbar/Menu";
import PersonMainProfile from "../profile/PersonMainProfile";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

interface LeftMenuProps {
  basePath: string | null;

}
const LeftMenu: React.FC<LeftMenuProps> = async({ basePath }) => {
  const {userId} = auth()
  if (!userId) {
    return null
  }
  const user = await prisma.user.findFirst({
    where:{
      id:userId
    }
  })
  return (
    <>
      <div className="flex flex-col gap-6">
        {basePath ? null : (
          <div className="p-2 bg-white shadow-md h-52 rounded-sm flex flex-col gap-2 ">
            <PersonMainProfile basePath={basePath} user={user}/>
          </div>
        )}
        <Menu />
        <Ad />
      </div>
    </>
  );
};

export default LeftMenu;
