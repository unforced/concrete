import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

// Define proper types for session callback
interface SessionParams {
  session: any;
  token: {
    sub?: string;
    [key: string]: any;
  };
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you would typically verify against your database
        // For demo purposes, we'll use a simple check
        if (credentials?.email === "demo@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
            image: "https://ui-avatars.com/api/?name=Demo+User"
          };
        }
        return null;
      }
    }),
    // Only add GitHub provider if credentials are available
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [
          GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          })
        ]
      : []),
    // Only add Google provider if credentials are available
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          })
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub || "";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Add authorized callback to control access
    async authorized({ request, auth }) {
      // Return true if user is logged in or accessing a public page
      const { pathname } = request.nextUrl;
      if (pathname.startsWith('/api/')) return true; // Allow API routes
      if (pathname.startsWith('/auth/')) return true; // Allow auth pages
      if (pathname === '/') return true; // Allow home page
      return !!auth; // Require auth for other pages
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development",
  debug: process.env.NODE_ENV === "development",
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig); 