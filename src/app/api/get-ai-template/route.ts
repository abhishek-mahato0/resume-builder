// app/api/get-ai-template/route.ts
import { ResumeData } from "@/components/template/types";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROK_API!, // keep this safe in your env file
  baseURL: "https://api.x.ai/v1",
});

export async function POST(req: NextRequest) {
  const { userInput, userInfo }: { userInput: string; userInfo: ResumeData } =
    await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "grok-3",
      messages: [
        {
          role: "system",
          content: `You are a resume builder AI. Given resume data and a job description/request, return updated resume JSON in this format:\n\n${JSON.stringify(
            userInfo,
            null,
            2
          )}`,
        },
        {
          role: "user",
          content: `Job Description / Request:\n${userInput}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return NextResponse.json({
      success: true,
      data: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
