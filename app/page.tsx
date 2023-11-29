import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  let href = userId ? "/scribe" : "/new-user";

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto text-center sm:text-left">
        <h1 className="text-6xl">ScribeMe</h1>
        <p className="text-2xl text-white/60">
          Journel and reflect on yourself over time.
        </p>
        <div className="my-4">
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
