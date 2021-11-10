import app from "../../app";
import supertest, { Response } from "supertest";

interface IUser {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export default async function createNewUser({
  name = "USUARIO TESTE",
  email = "usuario@teste.com.br",
  phone = "(11) 11111-1111",
  password = "teste123",
}: IUser): Promise<Response> {
  const newUser = {
    name,
    email,
    phone,
    password,
  };

  return await supertest(app).post("/users/create").send(newUser);
}
