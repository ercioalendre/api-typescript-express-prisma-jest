import { prismaClient } from "@components/providers/prismaClient.provider";
import { User } from "@entities/User.entity";
import { PrismaClient } from "@prisma/client";
import { ICreateOneUserRepository } from "@repositories/users/interfaces/ICreateOneUser.repository";
import { IUserDto } from "@requirements/dto/users/IUser.dto";

class CreateOneUserRepository implements ICreateOneUserRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async execute(data: IUserDto): Promise<User | null> {
    const users = this.prisma.user;
    const user = new User(data);

    const { SocialMedias, ...userWithoutSocialMedias } = user;

    const createSocialMedias = {
      SocialMedias: { create: SocialMedias },
    };

    const userData = Object.assign(userWithoutSocialMedias, createSocialMedias);

    try {
      return (await users.create({
        data: userData,
        include: { SocialMedias: true },
      })) as User;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export function createOneUserRepository(): CreateOneUserRepository {
  return new CreateOneUserRepository();
}
