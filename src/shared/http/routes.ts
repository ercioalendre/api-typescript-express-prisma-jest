import express from "express";
import usersRoutes from "@modules/users/routes/Users.routes";

const router = express.Router();

router.use("/", usersRoutes);
router.use(express.static("public"));
router.get("*", (req, res) => {
  res.status(404).json("Oops! Page not found.");
});

export default router;
