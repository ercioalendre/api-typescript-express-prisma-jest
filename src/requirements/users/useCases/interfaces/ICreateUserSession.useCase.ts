import { IUserSessionDto } from "@requirements/dto/users/IUserSession.dto";

export interface ICreateUserSessionUseCase {
  execute(email: string, password: string): Promise<IUserSessionDto>;
}
