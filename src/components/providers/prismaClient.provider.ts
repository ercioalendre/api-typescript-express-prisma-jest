import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;
const devPrisma = new PrismaClient();

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient();
} else {
  prismaClient = devPrisma;
}

export default prismaClient;
