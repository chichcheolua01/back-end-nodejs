import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.delete("/products/:id", checkPermission, removeProduct);
router.post("/products", checkPermission, createProduct);
router.put("/products/:id", checkPermission, updateProduct);

export default router;
