import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const cleanEmail = credentials.email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
          where: { email: cleanEmail },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { permissions: true },
          });
          (session.user as any).permissions = dbUser?.permissions ? JSON.parse(dbUser.permissions) : {};
        } catch (e) {
          (session.user as any).permissions = {};
        }
      }
      return session;
    },
  },
  secret: (() => {
    if (process.env.NEXTAUTH_SECRET) {
      return process.env.NEXTAUTH_SECRET;
    }
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXTAUTH_SECRET environment variable is missing in production.");
    }
    return "dev-only-local-secret-do-not-use-in-production";
  })(),
};