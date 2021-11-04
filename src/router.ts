import express from "express";
import UsersRoutes from "@requirements/users/routers/Users.router";

const Router = express.Router();

Router.use("/", UsersRoutes);
Router.use(express.static("public"));
Router.get("*", (req, res) => {
  res.status(404).json("Oops! Page not found.");
});

export default Router;
