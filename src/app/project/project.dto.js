import { z } from "zod";

const urlField = z
  .url("Must be a valid URL")
  .trim()
  .optional()
  .or(z.literal(""));

const stringArrayField = z.preprocess(
  (val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      const trimmed = val.trim();
      if (!trimmed) return [];

      if (trimmed.startsWith("[")) {
        try {
          return JSON.parse(trimmed);
        } catch {
          return [];
        }
      }
      return trimmed
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  },
  z.array(z.string().trim().min(1)).default([]),
);

const booleanField = z.preprocess((val) => {
  if (typeof val === "boolean") return val;
  if (typeof val === "string") {
    if (val.toLowerCase() === "true") return true;
    if (val.toLowerCase() === "false") return false;
  }
  return val;
}, z.boolean().default(false));

const numberField = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return undefined;
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const parsed = Number(val);
    return Number.isNaN(parsed) ? val : parsed;
  }
  return val;
}, z.number().int().nonnegative().optional());

export const updateProjectDto = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(150, "Title must be 150 characters or fewer"),

  subtitle: z
    .string()
    .trim()
    .max(250, "Subtitle must be 250 characters or fewer")
    .optional(),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    )
    .optional(),

  description: z.string().trim().min(1, "Description is required").optional(),

  overview: z.string().trim().optional(),

  technologies: stringArrayField,

  githubLink: urlField,
  liveLink: urlField,

  stack: z
    .preprocess(
      (val) => {
        if (Array.isArray(val)) return val;
        if (typeof val === "string" && val.trim()) {
          if (val.trim().startsWith("[")) {
            try {
              return JSON.parse(val);
            } catch {
              return [];
            }
          }
          return val
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
        return [];
      },
      z
        .array(z.enum(["frontend", "backend", "fullstack"]))
        .min(1, "Select at least one stack"),
    )
    .optional(),

  featured: booleanField,

  status: z.enum(["completed", "in-progress", "planned"]).default("completed"),

  priority: numberField,

  year: z.string().trim().optional(),
  duration: z.string().trim().optional(),
  role: z.string().trim().optional(),

  challenges: stringArrayField,
  features: stringArrayField,
  learnings: stringArrayField,
});

export const createProjectDto = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(150, "Title must be 150 characters or fewer"),

  subtitle: z
    .string()
    .trim()
    .max(250, "Subtitle must be 250 characters or fewer")
    .optional(),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    )
    .optional(),

  description: z.string().trim().min(1, "Description is required").optional(),

  overview: z.string().trim().optional(),

  technologies: stringArrayField,

  githubLink: urlField,
  liveLink: urlField,

  stack: z
    .preprocess(
      (val) => {
        if (Array.isArray(val)) return val;
        if (typeof val === "string" && val.trim()) {
          if (val.trim().startsWith("[")) {
            try {
              return JSON.parse(val);
            } catch {
              return [];
            }
          }
          return val
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
        return [];
      },
      z
        .array(z.enum(["frontend", "backend", "fullstack"]))
        .min(1, "Select at least one stack"),
    )
    .optional(),

  featured: booleanField,

  status: z.enum(["completed", "in-progress", "planned"]).default("completed"),

  priority: numberField,

  year: z.string().trim().optional(),
  duration: z.string().trim().optional(),
  role: z.string().trim().optional(),

  challenges: stringArrayField,
  features: stringArrayField,
  learnings: stringArrayField,
});
