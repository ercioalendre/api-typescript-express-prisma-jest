import "@components/providers/typeOrmConnection.provider";
import { User } from "@entities/User.entity";
import { IGetOneUserRepository } from "@repositories/users/interfaces/IGetOneUser.repository";
import { IUserUniqueFieldsDto } from "@requirements/dto/users/IUserUniqueFields.dto";
import TypeOrmUserObject from "@database/typeorm/entities/User.typeorm";
import { EntityRepository, getRepository } from "typeorm";

@EntityRepository(TypeOrmUserObject)
class GetOneUserTypeOrmRepository implements IGetOneUserRepository {
  async execute(colunmAndValue: IUserUniqueFieldsDto): Promise<User | undefined> {
    const users = getRepository(TypeOrmUserObject);
    try {
      return await users.findOne({
        where: colunmAndValue,
        // relations: ["SocialMedias"],
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export function getOneUserTypeOrmRepository(): GetOneUserTypeOrmRepository {
  return new GetOneUserTypeOrmRepository();
}
