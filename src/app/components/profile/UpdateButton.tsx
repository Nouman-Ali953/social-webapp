"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-500 p-2 mt-2 w-full rounded-sm text-sm text-white disabled:bg-opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? (
        <div className="inline-block h-[17px] w-[17px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      ) : (
        "Update"
      )}
    </button>
  );
};

export default UpdateButton;
