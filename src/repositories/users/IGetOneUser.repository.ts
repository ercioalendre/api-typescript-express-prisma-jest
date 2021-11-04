import { User } from "@entities/User.entity";
import { Prisma } from "@prisma/client";

export interface IGetOneUserRepository {
  execute(colunmAndValue: Prisma.UserWhereUniqueInput): Promise<User | null>;
}
