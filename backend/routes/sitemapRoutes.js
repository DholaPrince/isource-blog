import express from "express";
import Article from "../models/Article.js";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl = "http://localhost:5173"; // change to domain later

    const articles = await Article.find({}, "slug updatedAt");
    const categories = await Category.find({}, "slug");

    let urls = "";

    // Static pages
    urls += `
      <url>
        <loc>${baseUrl}/</loc>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/categories</loc>
        <priority>0.8</priority>
      </url>
    `;

    // Category pages
    categories.forEach(cat => {
      urls += `
        <url>
          <loc>${baseUrl}/category/${cat.slug}</loc>
          <priority>0.7</priority>
        </url>
      `;
    });

    // Article pages
    articles.forEach(article => {
      urls += `
        <url>
          <loc>${baseUrl}/article/${article.slug}</loc>
          <lastmod>${article.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>
          <priority>0.9</priority>
        </url>
      `;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
      </urlset>
    `;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    res.status(500).send("Error generating sitemap");
  }
});

export default router;
