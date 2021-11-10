import { prismaClient } from "@components/providers/prismaClient.provider";
import { User } from "@entities/User.entity";
import { PrismaClient } from "@prisma/client";
import { IUpdateOneUserRepository } from "@repositories/users/interfaces/IUpdateOneUser.repository";
import { IUserDto } from "@requirements/dto/users/IUser.dto";

class UpdateOneUserPrismaRepository implements IUpdateOneUserRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  async execute(data: IUserDto): Promise<User | null> {
    const users = this.prisma.user;

    const { SocialMedias, ...userWithoutSocialMedias } = data;

    const createSocialMedias = {
      SocialMedias: { update: SocialMedias },
    };

    const userData = Object.assign(userWithoutSocialMedias, createSocialMedias);

    try {
      return (await users.update({
        where: {
          id: data.id,
        },
        data: userData,
        include: {
          SocialMedias: true,
        },
      })) as User;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export function updateOneUserPrismaRepository(): UpdateOneUserPrismaRepository {
  return new UpdateOneUserPrismaRepository();
}
