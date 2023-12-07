"use client";

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewScribeCard = () => {
  const router = useRouter();
  const handleOnClick = async () => {
    const data = await createNewEntry();
    router.push(`/scribe/${data.id}`);
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-highlight_white shadow-xl"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl font-extrabold text-background">
          New Entry
        </span>
      </div>
    </div>
  );
};

export default NewScribeCard;
