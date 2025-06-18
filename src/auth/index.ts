import { prisma } from "@/db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
});
