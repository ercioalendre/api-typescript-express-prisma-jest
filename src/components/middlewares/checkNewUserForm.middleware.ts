import { appError } from "@components/errors/AppError";
import { NextFunction, Request, Response } from "express";

export function checkNewUserForm(req: Request, res: Response, next: NextFunction): void {
  let message = "";
  const { name, email, phone, password } = req.body;
  const formData = { name, email, phone, password };
  const inputError: string[] = [];

  const regName = new RegExp("^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,}$");
  const regEmail = new RegExp("^[^@\\s]+@[^@\\s]+\\.+[^@\\s]{2,}$");
  const regPhone = new RegExp("^(?:\\()[0-9]{2}(?:\\))\\s[0-9]{4,5}(?:-)[0-9]{4}$");

  Object.entries(formData).forEach(([key, value]) => {
    if (!value || value == "" || value == undefined) {
      inputError.push(key);
      let keyName;
      if (key === "name") keyName = "nome completo";
      if (key === "email") keyName = "e-mail";
      if (key === "phone") keyName = "telefone";
      if (key === "password") keyName = "senha";
      if (keyName) {
        message = `O campo ${keyName} é obrigatório.`;
      }
    } else {
      if (key === "name") {
        if (!regName.test(value.toUpperCase())) {
          message = "O nome completo inserido é inválido.";
          inputError.push(key);
        }
      }
      if (key === "email") {
        if (!regEmail.test(value)) {
          message = "O endereço de e-mail inserido é inválido.";
          inputError.push(key);
        }
      }
      if (key === "phone") {
        if (!regPhone.test(value)) {
          message = "O número de telefone inserido é inválido.";
          inputError.push(key);
        }
      }
      if (key === "password") {
        if (String(value).length < 6) {
          message = "A senha deve conter seis ou mais caracteres.";
          inputError.push(key);
        }
      }
    }

    message = inputError.length <= 1 ? message : "Um ou mais valores inseridos são inválidos.";

    if (message) {
      throw appError({ message, statusCode: 400, inputError });
    }
  });

  next();
}
