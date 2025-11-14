import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert File → ArrayBuffer → Uint8Array
    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes); // ✅ TypeScript-safe

    // Define upload directory (under /public/uploads)
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);

    // Write file to disk
    await writeFile(filePath, buffer); // ✅ no type error

    // Return file URL
    const fileUrl = `/uploads/${file.name}`;
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
