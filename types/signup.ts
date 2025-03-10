import { z } from "zod";

export const signupSchema = z.object({
  name: z.string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Name must contain only letters and spaces" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string()
    .email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must not exceed 100 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 
      { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
  vitaName: z.string()
    .min(3, { message: "Vita name must be at least 3 characters long" })
    .max(100, { message: "Vita name must not exceed 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Vita name must contain only letters and spaces" }),
  vitaTone: z.enum([
    "wife",
    "mother",
    "friend",
    "assistant",
  ], { message: "Vita tone is required" }),
});