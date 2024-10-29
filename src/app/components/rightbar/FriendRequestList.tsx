"use client";
import { followRequestAccept, followRequestDecline } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import React from "react";

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const accept = async (userId:string) => {
    await followRequestAccept(userId)
  }
  const decline = async (userId:string) => {
    await followRequestDecline(userId)

  }
  return (
    <>
      {requests.map((request, index) => (
        <div className="flex flex-row justify-between items-center " key={index}>
          <div className="flex gap-2 items-center justify-center" key={index}>
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt="user"
              width={10}
              height={10}
              className="w-6 h-6 rounded-full"
            />{" "}
            <span className="font-semibold text-[.77rem]">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className="flex gap-1">
            <form action={()=>accept(request.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt="accept"
                  width={14}
                  height={14}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <form action={()=>decline(request.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt="accept"
                  width={14}
                  height={14}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendRequestList;
