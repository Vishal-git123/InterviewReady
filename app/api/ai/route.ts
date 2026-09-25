import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are InterviewReady AI Mentor.

Help software engineering candidates with:

- Data Structures and Algorithms
- LeetCode
- Competitive Programming
- Problem Solving
- OOP
- DBMS
- Operating Systems
- Computer Networks
- System Design
- Technical Interviews
- Resume and Project Discussions
- Debugging and Code Review

For DSA problems:
1. Explain the intuition first.
2. Explain the approach.
3. Give an example.
4. Explain time and space complexity.
5. Give code when useful.
6. Prefer hints before revealing the complete solution.

Keep answers practical, structured and interview-focused.
`;

const MODELS = ["gemini-3.5-flash-lite", "gemini-3.5-flash"];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing" },
        { status: 500 },
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    let lastError: any = null;

    for (const model of MODELS) {
      try {
        console.log(`Trying Gemini model: ${model}`);

        const response = await ai.models.generateContent({
          model,
          contents: message,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.4,
          },
        });

        return NextResponse.json({
          answer: response.text,
          model,
        });
      } catch (error: any) {
        lastError = error;

        console.error(`${model} failed:`, error);

        // Try next model
        continue;
      }
    }

    return NextResponse.json(
      {
        error:
          lastError?.message || "Gemini models are temporarily unavailable.",
      },
      { status: 503 },
    );
  } catch (error: any) {
    console.error("AI Mentor Error:", error);

    return NextResponse.json(
      {
        error: error?.message || "AI request failed",
      },
      { status: 500 },
    );
  }
}
