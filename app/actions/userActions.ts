"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  return await prisma.user.findMany({});
}
export async function addUser(name: string, email: string) {
  return await prisma.user.create({
    data: { name, email },
  });
}
