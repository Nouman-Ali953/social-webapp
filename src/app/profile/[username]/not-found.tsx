import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-[calc(100vh-96px)] flex flex-col justify-evenly items-center gap-5">
        <h2>You may blocked by this user or may this user has been deleted</h2>
      <button className="text-sm text-white -mt-11 bg-blue-500 px-3 py-2 rounded-sm shadow-md">
        <Link href="/">Return Home</Link>
      </button>
      <Image
        src="/noUser.jpg"
        alt="ok"
        width={200}
        height={200}
        className="w-[18rem]"
        />
    </div>
  );
}
