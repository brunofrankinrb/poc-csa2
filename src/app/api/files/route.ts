import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';

export async function GET(req: NextRequest) {
    const filename = req.nextUrl.searchParams.get("filename");
    const headers = new Headers();
    headers.set("Content-Type", "audio/mpeg");
    const file = fs.readFileSync(`/tmp/${filename}`);
    return new NextResponse(file, { status: 200, statusText: "OK", headers });
}