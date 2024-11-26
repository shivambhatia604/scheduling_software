import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function POST(req: NextRequest) {
  try {
    const { meetingid } = await req.json();
    console.log(Number(meetingid));

    const userId = req.headers.get("x-user-id");
    console.log(userId);

    const cancelBooking = await prisma.booking.update({
      where: {
        id: meetingid,
        userid: Number(userId),
      },
      data: {
        iscancelled: true,
      },
    });
    if (cancelBooking) {
      // #TODO:nodemailer
    }
    return NextResponse.json({
      message: "Meeting cancelled.",
    });
  } catch (error) {
    return NextResponse.json({ error: error.name }, { status: 400 });
  }
}
