// Next.js Middleware – läuft VOR jedem Request auf gematchte Routen
// Leitet nicht-eingeloggte User automatisch auf /login um
export { auth as middleware } from "@/auth";

export const config = {
  // Welche Routen geschützt werden sollen
  // Alles AUSSER: api/auth (Login-Endpoints), login-Seite, statische Dateien
  matcher: ["/((?!api/auth|login|_next/static|_next/image|favicon.ico).*)"],
};
