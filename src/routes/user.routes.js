import { Router } from "express";
import { register } from "../controllers/user.controller.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", register);

export default router;
