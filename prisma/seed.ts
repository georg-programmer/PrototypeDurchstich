import "dotenv/config"
import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import bcrypt from "bcryptjs"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Bestehende Test-User
  await prisma.user.createMany({
    data: [
      { name: "Max Mustermann", geburtstag: new Date("1990-05-15"), istVergeben: true },
      { name: "Anna Schmidt", geburtstag: new Date("1995-08-22"), istVergeben: false },
      { name: "Peter Müller", geburtstag: new Date("1988-03-10"), istVergeben: true },
    ]
  })

  // Test-User mit Login-Daten
  // Passwort wird mit bcrypt gehasht (10 Salt-Runden)
  const hashedPassword = await bcrypt.hash("test1234", 10)

  await prisma.user.upsert({
    where: { email: "admin@test.at" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@test.at",
      password: hashedPassword,
      geburtstag: new Date("2000-01-01"),
      istVergeben: false,
    },
  })

  console.log("Seed abgeschlossen. Login: admin@test.at / test1234")
}

main()
