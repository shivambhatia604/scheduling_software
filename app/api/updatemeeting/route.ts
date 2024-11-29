import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function POST(req: NextRequest) {
  try {
    const {
      meetingid,
      startdate,
      enddate,
      summary = "",
      description = "",
      location = "",
    } = await req.json();
    console.log(Number(meetingid));

    const userId = req.headers.get("x-user-id");
    console.log(userId);

    const updateBooking = await prisma.booking.update({
      where: {
        id: meetingid,
        userid: Number(userId),
      },
      data: {
        startdate,
        enddate,
        summary,
        description,
        location,
      },
    });
    if (updateBooking) {
      // #TODO:nodemailer
    }
    return NextResponse.json({
      message: "Meeting updated succcessfully.",
    });
  } catch (error) {
    return NextResponse.json({ error: error.name }, { status: 400 });
  }
}
