import { Request, Response } from "express";
import { appError } from "@components/errors/AppError";
import { validate as uuidValidate } from "uuid";
import { deleteOneUserUseCase } from "@requirements/users/useCases/DeleteOneUser.useCase";
import { IDeleteOneUserUseCase } from "@requirements/users/useCases/interfaces/IDeleteOneUser.useCase";

export class DeleteOneUserController {
  private deleteOneUserUseCase: IDeleteOneUserUseCase;

  constructor() {
    this.deleteOneUserUseCase = deleteOneUserUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;

    if (!id || !uuidValidate(id)) {
      throw appError({
        message: "O ID do usuário que você está tentando excluir é inválido.",
        statusCode: 400,
      });
    }

    const deletedUser = await this.deleteOneUserUseCase.execute({ id });

    return res.status(200).json({
      data: deletedUser,
      code: 200,
      message: "Usuário excluído com sucesso.",
    });
  }
}
