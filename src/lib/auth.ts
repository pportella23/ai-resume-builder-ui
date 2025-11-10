// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { DEMO_USER, mockUser } from "./mock-data";

// Use mock mode if NEXT_PUBLIC_USE_MOCK is set to 'true' or if API URL is not configured
// Default to mock mode for easier deployment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK === "true" ||
  !API_BASE_URL ||
  (API_BASE_URL && API_BASE_URL.trim() === "");

export const authOptions = {
  secret:
    process.env.NEXTAUTH_SECRET ||
    process.env.AUTH_SECRET ||
    "mock-secret-for-development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-client-id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "mock-google-client-secret",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "mock-github-id",
      clientSecret: process.env.GITHUB_SECRET || "mock-github-secret",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Mock authentication - accept demo credentials
        // Always check mock credentials first, then fall back to API if configured
        const emailMatch =
          credentials.email.toLowerCase().trim() ===
          DEMO_USER.email.toLowerCase().trim();
        const passwordMatch = credentials.password === DEMO_USER.password;

        if (process.env.NODE_ENV === "development") {
          console.log("Auth attempt:", {
            email: credentials.email,
            emailMatch,
            passwordMatch,
            useMock: USE_MOCK,
            expectedEmail: DEMO_USER.email,
          });
        }

        if (emailMatch && passwordMatch) {
          if (process.env.NODE_ENV === "development") {
            console.log("Demo credentials matched, authenticating...");
          }
          return {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            subscription_status: mockUser.subscription_status,
            accessToken: "mock-access-token",
            refreshToken: "mock-refresh-token",
          } as any;
        }

        // If not demo credentials and not in mock mode, try real API
        if (!USE_MOCK && API_BASE_URL) {
          // Real API authentication
          try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });

            if (!res.ok) return null;
            const data = await res.json();
            if (!data?.data?.user || !data?.data?.accessToken) return null;

            const { user, accessToken, refreshToken } = data.data;
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              subscription_status: user.subscriptionStatus,
              accessToken,
              refreshToken,
            } as any;
          } catch (error) {
            console.error("Auth error:", error);
            return null;
          }
        }

        // If in mock mode and credentials don't match demo, reject
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.subscription_status = user.subscription_status;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id as string;
        session.user.subscription_status = token.subscription_status as string;
        (session as any).accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },
  debug: process.env.NODE_ENV === "development",
};

export const { auth, handlers } = NextAuth(authOptions);
