import { Request, Response } from "express";
import { getAllUsersUseCase } from "@requirements/users/useCases/GetAllUsers.useCase";
import { IGetAllUsersUseCase } from "@requirements/users/useCases/interfaces/IGetAllUsers.useCase";

export class GetAllUsersController {
  private getAllUsersUseCase: IGetAllUsersUseCase;

  constructor() {
    this.getAllUsersUseCase = getAllUsersUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const users = await this.getAllUsersUseCase.execute();
    return res.status(200).json(users);
  }
}
