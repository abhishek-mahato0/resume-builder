import { GoogleGenAI, Type } from "@google/genai";

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      title: { type: Type.STRING },
      summary: { type: Type.STRING },
      templateId: { type: Type.STRING },
      contact: {
        type: Type.OBJECT,
        properties: {
          email: { type: Type.STRING },
          phone: { type: Type.STRING },
          address: { type: Type.STRING },
          website: { type: Type.STRING },
          linkedin: { type: Type.STRING },
          github: { type: Type.STRING },
          twitter: { type: Type.STRING },
        },
        propertyOrdering: [
          "email",
          "phone",
          "address",
          "website",
          "linkedin",
          "github",
          "twitter",
        ],
      },
      experience: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            company: { type: Type.STRING },
            location: { type: Type.STRING },
            role: { type: Type.STRING },
            startDate: { type: Type.STRING },
            endDate: { type: Type.STRING },
            description: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          propertyOrdering: [
            "company",
            "location",
            "role",
            "startDate",
            "endDate",
            "description",
          ],
        },
      },
      education: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            school: { type: Type.STRING },
            degree: { type: Type.STRING },
            startDate: { type: Type.STRING },
            endDate: { type: Type.STRING },
          },
          propertyOrdering: ["school", "degree", "startDate", "endDate"],
        },
      },
      skills: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            level: { type: Type.NUMBER },
            subtitle: { type: Type.STRING },
          },
          propertyOrdering: ["name", "level", "subtitle"],
        },
      },
      language: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            level: { type: Type.NUMBER },
            subtitle: { type: Type.STRING },
          },
          propertyOrdering: ["name", "level", "subtitle"],
        },
      },
      projects: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            tech: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            live: { type: Type.STRING },
            code: { type: Type.STRING },
          },
          propertyOrdering: ["name", "description", "tech", "live", "code"],
        },
      },
    },
    propertyOrdering: [
      "name",
      "title",
      "summary",
      "templateId",
      "contact",
      "experience",
      "education",
      "skills",
      "language",
      "projects",
    ],
  },
};

const ai = new GoogleGenAI({
  apiKey: process.env.GENINI_SECRET,
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userInput =
    url.searchParams.get("input") ||
    "Generate resume data for a web developer skilled in React.js";
  const context = url.searchParams.get("context") || "";

  const prompt = `
  You are a resume expert. Given the user's goal and context, generate JSON data for a resume.

  User Input: ${userInput}
  Context (optional): ${context}

  Respond strictly in valid JSON format according to the given schema. Don't include extra text.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  const text = response.text || "";

  try {
    const data = JSON.parse(text || "[]");
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to parse JSON response", raw: text }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
