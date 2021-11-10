import "@components/providers/typeOrmConnection.provider";
import { ICreateOneUserRepository } from "@repositories/users/interfaces/ICreateOneUser.repository";
import { IUserDto } from "@requirements/dto/users/IUser.dto";
import TypeOrmUserObject from "@database/typeorm/entities/User.typeorm";
import { EntityRepository, getRepository } from "typeorm";

@EntityRepository(TypeOrmUserObject)
class UpdateOneUserTypeOrmRepository implements ICreateOneUserRepository {
  async execute(data: IUserDto): Promise<TypeOrmUserObject | null> {
    const usersRepository = getRepository(TypeOrmUserObject);

    try {
      return await usersRepository.save(data);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export function updateOneUserTypeOrmRepository(): UpdateOneUserTypeOrmRepository {
  return new UpdateOneUserTypeOrmRepository();
}
