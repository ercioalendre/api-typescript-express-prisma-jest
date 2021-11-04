import { Request, Response } from "express";
import AppError from "@components/errors/AppError";
import { validate as uuidValidate } from "uuid";
import DeleteOneUserUseCase from "@requirements/users/useCases/DeleteOneUser.useCase";

export default class DeleteOneUserController {
  private deleteOneUserUseCase: DeleteOneUserUseCase;

  constructor() {
    this.deleteOneUserUseCase = new DeleteOneUserUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;

    if (!id || !uuidValidate(id)) {
      throw new AppError({
        message: "O ID do usuário que você está tentando excluir é inválido.",
        statusCode: 400,
      });
    }

    const createNewUser = await this.deleteOneUserUseCase.execute({ id });

    return res.status(201).json(createNewUser);
  }
}
