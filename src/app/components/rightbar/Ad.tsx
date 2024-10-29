import Image from "next/image";
import React from "react";

const Ad = () => {
 
  return (
    <div className="p-4 shadow-md rounded-sm bg-white flex flex-col gap-4 ">
      <div className="flex flex-row justify-between items-center">
        <p className="text-[0.79rem] font-semibold text-gray-500">
          Sponsored Ads
        </p>
        <Image
          src="/more.png"
          alt="user"
          width={6}
          height={6}
          className="w-3 h-3 rounded-full cursor-pointer"
        />
      </div>
      <div className={`relative w-full h-44`}>
        <Image
          src="https://images.pexels.com/photos/674475/pexels-photo-674475.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="imgd"
          layout="fill"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-between ">
          <div className="flex gap-2 ">
            <Image
              src="https://images.pexels.com/photos/53475/flower-blossom-bloom-blue-53475.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="user"
              width={10}
              height={10}
              className="w-6 h-6 rounded-full"
            />
            <span className="font-semibold text-[.77rem] text-blue-600">
              BigCheg Longue
            </span>
          </div>
          <p className="mt-2 text-[.79rem] text-gray-600">
            There are many variations passages of Lorem Ipsum available, but the
            majority have suffered alteration in some form
          </p>
          <button className="text-[.80rem] text-gray-600 bg-gray-300 px-4 py-[.30rem] rounded-md mt-2">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ad;
