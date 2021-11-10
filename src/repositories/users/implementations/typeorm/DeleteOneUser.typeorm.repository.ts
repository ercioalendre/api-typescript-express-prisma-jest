import { User } from "@entities/User.entity";
import { IDeleteOneUserRepository } from "@repositories/users/interfaces/IDeleteOneUser.repository";
import { IUserUniqueFieldsDto } from "@requirements/dto/users/IUserUniqueFields.dto";
import { getRepository } from "typeorm";
import TypeOrmUserObject from "@database/typeorm/entities/User.typeorm";

class DeleteOneUserTypeOrmRepository implements IDeleteOneUserRepository {
  async execute(id: IUserUniqueFieldsDto): Promise<User | string | null> {
    const usersRepository = getRepository(TypeOrmUserObject);

    try {
      await usersRepository.delete(id);
      return null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export function deleteOneUserTypeOrmRepository(): DeleteOneUserTypeOrmRepository {
  return new DeleteOneUserTypeOrmRepository();
}
