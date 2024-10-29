"use client";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FcAddImage } from "react-icons/fc";
import { updateProfile } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";
import UpdateButton from "./UpdateButton";
import { useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";

const UpdateInteraction = ({ users,covers }: { users: User,covers:string | null | undefined }) => {
  const [open, setOpen] = useState(false);
  const {user } = useUser()
  const [cover, setCover] = useState<any>(covers);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  useEffect(() => {
    if (state.success) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setOpen(false);
        setShowSuccessMessage(false);
        state.success = false;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleClose = () => {
    setOpen((prev) => !prev);
    state.success = false;
    state.error = false;
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="text-[0.79rem] font-semibold text-gray-500">
          User Information
        </p>
        <button
          className="text-[0.7rem] text-blue-600 font-semibold"
          onClick={user?.username === users?.username ?() => setOpen(true):undefined}
        >
          {user?.username === users?.username ? (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-sm outline-none">
              update user
            </span>
          ) : (
            "see all"
          )}
        </button>
        {open ? (
          <div className="fixed inset-0 grid place-items-center bg-opacity-25 z-20 bg-black shadow-gray-600">
            <div className="w-full md:w-[70%] h-3/4 bg-opacity-100 bg-white shadow-xl px-5 flex flex-col  rounded-md">
              {/* Content goes here */}
              <p
                onClick={() => handleClose()}
                className="w-full m-3 cursor-pointer font-semibold text-gray-600 text-[1.2rem] flex flex-col gap-2"
              >
                <span className="self-end pr-7">
                  <IoIosCloseCircleOutline style={{ fontSize: "1.5rem" }} />
                </span>
              </p>
              <h1 className="font-semibold -mt-2 px-[10%]">Update Profile</h1>
              <p className="text-sm text-gray-500 px-[10%]">
                Use the navbar profile to update the username and profile
              </p>
              <form
                action={(formData) =>
                  formAction({ formData, cover: cover?.secure_url || covers })
                }
                className="p-4 px-[10%] flex flex-row flex-wrap items-center gap-3 w-full justify-center"
              >
                <div className="w-[100%]">
                  <div className="relative grid place-items-center bg-opacity-25">
                    <Image
                      src={covers ? cover : cover?.secure_url }
                      alt="cover"
                      width={100}
                      height={100}
                      className="w-full h-[5rem] object-cover opacity-65 rounded-sm"
                    />
                    <CldUploadWidget
                      uploadPreset="social"
                      onSuccess={(results) => setCover(results.info? results.info :covers)}
                    >
                      {({ open }) => {
                        return (
                          <div onClick={() => open()}>
                            <FcAddImage
                              name="cover"
                              className="w-10 h-10 absolute top-5 left-[46%] cursor-pointer shadow-lg shadow-gray-500"
                            />
                          </div>
                        );
                      }}
                    </CldUploadWidget>
                  </div>
                </div>

                {/* inputs sections */}
                <div style={{ width: "calc(50% - 0.4rem)" }}>
                  <input
                    name="name"
                    type="text"
                    placeholder="first name"
                    className="text-sm rounded-sm outline-none border border-black w-full px-2 py-2"
                  />
                </div>
                <div style={{ width: "calc(50% - 0.4rem)" }}>
                  <input
                    name="surname"
                    type="text"
                    placeholder="surname"
                    className="text-sm rounded-sm outline-none border border-black w-full px-2 py-2"
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <textarea
                    name="description"
                    placeholder="write your description ..."
                    className="text-sm rounded-sm utline-none border resize-none border-black w-full px-2 py-2"
                  />
                </div>
                <div className="w-[20%]">
                  <input
                    name="city"
                    type="text"
                    placeholder="city"
                    className="text-sm rounded-sm outline-none border border-black w-full px-2 py-2"
                  />
                </div>
                <div className="w-[24.9%]">
                  <input
                    name="school"
                    type="text"
                    placeholder="school"
                    className="text-sm rounded-sm outline-none border border-black w-full px-2 py-2"
                  />
                </div>
                <div className="w-[24.9%]">
                  <input
                    name="work"
                    type="text"
                    placeholder="work"
                    className="text-sm rounded-sm outline-none border border-black w-full px-2 py-2"
                  />
                </div>
                <div className="w-[24.9%]">
                  <input
                    name="website"
                    type="text"
                    placeholder="website"
                    className="text-sm rounded-sm outline-none border border-black w-full px-2 py-2"
                  />
                </div>
                <UpdateButton />
                {showSuccessMessage && (
                  <span className="text-green-500 self-start w-full -mt-2">
                    Profile has been updated!
                  </span>
                )}
                {state.error && (
                  <span className="text-red-500 self-start w-full -mt-2">
                    Something went wrong!
                  </span>
                )}
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default UpdateInteraction;
