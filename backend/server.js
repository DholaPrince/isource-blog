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
  res.send("ISource Backend Running");
});

app.use("/api/categories", categoryRoutes);
app.use("/api/articles", articleRoutes);
app.use("/", sitemapRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`
User-agent: *
Allow: /

Sitemap: http://localhost:5000/sitemap.xml
  `);
});

