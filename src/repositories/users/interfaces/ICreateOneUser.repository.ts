import { User } from "@entities/User.entity";
import { IUserDto } from "@requirements/dto/users/IUser.dto";

export interface ICreateOneUserRepository {
  execute(data: IUserDto): Promise<User | null>;
}
