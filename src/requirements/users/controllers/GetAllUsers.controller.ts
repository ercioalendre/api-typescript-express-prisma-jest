import { Request, Response } from "express";
import GetAllUsersUseCase from "@requirements/users/useCases/GetAllUsers.useCase";

export default class GetAllUsersController {
  private getAllUsersUseCase: GetAllUsersUseCase;

  constructor() {
    this.getAllUsersUseCase = new GetAllUsersUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const users = await this.getAllUsersUseCase.execute();
    return res.status(200).json(users);
  }
}
