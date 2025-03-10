import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    SUPABASE_URL: z.string().min(5),
    SUPABASE_ANON_KEY: z.string().min(5),
    GOOGLE_CLIENT_ID: z.string().min(5),
    GOOGLE_CLIENT_SECRET: z.string().min(5),
    API_URL: z.string().min(5),
    FRONTEND_URL: z.string().min(5),
    OPENAI_API_KEY: z.string().min(5),
    UPSTASH_REDIS_REST_URL: z.string().min(5),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(5),
    NEXTAUTH_SECRET: z.string().min(5),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().min(5),
  },
  runtimeEnv: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    API_URL: process.env.API_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});