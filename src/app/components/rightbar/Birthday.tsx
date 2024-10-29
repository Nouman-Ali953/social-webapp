import Image from "next/image";
import React from "react";

const Birthday = () => {
  return (
    <div className="p-4 shadow-md rounded-sm bg-white flex flex-col gap-4 ">
      <div className="flex flex-row justify-between">
        <p className="text-[0.79rem] font-semibold text-gray-500">Birthdays</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center ">
          <div className="flex gap-2 items-center justify-center">
            <Image
              src="https://images.pexels.com/photos/27107645/pexels-photo-27107645/free-photo-of-shinjuku-temple-charms.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="user"
              width={10}
              height={10}
              className="w-6 h-6 rounded-full"
            />{" "}
            <span className="font-semibold text-[.77rem]">Nauman Mukhtar</span>
          </div>
          <div className="flex gap-1">
            <button className="text-[.6rem] font-semibold text-white bg-blue-500 py-[3px] rounded-md px-[8px]">
              Celebrate
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 flex flex-row gap-2 p-4 rounded-md">
        <div className="flex items-center">
          <Image src="/gift.png" alt="hgr" width={48} height={48} />
        </div>
        <div className="flex flex-col text-[.8rem] w-full">
          <p className="font-semibold">Upcoming Birthdays</p>
          <span className="text-gray-500 w-full text-[.67rem]">see 16 others have upcoming birthdays</span>
        </div>
      </div>
    </div>
  );
};

export default Birthday;
