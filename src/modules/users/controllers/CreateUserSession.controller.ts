import { Request, Response } from "express";
import CreateUserSessionService from "@modules/users/services/CreateUserSession.service";

export default class CreateSysUserSessionController {
  static async execute(req: Request, res: Response): Promise<Response | undefined> {
    const { email, password } = req.body;

    const session = await CreateUserSessionService.execute(email, password);

    return res.status(200).json(session);
  }
}
