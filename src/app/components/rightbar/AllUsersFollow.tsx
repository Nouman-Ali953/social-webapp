"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AllUsersFollow = () => {
    const router = useRouter()
    const redirectUser = () => {
        router.push('/suggestions')
    }
  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="text-[0.79rem] font-semibold text-gray-500">
          Follow people to see their posts
        </p>
        <button className="text-[0.7rem] text-blue-600 font-semibold" onClick={redirectUser}>
          see all
        </button>
      </div>
    </>
  );
};

export default AllUsersFollow;
