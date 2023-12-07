import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { analyze } from "@/utils/openai";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const { content } = await request.json();
  const user = await getUserByClerkId();

  const updateEntry = await prisma.scribeEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(updateEntry.content);

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updateEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updateEntry.id,
      ...analysis,
    },
    update: analysis,
  });

  return NextResponse.json({
    data: { ...updateEntry, analysis: updatedAnalysis },
  });
};
