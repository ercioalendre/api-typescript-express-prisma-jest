import { Request, Response } from "express";
import UpdateOneUserUseCase from "@requirements/users/useCases/UpdateOneUser.useCase";
import AppError from "@components/errors/AppError";
import { validate as uuidValidate } from "uuid";

export default class UpdateOneUserController {
  private updateOneUserUseCase: UpdateOneUserUseCase;

  constructor() {
    this.updateOneUserUseCase = new UpdateOneUserUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id, name, email, phone, password } = req.body;

    if (!id || !uuidValidate(id)) {
      throw new AppError({
        message: "O ID do usuário que você está tentando editar é inválido.",
        statusCode: 400,
      });
    }

    const createNewUser = await this.updateOneUserUseCase.execute({
      id,
      name,
      email,
      phone,
      password,
    });

    return res.status(201).json(createNewUser);
  }
}
