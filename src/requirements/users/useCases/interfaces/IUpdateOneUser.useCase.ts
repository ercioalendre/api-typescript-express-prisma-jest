import { User } from "@entities/User.entity";
import { IUserDto } from "@requirements/dto/users/IUser.dto";

export interface IUpdateOneUserUseCase {
  execute(data: IUserDto): Promise<User | null | undefined>;
}
