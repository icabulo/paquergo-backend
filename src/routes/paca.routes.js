import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createPaca,
  getAllPaca,
  find,
  getListOneUser,
  update,
  deleteOne,
} from "../controllers/paca.controller.js";

const router = Router();

router.post("/new", auth, createPaca);
router.get("/complete-list", auth, getAllPaca);
router.get("/:key/:value", auth, find, getListOneUser);
router.delete("/:key/:value", auth, find, deleteOne);
router.put("/:key/:value", auth, find, update);

export default router;
