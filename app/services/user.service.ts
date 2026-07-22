import {PrismaClient} from "../generated/prisma/client"
import {PrismaPg} from "@prisma/adapter-pg"
import {Pool} from "pg"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, ssl:{rejectUnauthorized: false}
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({adapter})

export async function getAllusers() {
    return prisma.user.findMany()
}

export async function CreateUser(name: string, geburtstag: Date, istVergeben: boolean) {
    return prisma.user.create({
        data: {name, geburtstag, istVergeben}
    })
}

