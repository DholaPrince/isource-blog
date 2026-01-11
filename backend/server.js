import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import "./utils/autoDelete.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import sitemapRoutes from "./routes/sitemapRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ISource Backend Running 🚀");
});

// API routes
app.use("/api/categories", categoryRoutes);
app.use("/api/articles", articleRoutes);

// Sitemap
app.use("/", sitemapRoutes);

// Robots.txt (dynamic for production)
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`
User-agent: *
Allow: /

Sitemap: ${process.env.BASE_URL}/sitemap.xml
  `);
});

// ✅ IMPORTANT: export app (NO app.listen)
export default app;
