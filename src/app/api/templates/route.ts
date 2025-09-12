import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "welcome", text: "Hello, how can I help you today?" },
    { id: "blog", text: "Write a blog post about AI trends in 2025." },
  ]);
}