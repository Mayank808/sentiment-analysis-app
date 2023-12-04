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
    include: {
      analysis: true,
    },
  });

  return entry;
};

const JournalEditorPage = async ({ params }) => {
  const entry = await getEntry(params.id);

  return (
    <div className="h-full w-full relative">
      <Editor entry={entry} />
    </div>
  );
};

export default JournalEditorPage;
