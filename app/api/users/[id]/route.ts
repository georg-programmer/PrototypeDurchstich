import { getuserById, updateUser, deleteuser } from "../../../services/user.service"

export const runtime = 'nodejs'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getuserById(Number(id))
  return Response.json(user)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const user = await updateUser(Number(id), body.name, new Date(body.geburtstag), body.istVergeben)
  return Response.json(user)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await deleteuser(Number(id))
  return Response.json({ message: "User gelöscht" })
}
