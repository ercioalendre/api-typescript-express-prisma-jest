import { User } from "@entities/User.entity";

export interface IGetAllUsersRepository {
  execute(): Promise<User[] | null>;
}
