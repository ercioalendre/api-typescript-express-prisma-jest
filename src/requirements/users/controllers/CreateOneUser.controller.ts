import { Request, Response } from "express";
import { createOneUserUseCase } from "@requirements/users/useCases/CreateOneUser.useCase";
import { ICreateOneUserUseCase } from "../useCases/interfaces/ICreateOneUser.useCase";

export class CreateOneUserController {
  private createOneUserUseCase: ICreateOneUserUseCase;

  constructor() {
    this.createOneUserUseCase = createOneUserUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { name, email, phone, password, SocialMedias } = req.body;

    const newUser = await this.createOneUserUseCase.execute({
      name,
      email,
      phone,
      password,
      SocialMedias,
    });

    return res.status(201).json(newUser);
  }
}
