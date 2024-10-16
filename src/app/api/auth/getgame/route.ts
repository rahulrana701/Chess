import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const id = req.headers.get("id");
  if (!id) {
    return NextResponse.json({ message: "data could not be processed" });
  }
  const gameData = await prisma.user.findMany({
    where: {
      id:id
    },
  });
  return NextResponse.json({ gameData });
};
