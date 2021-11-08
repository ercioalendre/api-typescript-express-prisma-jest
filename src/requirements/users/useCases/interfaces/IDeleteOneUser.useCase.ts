import { User } from "@entities/User.entity";
import { IUserUniqueFieldsDto } from "@requirements/dto/users/IUserUniqueFields.dto";

export interface IDeleteOneUserUseCase {
  execute(data: IUserUniqueFieldsDto): Promise<User | null | string>;
}
