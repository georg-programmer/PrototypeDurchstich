import {getAllusers} from "../../services/user.service"

export async function GET(){
     console.log("DATABASE_URL:", process.env.DATABASE_URL)
    const users = await getAllusers()
    return Response.json(users)
}