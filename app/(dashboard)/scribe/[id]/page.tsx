import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id) => {
  const user = await getUserByClerkId();
  const entry = await prisma.scribeEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
  });

  return entry;
};

const JournalEditorPage = async ({ params }) => {
  const entry = await getEntry(params.id);
  const analysisData = [
    { name: "Summary", value: "" },
    { name: "Subject", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: "False" },
  ];
  return (
    <div className="h-full w-full grid grid-cols-3 gap-0 relative">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10 col-span-1">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-y border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JournalEditorPage;
