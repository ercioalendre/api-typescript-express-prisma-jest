import { prismaClient } from "@components/providers/prismaClient.provider";
import { createConnection, getConnection } from "typeorm";

const dbProvider = process.env.DATABASE_PROVIDER || "";

export default {
  async create(): Promise<void> {
    if (dbProvider === "typeorm") {
      await createConnection();
    }
  },

  async close(): Promise<void> {
    if (dbProvider === "typeorm") {
      await getConnection().close();
    }
  },

  async clear(): Promise<void> {
    if (dbProvider === "typeorm") {
      const entities = getConnection().entityMetadatas;

      for (const entity of entities) {
        const repository = getConnection().getRepository(entity.name);
        await repository.createQueryBuilder().delete().from("User").execute();
      }
    } else if (dbProvider === "prisma") {
      const prisma = prismaClient;
      const deleteUsers = prisma.user.deleteMany();
      await prisma.$transaction([deleteUsers]);
    }
  },
};
