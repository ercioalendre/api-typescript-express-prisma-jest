import { Request, Response } from "express";
import CreateUserService from "@modules/users/services/CreateUser.service";

export default class CreateUserController {
  static async execute(req: Request, res: Response): Promise<Response | undefined> {
    const { full_name, email, phone, password } = req.body;

    const createNewUser = await CreateUserService.execute({
      full_name,
      email,
      phone,
      password,
    });

    return res.status(201).json(createNewUser);
  }
}
