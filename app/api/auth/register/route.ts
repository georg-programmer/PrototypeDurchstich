// POST /api/auth/register – kein Auth nötig
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { object, string } from "zod";

const registerSchema = object({
  name: string().min(1, "Name is required"),
  email: string().email("Invalid email"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // geburtstag/istVergeben sind Platzhalter – werden bei Registrierung nicht abgefragt
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        geburtstag: new Date(),
        istVergeben: false,
      },
    });

    // Nie das gehashte Passwort zurückgeben
    return Response.json(
      { id: user.id, name: user.name, email: user.email },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
