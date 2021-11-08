import { User } from "@entities/User.entity";
import { IUserUniqueFieldsDto } from "@requirements/dto/users/IUserUniqueFields.dto";

export interface IDeleteOneUserRepository {
  execute(id: IUserUniqueFieldsDto): Promise<User | string | null>;
}
