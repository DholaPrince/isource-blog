import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

/* ADMIN + FRONTEND */
router.get("/", getCategories);          // GET  /api/categories
router.post("/",adminAuth, createCategory);        // POST /api/categories
router.put("/:id",adminAuth, updateCategory);      // PUT  /api/categories/:id
router.delete("/:id",adminAuth, deleteCategory);   // DELETE /api/categories/:id

export default router;
