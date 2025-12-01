import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// INFO: _request is used to prevent cache; try to use {cache: "no-store"} instead of _request.
export async function GET(_request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(users, { status: 200 });
}
