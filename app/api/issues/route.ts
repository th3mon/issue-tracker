import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is rquired.").max(255),
  description: z.string().min(1, "Description is rquired."),
});

type CreateIssueSchemaType = z.infer<typeof createIssueSchema>;

export async function POST(request: NextRequest) {
  const body: CreateIssueSchemaType = await request.json();

  const result = createIssueSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error.format(), { status: 400 });
  }

  const newIssue: CreateIssueSchemaType = await prisma.issue.create({
    data: {
      title: result.data.title,
      description: result.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
