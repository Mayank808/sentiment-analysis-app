import NewScribeCard from "@/components/NewScribeCard";
import Question from "@/components/Question";
import ScribeCard from "@/components/ScribeCard";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { analyze } from "@/utils/openai";
import Link from "next/link";

const getUserEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.scribeEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      analysis: true,
    },
  });

  return entries;
};

const ScribePage = async () => {
  const entries = await getUserEntries();
  return (
    <div className="px-6 py-8 h-full">
      <h2 className="text-4xl font-extrabold text-white mb-4">My Journals</h2>
      <div className="my-4">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewScribeCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/scribe/${entry.id}`}>
            <ScribeCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ScribePage;
