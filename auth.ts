import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signInSchema } from "@/lib/zod";

// NextAuth v5 Konfiguration
// Exportiert: handlers (API Route), auth (Session prüfen), signIn/signOut (Actions)
export const { handlers, auth, signIn, signOut } = NextAuth({
  // JWT-basierte Sessions (kein DB-Session-Speicher nötig)
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Prüft ob ein User eingeloggt ist (für geschützte Routen)
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },

  // Credentials Provider = Login mit Email + Passwort
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // authorize() wird bei jedem Login-Versuch aufgerufen
      // Gibt User-Objekt zurück wenn Login erfolgreich, sonst null
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Eingabe validieren mit Zod
        const { email, password } = await signInSchema.parseAsync(credentials);

        // User in DB suchen
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        // Passwort mit bcrypt vergleichen (gehashtes PW in DB vs. Klartext-Eingabe)
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        // User-Objekt wird in der JWT-Session gespeichert
        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  // Custom Login-Seite statt der Standard NextAuth-Seite
  pages: {
    signIn: "/login",
  },
});
