import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex justify-center items-center py-5">
      <SignIn />
    </div>
  );
}
