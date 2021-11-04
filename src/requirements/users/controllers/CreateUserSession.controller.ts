import { Request, Response } from "express";
import CreateUserSessionUseCase from "@requirements/users/useCases/CreateUserSession.useCase";

export default class CreateSysUserSessionController {
  private createUserSessionUseCase: CreateUserSessionUseCase;

  constructor() {
    this.createUserSessionUseCase = new CreateUserSessionUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { email, password } = req.body;

    const session = await this.createUserSessionUseCase.execute(email, password);

    return res.status(200).json(session);
  }
}
