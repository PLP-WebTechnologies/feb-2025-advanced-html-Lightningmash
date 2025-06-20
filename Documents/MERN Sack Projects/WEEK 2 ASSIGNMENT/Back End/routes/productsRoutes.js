import express from "express";
import {
  getAllProducts,
  getProducts,
  postProducts,
  putProducts,
  deleteProducts,
} from "../controllers/productsControllers.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProducts);
router.post("/", postProducts);
router.put("/:id", putProducts);
router.delete("/:id", deleteProducts);

export default router;
