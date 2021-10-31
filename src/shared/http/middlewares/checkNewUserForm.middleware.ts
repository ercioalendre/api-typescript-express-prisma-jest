import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export default function checkNewUserForm(req: Request, res: Response, next: NextFunction): void {
  let message = "";
  const { customer_id, full_name, email, phone, access_level, password } = req.body;
  const formData = { customer_id, full_name, email, phone, access_level, password };
  const inputError: string[] = [];
  const regCustomerId = new RegExp(
    "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$",
  );
  const regName = new RegExp("^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,}$");
  const regEmail = new RegExp("^[^@\\s]+@[^@\\s]+\\.+[^@\\s]{2,}$");
  const regPhone = new RegExp("^(?:\\()[0-9]{2}(?:\\))\\s[0-9]{4,5}(?:-)[0-9]{4}$");

  Object.entries(formData).forEach(([key, value]) => {
    if (!value || value == "" || value == undefined) {
      inputError.push(key);
      let keyName;
      if (key === "full_name") keyName = "nome completo";
      if (key === "email") keyName = "e-mail";
      if (key === "phone") keyName = "telefone";
      if (key === "access_level") keyName = "nível de acesso";
      if (key === "password") keyName = "senha";
      if (keyName) {
        message = `O campo ${keyName} é obrigatório.`;
      }
    } else {
      if (key === "customer_id") {
        if (!regCustomerId.test(value)) {
          message = "O ID do cliente inserido é inválido.";
          inputError.push(key);
        }
      }
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
      if (key === "access_level") {
        if (String(value).length > 1) {
          message = "O nível de acesso deve conter apenas um número.";
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
      throw new AppError({ message, statusCode: 400, inputError });
    }
  });

  next();
}
