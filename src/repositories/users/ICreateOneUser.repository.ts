import { User as PrismaUserObject } from "@prisma/client";
import IUserDto from "@requirements/dto/users/IUser.dto";

export interface ICreateOneUserRepository {
  execute(data: IUserDto): Promise<PrismaUserObject | null>;
}
