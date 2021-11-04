import { Router } from "express";
import checkNewUserForm from "@components/middlewares/checkNewUserForm.middleware";
import CreateOneUserController from "@requirements/users/controllers/CreateOneUser.controller";
import CreateUserSessionController from "@requirements/users/controllers/CreateUserSession.controller";
import checkLoginUserForm from "@components/middlewares/checkLoginUserForm.middleware";
import UpdateOneUserController from "@requirements/users/controllers/UpdateOneUser.controller";
import isAuthenticated from "@components/middlewares/isAuthenticated.middleware";
import GetAllUsersController from "../controllers/GetAllUsers.controller";

const UsersRouter = Router();

UsersRouter.post("/", checkLoginUserForm, (request, response) => {
  return new CreateUserSessionController().handle(request, response);
});

UsersRouter.get("/users/list", isAuthenticated, (request, response) => {
  return new GetAllUsersController().handle(request, response);
});

UsersRouter.post("/users/create", checkNewUserForm, (request, response) => {
  return new CreateOneUserController().handle(request, response);
});

UsersRouter.put("/users/update", isAuthenticated, (request, response) => {
  return new UpdateOneUserController().handle(request, response);
});

export default UsersRouter;
