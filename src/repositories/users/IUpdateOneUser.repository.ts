import { User } from "@entities/User.entity";
import IUserDto from "@requirements/dto/users/IUser.dto";

export interface IUpdateOneUserRepository {
  execute(data: IUserDto): Promise<User | null>;
}
