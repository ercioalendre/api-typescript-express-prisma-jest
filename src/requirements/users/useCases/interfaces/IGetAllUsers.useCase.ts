import { User } from "@entities/User.entity";

export interface IGetAllUsersUseCase {
  execute(): Promise<User[] | null | void>;
}
