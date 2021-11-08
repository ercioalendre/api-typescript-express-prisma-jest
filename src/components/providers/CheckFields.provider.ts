import { appError } from "@components/errors/AppError";

export class CheckFields {
  static inputName(name: string): void | boolean {
    if (name) {
      const regName = new RegExp("^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,}$");

      if (!regName.test(name)) {
        throw appError({ message: "O nome completo inserido é inválido.", statusCode: 422 });
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static inputEmail(email: string): void | boolean {
    if (email) {
      const regEmail = new RegExp("^[^@\\s]+@[^@\\s]+\\.+[^@\\s]{2,}$");

      if (!regEmail.test(email)) {
        throw appError({
          message: "O endereço de e-mail inserido é inválido.",
          statusCode: 422,
        });
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static inputPhone(phone: string): void | boolean {
    if (phone) {
      const regPhone = new RegExp("^(?:\\()[0-9]{2}(?:\\))\\s[0-9]{4,5}(?:-)[0-9]{4}$");

      if (!regPhone.test(phone)) {
        throw appError({
          message: "O número de telefone inserido é inválido.",
          statusCode: 422,
        });
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static inputPassword(password: string): void | boolean {
    if (password) {
      if (password.length < 6) {
        throw appError({
          message: "A senha inserida deve conter seis ou mais caracteres.",
          statusCode: 422,
        });
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
