import { Router } from "express";
import {
  register,
  getAllUsers,
  find,
  getOne,
  update,
  deleteOne,
} from "../controllers/user.controller.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", register);
router.get("/getusers", getAllUsers);
router.get("/:key/:value", find, getOne);
router.delete("/:key/:value", find, deleteOne);
router.put("/:key/:value", find, update);

export default router;
