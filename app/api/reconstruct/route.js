import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  try {
    
    const formData = await req.formData();
    const message = formData.get("message") || "";
    const file = formData.get("file");

    let fileContent = "";

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      fileContent = buffer.toString("utf-8"); // ✅ if text-based file (txt, md, etc.)
    }

    const prompt = `
      Reconstruct the following fragmented text into a coherent passage:
      ${message}
      ${fileContent ? "\nFile content:\n" + fileContent : ""}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reconstructedText = response.text || "No output";

    return NextResponse.json({ reconstructedText });
  } catch (err) {
    console.error("Backend error:", err);
    return NextResponse.json(
      { error: "Failed to reconstruct text" },
      { status: 500 }
    );
  }
}
