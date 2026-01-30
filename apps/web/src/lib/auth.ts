import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@aitools/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "user",
      },
      tokens: {
        type: "number",
        default: 0,
      },
      industry: {
        type: "string",
        nullable: true,
      },
      company: {
        type: "string",
        nullable: true,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});
