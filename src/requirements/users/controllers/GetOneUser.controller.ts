import { Request, Response } from "express";
import { getOneUserUseCase } from "@requirements/users/useCases/GetOneUser.useCase";
import { appError } from "@components/errors/AppError";
import { validate as uuidValidate } from "uuid";
import { IGetOneUserUseCase } from "@requirements/users/useCases/interfaces/IGetOneUser.useCase";

export class GetOneUserController {
  private getOneUserUseCase: IGetOneUserUseCase;

  constructor() {
    this.getOneUserUseCase = getOneUserUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;

    if (!id || !uuidValidate(id)) {
      throw appError({
        message: "O usuário que você está tentando exibir não foi encontrado.",
        statusCode: 400,
      });
    }

    const user = await this.getOneUserUseCase.execute({ id });
    return res.status(200).json(user);
  }
}
