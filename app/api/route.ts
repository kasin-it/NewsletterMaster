import { NextRequest, NextResponse } from "next/server"

export function GET(req: NextRequest) {
   return NextResponse.json({ name: "sdfsd" })
}
