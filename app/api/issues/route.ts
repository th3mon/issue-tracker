import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema, IssueFormData } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const body: IssueFormData = await request.json();

  const result = createIssueSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error.format(), { status: 400 });
  }

  const newIssue: IssueFormData = await prisma.issue.create({
    data: {
      title: result.data.title,
      description: result.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
