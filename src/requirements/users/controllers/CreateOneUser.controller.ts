import { Request, Response } from "express";
import CreateOneUserUseCase from "@requirements/users/useCases/CreateOneUser.useCase";

export default class CreateOneUserController {
  private createOneUserUseCase: CreateOneUserUseCase;

  constructor() {
    this.createOneUserUseCase = new CreateOneUserUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { name, email, phone, password, facebook, twitter, instagram, youtube, linkedin } =
      req.body;

    const newUser = await this.createOneUserUseCase.execute({
      name,
      email,
      phone,
      password,
      SocialMedias: {
        facebook,
        twitter,
        instagram,
        youtube,
        linkedin,
      },
    });

    return res.status(201).json(newUser);
  }
}
