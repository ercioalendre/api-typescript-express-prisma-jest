import { User } from "@entities/User.entity";
import { IUserUniqueFieldsDto } from "@requirements/dto/users/IUserUniqueFields.dto";

export interface IGetOneUserUseCase {
  execute(id: IUserUniqueFieldsDto): Promise<User | null | void>;
}
