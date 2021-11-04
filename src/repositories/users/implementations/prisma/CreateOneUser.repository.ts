import prismaClient from "@components/providers/prismaClient.provider";
import { User } from "@entities/User.entity";
import { PrismaClient, User as PrismaUserObject } from "@prisma/client";
import { ICreateOneUserRepository } from "@repositories/users/ICreateOneUser.repository";
import IUserDto from "@requirements/dto/users/IUser.dto";

export default class CreateOneUserRepository implements ICreateOneUserRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async execute(data: IUserDto): Promise<PrismaUserObject | null> {
    const users = this.prisma.user;
    const user = new User(data);

    const { SocialMedias, ...userWithoutSocialMedias } = user;

    const createSocialMedias = {
      SocialMedias: { create: SocialMedias },
    };

    const userData = Object.assign(userWithoutSocialMedias, createSocialMedias);

    try {
      return await users.create({
        data: userData,
        include: { SocialMedias: true },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
