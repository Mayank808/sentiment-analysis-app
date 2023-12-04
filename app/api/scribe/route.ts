import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { analyze } from "@/utils/openai";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkId();

  const entry = await prisma.scribeEntry.create({
    data: {
      userId: user.id,
      content: "Write something about your day!",
    },
  });

  console.log(entry.content);

  const analysis = await analyze(entry.content);
  console.log(analysis);
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis,
    },
  });

  revalidatePath("/scribe");

  return NextResponse.json({ data: entry });
};
