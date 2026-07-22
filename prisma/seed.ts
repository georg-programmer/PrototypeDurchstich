import "dotenv/config"
import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "Max Mustermann", geburtstag: new Date("1990-05-15"), istVergeben: true },
      { name: "Anna Schmidt", geburtstag: new Date("1995-08-22"), istVergeben: false },
      { name: "Peter Müller", geburtstag: new Date("1988-03-10"), istVergeben: true },
    ]
  })
}

main()
