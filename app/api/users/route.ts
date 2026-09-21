import { getAllUsers, CreateUser } from "../../services/user.service"

export async function GET() {
  const users = await getAllUsers()
  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await CreateUser(body.name, new Date(body.geburtstag), body.istVergeben)
  return Response.json(user)
}
