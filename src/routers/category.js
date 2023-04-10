import express from "express";
import { createCategory, getCategories, getCategory } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/categories", getCategories)
router.get("/categories/:id", getCategory)
router.post("/categories", checkPermission, createCategory)


export default router