import { z } from "zod";

export const signinSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must not exceed 100 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 
      { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
});