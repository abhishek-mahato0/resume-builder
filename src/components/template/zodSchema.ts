/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
// 1. Skill Level Enum (1–5)
const LevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

// 2. Skill Schema (string or object)
const SkillSchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    level: LevelSchema,
    subtitle: z.string().optional(),
  }),
]);

// 3. Project Schema
const ProjectSchema = z.object({
  name: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.union([z.string(), z.array(z.string())]),
  tech: z.array(z.string()).optional(),
  live: z.string().optional(),
  code: z.string().optional(),
});

// 4. Contact Schema
const ContactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  address: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
});

// 5. Experience Schema
const ExperienceSchema = z.object({
  company: z.string(),
  location: z.string().optional(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.array(z.string()),
});

// 6. Education Schema
const EducationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

// 7. Final Resume Schema
export const ResumeSchema = z
  .object({
    name: z.string(),
    title: z.string(),
    summary: z.string(),
    templateId: z.string().optional(),
    contact: ContactSchema,
    experience: z.array(ExperienceSchema).default([]),
    education: z.array(EducationSchema).default([]),
    skills: z.array(SkillSchema).default([]),
    language: z.array(SkillSchema).optional(),
    projects: z.array(ProjectSchema).optional(),
    // Optional: allow unknown additional properties like `[key: string]: any`
  })
  .passthrough();

export function validateResume(raw: any) {
  const result = ResumeSchema.safeParse(raw);
  if (!result.success) {
    // Return specific validation errors
    return { error: result.error.format() };
  }

  // Cleaned and typed data
  return { data: result.data };
}

export const SettingsSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
  templateId: z.string().optional(),
});
