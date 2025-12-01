import { authOptions } from "@/app/auth/authOptions";
import { Issue } from "@/app/generated/prisma/client";
import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

// TODO: Try to refactor validation section
export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const body: Issue = await request.json();

  // INFO: Validate title and description
  const result = patchIssueSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(result.error.format(), { status: 400 });
  }

  // INFO: Validate assigned_to_user_id
  const { title, description, assigned_to_user_id } = body;
  if (assigned_to_user_id) {
    const user = await prisma.user.findUnique({
      where: { id: assigned_to_user_id },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }
  }

  // INFO: Validate issue existence
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      description,
      assigned_to_user_id,
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
