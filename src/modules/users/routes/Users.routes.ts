import { Router } from "express";
import checkNewUserForm from "@shared/http/middlewares/checkNewUserForm.middleware";
import CreateUserController from "@modules/users/controllers/CreateUser.controller";
import CreateUserSessionController from "@modules/users/controllers/CreateUserSession.controller";
import checkLoginUserForm from "@shared/http/middlewares/checkLoginUserForm.middleware";

const UsersRoutes = Router();

UsersRoutes.post("/", checkLoginUserForm, CreateUserSessionController.execute);
UsersRoutes.post("/users/create", checkNewUserForm, CreateUserController.execute);

export default UsersRoutes;
