import jwt, { ITokenPayLoad } from "@requirements/dto/users/IJwt.dto";
import GetOneUserRepository from "@repositories/users/implementations/prisma/GetOneUser.repository";
import AppError from "src/components/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const headerAuth = req.headers.authorization || "";
  const [, token] = headerAuth.split(" ");

  if (!token) {
    throw new AppError({ message: "Token is missing.", statusCode: 401 });
  }

  const invalidToken = { message: "Invalid token.", statusCode: 401 };

  try {
    const decodedToken = verify(token, jwt.secret);
    const { sub, name, type } = decodedToken as ITokenPayLoad;

    const isUser = Object.create(await new GetOneUserRepository().execute({ id: sub }));

    if (!isUser) {
      throw new AppError(invalidToken);
    }

    const firstName = name.split(" ")[0];

    res.locals.user = {
      id: sub,
      name: firstName,
      type,
    };

    return next();
  } catch {
    throw new AppError(invalidToken);
  }
}
