// Prisma Client aus lib/prisma.ts importieren (Singleton)
import { prisma } from "@/lib/prisma";

export async function getAllUsers() {
    return prisma.user.findMany()
}

export async function CreateUser(name: string, geburtstag: Date, istVergeben: boolean) {
    return prisma.user.create({
        data: {name, geburtstag, istVergeben}
    })
}

export async function getuserById(id:number) {
    return prisma.user.findUnique({
        where: {id}
    })
}

export async function updateUser(id: number, name: string, geburtstag: Date, istVergeben: boolean){
return prisma.user.update({
    where: {id}, data:{name, geburtstag, istVergeben}
})
}

export async function deleteuser(id: number){
    return prisma.user.delete({
        where: {id}
    })
}

