import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function POST(request: NextRequest & { user: { id: number } }) {
  const {
    startdate,
    enddate,
    summary = "",
    description = "",
    location = "",
    email,
  } = await request.json();
  console.log(startdate);
  //validation logic
  // if (validationError) {
  //     return NextResponse.json({ error: validationError }, { status: 400 });
  //   }
  try {
    const booking = await prisma.booking.create({
      data: {
        startdate,
        enddate,
        summary,
        description,
        location,
        email,
        userid: request?.user?.id,
      },
    });

    if (booking) {
      // #TODO:nodemailer
    }
    return NextResponse.json({
      message: "Meeting created succesfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.name }, { status: 400 });
  }
}
