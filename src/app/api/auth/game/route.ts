import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/extension";
const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  const { id, result } = data;
  if (!id && !result) {
    return NextResponse.json({
      message: "Please provide sufficient data to get saved",
    });
  }
  const game = await prisma.gameresult.create({
    data: {
      result,
      Id: id,
    },
  });
  if (!game) {
    return NextResponse.json({ message: "game data cannot be saved" });
  }
  return NextResponse.json({ message: "game data saved successfully" });
};
