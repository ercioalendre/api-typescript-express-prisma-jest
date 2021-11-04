import { PrismaClient, User } from "@prisma/client";
import { IGetAllUsersRepository } from "@repositories/users/IGetAllUsers.repository";

export default class GetAllUsersRepository implements IGetAllUsersRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(): Promise<User[] | null> {
    const users = this.prisma.user;
    try {
      return await users.findMany();
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
