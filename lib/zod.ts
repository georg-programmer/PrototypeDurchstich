import { object, string } from "zod";

// Validierungsschema für Login-Daten
// Stellt sicher, dass Email und Passwort vorhanden und gültig sind
export const signInSchema = object({
  email: string().min(1, "Email is required"),
  password: string()
    .min(1, "Password is required")
    .max(32, "Password must be less than 32 characters"),
});
