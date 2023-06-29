import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
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
router.get("/getusers", auth, getAllUsers);
router.get("/:key/:value", auth, find, getOne);
router.delete("/:key/:value", auth, find, deleteOne);
router.put("/:key/:value", auth, find, update);

export default router;
