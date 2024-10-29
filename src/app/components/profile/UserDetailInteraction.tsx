"use client";
import { switchBlock, switchFollow } from "@/lib/actions";
import React, { useOptimistic, useState } from "react";

const UserDetailInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (err) {}
  };

  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (err) {}
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked }
  );
  return (
    <>
      <div className="flex flex-col gap-2 mt-2">
        <form action={follow} className="w-full flex flex-col gap-2 mt-2">
          <button className="text-white bg-blue-500 rounded-md text-sm px-2 py-1 tracking-wide">
            {optimisticState.following
              ? "Following"
              : optimisticState.followingRequestSent
              ? "Friend Request Sent"
              : "Follow"}
          </button>
        </form>
        <form action={block} className="self-end">
          <button>
            <span className="text-red-400 text-xs cursor-pointer">
              {optimisticState.blocked ? "Unblock User" : "Block User"}
            </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default UserDetailInteraction;
