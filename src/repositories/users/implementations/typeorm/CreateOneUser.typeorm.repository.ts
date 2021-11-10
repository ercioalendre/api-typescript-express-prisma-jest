import "@components/providers/typeOrmConnection.provider";
import { User } from "@entities/User.entity";
import { ICreateOneUserRepository } from "@repositories/users/interfaces/ICreateOneUser.repository";
import { IUserDto } from "@requirements/dto/users/IUser.dto";
import TypeOrmUserObject from "@database/typeorm/entities/User.typeorm";
import { EntityRepository, getRepository } from "typeorm";

@EntityRepository(TypeOrmUserObject)
class CreateOneUserTypeOrmRepository implements ICreateOneUserRepository {
  async execute(data: IUserDto): Promise<TypeOrmUserObject | null> {
    const usersRepository = getRepository(TypeOrmUserObject);
    const user = new User(data);

    try {
      return await usersRepository.save(user);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export function createOneUserTypeOrmRepository(): CreateOneUserTypeOrmRepository {
  return new CreateOneUserTypeOrmRepository();
}
