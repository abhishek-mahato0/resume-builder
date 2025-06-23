/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const SkillSchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    level: z.number().min(1).max(4),
    subtitle: z.string(),
  }),
]);

const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  live: z.string().optional(),
  code: z.string().optional(),
});

export const ResumeSchema = z.object({
  name: z.string(),
  title: z.string(),
  summary: z.string(),
  templateId: z.string().optional(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    website: z.string(),
    linkedin: z.string(),
    github: z.string(),
    twitter: z.string().optional(),
  }),
  experience: z
    .array(
      z.object({
        company: z.string(),
        role: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.array(z.string()),
      })
    )
    .default([]),
  education: z
    .array(
      z.object({
        school: z.string(),
        degree: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .default([]),
  skills: z.array(SkillSchema).default([]),
  language: z.array(SkillSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
});

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
