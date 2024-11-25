import prisma from "@/prisma/prismaClient";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || new Date();
    console.log(date,"date");
    const minDate = new Date(date);
    const maxDate = new Date(date);
    console.log(minDate, "minDate");
    console.log(maxDate, "maxDate");

    maxDate.setDate(minDate.getDate() + 1);
    console.log(maxDate, "maxDate");

    const userId = req.headers.get("x-user-id");
    console.log(userId, "useridddd");
    const meetings = await prisma.booking.findMany({
      where: {
        userid: Number(userId),
        startdate: {
          gte: minDate,
          lt: maxDate,
        },
      },
    });

    return NextResponse.json({
      message: "Success",
      //   data: JSON.stringify(meetings),
      data: meetings,
    });
  } catch (error) {
    // console.log(error, "error");
    return NextResponse.json({ error: error.name }, { status: 400 });
  }
}
