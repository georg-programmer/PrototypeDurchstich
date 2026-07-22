import { getuserById, updateUser, deleteuser } from "../../../services/user.service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await getuserById(Number(params.id))
  return Response.json(user)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const user = await updateUser(Number(params.id), body.name, new Date(body.geburtstag), body.istVergeben)
  return Response.json(user)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await deleteuser(Number(params.id))
  return Response.json({ message: "User gelöscht" })
}
