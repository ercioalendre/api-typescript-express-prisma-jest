import { Request, Response } from "express";
import { createUserSessionUseCase } from "@requirements/users/useCases/CreateUserSession.useCase";
import { ICreateUserSessionUseCase } from "../useCases/interfaces/ICreateUserSession.useCase";

export class CreateUserSessionController {
  private createUserSessionUseCase: ICreateUserSessionUseCase;

  constructor() {
    this.createUserSessionUseCase = createUserSessionUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { email, password } = req.body;

    const session = await this.createUserSessionUseCase.execute(email, password);

    return res.status(200).json(session);
  }
}
