import "reflect-metadata";
import connection from "@tests/providers/Connection.test";
import createNewUser from "@tests/providers/NewUser.test";
import supertest from "supertest";
import app from "../../app";

beforeAll(async () => {
  await connection.create();
  await connection.clear();
});

afterEach(async () => {
  await connection.clear();
});

afterAll(async () => {
  await connection.clear();
  await connection.close();
});

describe("Create user session test suite", () => {
  it("should create an user session", async () => {
    const user = await createNewUser({});
    expect(user.statusCode).toBe(201);
    expect(user.body).toHaveProperty("id");

    const newUser = {
      email: "usuario@teste.com.br",
      password: "teste123",
    };

    const userLoginData = {
      email: newUser.email,
      password: newUser.password,
    };

    const createNewUserSession = await supertest(app).post("/").send(userLoginData);
    expect(createNewUserSession.statusCode).toBe(200);
  });

  it("should not create an user session: wrong credentials", async () => {
    const user = await createNewUser({});
    expect(user.statusCode).toBe(201);
    expect(user.body).toHaveProperty("id");

    const newUser = {
      email: "usuario@teste.com.br",
      password: "123teste",
    };

    const userLoginData = {
      email: newUser.email,
      password: newUser.password,
    };

    const createNewUserSession = await supertest(app).post("/").send(userLoginData);
    expect(createNewUserSession.statusCode).toBe(401);
  });
});
