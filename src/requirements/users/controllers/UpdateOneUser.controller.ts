import { Request, Response } from "express";
import { updateOneUserUseCase } from "@requirements/users/useCases/UpdateOneUser.useCase";
import { appError } from "@components/errors/AppError";
import { validate as uuidValidate } from "uuid";
import { IUpdateOneUserUseCase } from "../useCases/interfaces/IUpdateOneUser.useCase";

export class UpdateOneUserController {
  private updateOneUserUseCase: IUpdateOneUserUseCase;

  constructor() {
    this.updateOneUserUseCase = updateOneUserUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id, name, email, phone, password } = req.body;

    if (!id || !uuidValidate(id)) {
      throw appError({
        message: "O ID do usuário que você está tentando editar é inválido.",
        statusCode: 400,
      });
    }

    const updatedUser = await this.updateOneUserUseCase.execute({
      id,
      name,
      email,
      phone,
      password,
    });

    return res.status(201).json(updatedUser);
  }
}
