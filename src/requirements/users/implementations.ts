import { getOneUserPrismaRepository } from "@repositories/users/implementations/prisma/GetOneUser.prisma.repository";
import { deleteOneUserPrismaRepository } from "@repositories/users/implementations/prisma/DeleteOneUser.prisma.repository";
import { deleteOneUserTypeOrmRepository } from "@repositories/users/implementations/typeorm/DeleteOneUser.typeorm.repository";
import { getOneUserTypeOrmRepository } from "@repositories/users/implementations/typeorm/GetOneUser.typeorm.repository";
import { createOneUserPrismaRepository } from "@repositories/users/implementations/prisma/CreateOneUser.prisma.repository";
import { createOneUserTypeOrmRepository } from "@repositories/users/implementations/typeorm/CreateOneUser.typeorm.repository";
import { getAllUsersTypeOrmRepository } from "@repositories/users/implementations/typeorm/GetAllUsers.typeorm.repository";
import { getAllUsersPrismaRepository } from "@repositories/users/implementations/prisma/GetAllUsers.prisma.repository";
import { updateOneUserTypeOrmRepository } from "@repositories/users/implementations/typeorm/UpdateOneUser.typeorm.repository";
import { updateOneUserPrismaRepository } from "@repositories/users/implementations/prisma/UpdateOneUser.prisma.repository";
import { IGetOneUserRepository } from "@repositories/users/interfaces/IGetOneUser.repository";
import { IGetAllUsersRepository } from "@repositories/users/interfaces/IGetAllUsers.repository";
import { ICreateOneUserRepository } from "@repositories/users/interfaces/ICreateOneUser.repository";
import { IUpdateOneUserRepository } from "@repositories/users/interfaces/IUpdateOneUser.repository";
import { IDeleteOneUserRepository } from "@repositories/users/interfaces/IDeleteOneUser.repository";

const databaseProvider = process.env.DATABASE_PROVIDER || "prisma";

console.log(databaseProvider);

export const getOneUserRepository = (
  databaseProvider === "prisma" ? getOneUserPrismaRepository() : getOneUserTypeOrmRepository()
) as IGetOneUserRepository;

export const getAllUsersRepository = (
  databaseProvider === "prisma" ? getAllUsersPrismaRepository() : getAllUsersTypeOrmRepository()
) as IGetAllUsersRepository;

export const createOneUserRepository = (
  databaseProvider === "prisma" ? createOneUserPrismaRepository() : createOneUserTypeOrmRepository()
) as ICreateOneUserRepository;

export const updateOneUserRepository = (
  databaseProvider === "prisma" ? updateOneUserPrismaRepository() : updateOneUserTypeOrmRepository()
) as IUpdateOneUserRepository;

export const deleteOneUserRepository =
  databaseProvider === "prisma"
    ? deleteOneUserPrismaRepository()
    : (deleteOneUserTypeOrmRepository() as IDeleteOneUserRepository);
