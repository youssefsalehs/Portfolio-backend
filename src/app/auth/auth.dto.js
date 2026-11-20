import z from "zod";

export const loginDto = z.object({ email: z.email(), password: z.string() });
export const registerDto = z.object({
  email: z.email(),
  username: z.string().min(6),
  password: z.string(),
});
