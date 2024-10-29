"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const PostSendButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button className="grid place-items-center bg-blue-500 text-center px-2 py-1 text-white rounded-md w-14 h-8">
        {pending ? (
          <div className="inline-block h-[14px] w-[14px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        ) : (
          "send"
        )}
      </button>
    </>
  );
};

export default PostSendButton;
