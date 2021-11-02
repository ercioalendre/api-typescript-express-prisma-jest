import express from "express";
import usersRoutes from "@modules/users/routes/Users.routes";

const Router = express.Router();

Router.use("/", usersRoutes);
Router.use(express.static("public"));
Router.get("*", (req, res) => {
  res.status(404).json("Oops! Page not found.");
});

export default Router;
