import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createWaste,
  getAllWaste,
  find,
  getListOneUser,
  update,
  deleteOne,
} from "../controllers/waste.controller.js";

const router = Router();

router.post("/new", auth, createWaste);
router.get("/complete-list", auth, getAllWaste);
router.get("/:key/:value", auth, find, getListOneUser);
router.delete("/:key/:value", auth, find, deleteOne);
router.put("/:key/:value", auth, find, update);

export default router;
