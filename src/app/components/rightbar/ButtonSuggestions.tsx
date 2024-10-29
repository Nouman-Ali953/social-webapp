"use client"
import { sendFollowRequest } from "@/lib/actions";
import React from "react";
import { useFormStatus } from "react-dom";

const ButtonSuggestions = ({ userId }: { userId: string }) => {
  const { pending } = useFormStatus();
  const handleFollowRequest = async (userId: string) => {
    await sendFollowRequest(userId);
  };

  return (
    <>
      <form action={() => handleFollowRequest(userId)}>
        <button className="bg-blue-500 text-white text-sm w-[90%] py-1 mx-2 mt-2 rounded-sm">
        {pending ? (
            <div className="inline-block h-[12px] w-[12px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          ) : (
            "Follow"
          )}
        </button>
      </form>
    </>
  );
};

export default ButtonSuggestions;
