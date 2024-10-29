"use client";
import { ClerkLoaded, ClerkLoading, SignedOut, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useUser()
  return (
    <div className="flex gap-8 justify-center items-center flex-row-reverse">
      <div
        className="flex flex-col gap-[4.8px] cursor-pointer md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={`w-7 h-1 rounded-sm bg-blue-500 ${isOpen ? 'rotate-45' : '' } origin-left duration-500 ease-in-out`} />
        <div className={`w-7 h-1 rounded-sm bg-blue-500 ${isOpen ? 'opacity-0' : '' } origin-left duration-500 ease-in-out`} />
        <div className={`w-7 h-1 rounded-sm bg-blue-500 ${isOpen ? '-rotate-45' : '' } origin-left duration-500 ease-in-out`} />
      </div>
      {isOpen && (
        <div className="absolute h-[calc(100vh-96px)] w-full left-0 top-24 bg-white flex flex-col gap-8 items-center justify-center font-medium text-xl z-10">
          <Link href="/">Home</Link>
          <Link href="/suggestions">Friends</Link>
          <Link href="#">Groups</Link>
          <Link href="/">Stories</Link>
          <Link href="/sign-in">Login</Link>
        </div>
      )}

      <div className="flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
        </ClerkLoading>
        <ClerkLoaded>
        <SignedIn>
          <div className="flex flex-row gap-4 w-24 justify-center items-center">
            <div className="cursor-pointer">
              <Image src="/notifications.png" alt="hanepng" width={18} height={18} />
            </div>
            <Link href='/suggestions'>
            <div className="cursor-pointer">
              <Image src="/people.png" alt="hanepng" width={22} height={22} />
            </div>
            </Link>
            <Link href={`/profile/${user?.username}`}>
            <div className="cursor-pointer">
              <IoPersonOutline style={{fontSize:'1.2rem'}}/>
            </div>
            </Link>
          </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2 text-sm">
              <Image src="/login.png" alt="hanepng" width={20} height={20} />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default MobileMenu;
