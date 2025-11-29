import { authOptions } from "@/app/auth/authOptions";
import { Issue } from "@/app/generated/prisma/client";
import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const body: Issue = await request.json();
  const result = issueSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: Number(id),
    },
    data: {
      title: result.data.title,
      description: result.data.description,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(_request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const deletedIssue = await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json(deletedIssue);
}
