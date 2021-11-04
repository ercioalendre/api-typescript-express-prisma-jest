import { User } from "@entities/User.entity";
import IUserUniqueFieldsDto from "@requirements/dto/users/IUserUniqueFields.dto";

export interface IGetOneUserRepository {
  execute(colunmAndValue: IUserUniqueFieldsDto): Promise<User | null>;
}
