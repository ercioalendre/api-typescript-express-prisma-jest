import { getRepository } from "typeorm";
import TypeOrmUserObject from "@database/typeorm/entities/User.typeorm";
import { IGetAllUsersRepository } from "@repositories/users/interfaces/IGetAllUsers.repository";
import { User } from "@entities/User.entity";

class GetAllUsersTypeOrmRepository implements IGetAllUsersRepository {
  async execute(): Promise<User[] | null> {
    const usersRepository = getRepository(TypeOrmUserObject);

    try {
      return await usersRepository.find();
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export function getAllUsersTypeOrmRepository(): GetAllUsersTypeOrmRepository {
  return new GetAllUsersTypeOrmRepository();
}
