import NextAuth, { DefaultSession } from "next-auth";
import { authOptions } from "@/config/authOption";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: DefaultSession["user"] & {
      id?: string;
    };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 