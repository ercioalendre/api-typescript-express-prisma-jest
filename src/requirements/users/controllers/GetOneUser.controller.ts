import { Request, Response } from "express";
import GetOneUserUseCase from "@requirements/users/useCases/GetOneUser.useCase";
import AppError from "@components/errors/AppError";
import { validate as uuidValidate } from "uuid";

export default class GetOneUserController {
  private getOneUserUseCase: GetOneUserUseCase;

  constructor() {
    this.getOneUserUseCase = new GetOneUserUseCase();
  }

  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;

    if (!id || !uuidValidate(id)) {
      throw new AppError({
        message: "O usuário que você está tentando exibir não foi encontrado.",
        statusCode: 400,
      });
    }

    const user = await this.getOneUserUseCase.execute({ id });
    return res.status(200).json(user);
  }
}
