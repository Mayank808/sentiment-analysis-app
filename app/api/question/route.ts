import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { questionAnswer } from "@/utils/openai";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { question } = await request.json();
  const user = await getUserByClerkId();

  const entries = await prisma.scribeEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const answer = await questionAnswer(question, entries);

  return NextResponse.json({ data: answer });
};
