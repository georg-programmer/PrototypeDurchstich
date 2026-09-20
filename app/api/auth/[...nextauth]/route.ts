// NextAuth Catch-All API Route
// Handled automatisch alle Auth-Endpoints:
//   POST /api/auth/signin     → Login
//   POST /api/auth/signout    → Logout
//   GET  /api/auth/session    → Session abfragen
//   GET  /api/auth/csrf       → CSRF Token
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
