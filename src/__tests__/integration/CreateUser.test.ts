import "reflect-metadata";
import connection from "@tests/providers/Connection.test";
import createNewUser from "@tests/providers/NewUser.test";
import { getAllUsersRepository } from "@requirements/users/implementations";

beforeAll(async () => {
  await connection.create();
  // await connection.clear();
});

afterEach(async () => {
  // await connection.clear();
});

afterAll(async () => {
  // await connection.clear();
  await connection.close();
});

jest.setTimeout(100000);

describe("Create user test suite", () => {
  it("should create a new user", async () => {
    const data = await createNewUser({});
    expect(data.statusCode).toBe(201);
    expect(data.body).toHaveProperty("id");
  });

  it("should get all users", async () => {
    const users = await getAllUsersRepository.execute();

    expect(users?.length).toBeGreaterThan(1);
  });

  it("should not create a new user: email address already exists", async () => {
    const userOne = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    await createNewUser(userOne);

    const userTwo = {
      name: "TESTE USUARIO",
      email: "usuario@teste.com.br",
      phone: "(22) 22222-2222",
      password: "123teste",
    };

    await createNewUser(userTwo).then(createUser => {
      expect(createUser.statusCode).toBe(409);
      expect(createUser.body).toStrictEqual({
        message: "Este endereço de e-mail já está cadastrado.",
        status: "error",
      });
    });
  });

  it("should not create a new user: phone number already exists", async () => {
    const userOne = {
      name: "USUARIO TESTE",
      email: "usuario@teste.com.br",
      phone: "(11) 11111-1111",
      password: "teste123",
    };

    await createNewUser(userOne);

    const userTwo = {
      name: "TESTE USUARIO",
      email: "teste@usuario.com.br",
      phone: "(11) 11111-1111",
      password: "123teste",
    };

    await createNewUser(userTwo).then(createUser => {
      expect(createUser.statusCode).toBe(409);
      expect(createUser.body).toStrictEqual({
        message: "Este número de telefone já está cadastrado.",
        status: "error",
      });
    });
  });
});
