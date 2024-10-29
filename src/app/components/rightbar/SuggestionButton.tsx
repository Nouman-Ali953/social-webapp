"use client";
import { sendFollowRequest } from "@/lib/actions";
import React from "react";
import { useFormStatus } from "react-dom";

const SuggestionButton = ({ userId }: { userId: string }) => {
  const { pending } = useFormStatus();
  const handleFollowRequest = async (userId:string) => {
      await sendFollowRequest(userId);
  };

  return (
    <>
      <form action={()=>handleFollowRequest(userId)}>
        <button className="text-[0.6rem] px-2 py-1 rounded-md bg-blue-500 text-white">
          {pending ? (
            <div className="inline-block h-[12px] w-[12px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          ) : (
            "follow"
          )}
        </button>
      </form>
    </>
  );
};

export default SuggestionButton;
