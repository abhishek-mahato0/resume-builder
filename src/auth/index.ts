import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { prisma } from "@/auth/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({}),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (account?.provider === "google" && profile?.email) {
    //     try {
    //       // Check if user exists
    //       const existingUser = await prisma.user.findUnique({
    //         where: { email: profile.email },
    //       });

    //       // Create user if not exists
    //       if (!existingUser) {
    //         await prisma.user.create({
    //           data: {
    //             email: profile.email,
    //             id: profile.sub || profile.email || "",
    //             name: profile.name || profile.email || "",
    //             image: profile.picture || "",
    //             // password is not required for OAuth
    //           },
    //         });
    //       }
    //     } catch (err) {
    //       console.error("Error creating user:", err);
    //       return false; // Stop sign-in
    //     }
    //   }

    //   return true; // Continue sign-in
    // },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
});
