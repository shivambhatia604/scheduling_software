import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";
import { auth } from "@/lib/server-helpers/sessionController";

export async function POST(request: NextRequest) {
  try {
    const {
      startdate,
      enddate,
      summary = "",
      description = "",
      location = "",
      email,
    } = await request.json();
    console.log(startdate);
    console.log(request.headers.get("x-user-id"), "user in");
    //validation logic
    // if (validationError) {
    //     return NextResponse.json({ error: validationError }, { status: 400 });
    //   }
    // const userId = request.headers.get("x-user-id");
   const session = await auth();
   if(!session) {
    return NextResponse.json({ error: "not authenticated"}, { status: 400 });
   }
   console.log(session,"createmeeing api route")
    const booking = await prisma.booking.create({
      data: {
        startdate,
        enddate,
        summary,
        description,
        location,
        email,
        userid: session?.user?.id,
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
