import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ message: "No file" }, { status: 400 });
  }

  // file is a Blob in Next route handlers
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "data", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`;
  const filepath = path.join(uploadDir, filename);

  await fs.writeFile(filepath, buffer);

  const url = `/uploads/${filename}`;

  return NextResponse.json({ url });
}
