import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    inferAdditionalFields<{
      role: string;
      tokens: number;
      industry?: string;
      company?: string;
    }>(),
  ],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
} = authClient;
