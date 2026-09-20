// Alle Routen geschützt – auth() prüft JWT-Session aus Cookie
import { auth } from "@/auth";
import { getAllUsers, CreateUser } from "../../services/user.service"

export async function GET() {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await getAllUsers()
  return Response.json(users)
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json()
  const user = await CreateUser(body.name, new Date(body.geburtstag), body.istVergeben)
  return Response.json(user)
}
