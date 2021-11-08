import { PrismaClient } from "@prisma/client";

export let prismaClient: PrismaClient;
const devPrisma = new PrismaClient();

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient();
} else {
  prismaClient = devPrisma;
}
