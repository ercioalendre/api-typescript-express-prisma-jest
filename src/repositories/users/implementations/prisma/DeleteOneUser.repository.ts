import prismaClient from "@components/providers/prismaClient.provider";
import { User } from "@entities/User.entity";
import { PrismaClient } from "@prisma/client";
import { IDeleteOneUserRepository } from "@repositories/users/IDeleteOneUser.repository";
import IUserUniqueFieldsDto from "@requirements/dto/users/IUserUniqueFields.dto";

export default class DeleteOneUserRepository implements IDeleteOneUserRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async execute(id: IUserUniqueFieldsDto): Promise<User | string | null> {
    const users = this.prisma.user;

    try {
      await users.delete({
        where: id,
      });
      return "Usuário excluído com sucesso!";
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
