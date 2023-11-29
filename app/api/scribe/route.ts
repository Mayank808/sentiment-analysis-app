import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkId();

  const entry = await prisma.scribeEntry.create({
    data: {
      userId: user.id,
      content: "Write something about your day",
    },
  });

  revalidatePath("/scribe");

  return NextResponse.json({ data: entry });
};