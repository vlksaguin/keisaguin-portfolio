import { NextRequest, NextResponse } from "next/server";

const TOKEN = "Kei:password";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (username !== "Kei" || password !== "password") {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({ token: TOKEN }, { status: 200 });
}
