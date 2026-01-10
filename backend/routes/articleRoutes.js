import express from "express";
import {
  createArticle,
  getAllArticles,
  getLatestArticles,
  getArticlesByCategory,
  getSingleArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

/* ========== ADMIN ROUTES ========== */
router.post("/",adminAuth, createArticle);          // POST /api/articles
router.get("/",adminAuth, getAllArticles);           // GET  /api/articles
router.put("/:id",adminAuth, updateArticle);         // PUT  /api/articles/:id
router.delete("/:id",adminAuth, deleteArticle);      // DELETE /api/articles/:id

/* ========== FRONTEND ROUTES ========== */
router.get("/latest", getLatestArticles);
router.get("/category/:slug", getArticlesByCategory); // GET /api/articles/category/:slug
router.get("/:slug", getSingleArticle);               // GET /api/articles/:slug

export default router;
