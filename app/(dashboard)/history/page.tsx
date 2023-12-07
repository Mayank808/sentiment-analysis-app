import SentimentGraph from "@/components/SentimentGraph";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getSentiment = async () => {
  const user = await getUserByClerkId();
  var analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const sum = analysis.reduce(
    (all, current) => all + current.sentimentScore,
    0
  );

  const average = Math.round(sum / analysis.length);
  analysis = analysis.map((entry) => {
    const date: Date = entry.createdAt;
    let month = date.getMonth() + 1; //months from 1-12
    let day = date.getDate();
    let year = date.getFullYear();

    entry.createdAt = year + "/" + month + "/" + day;
    return entry;
  });

  return { analysis, average };
};

const History = async () => {
  const { analysis, average } = await getSentiment();

  return (
    <div className="w-full h-full">
      <div className="text-white px-2 py-2 font-extrabold">
        Average Sentiment: {average}
      </div>
      <div className="w-[98%] h-[98%]">
        <SentimentGraph data={analysis} />
      </div>
    </div>
  );
};

export default History;
