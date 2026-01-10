import Article from "../models/Article.js";

// CREATE ARTICLE
export const createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ARTICLES (ADMIN)
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ARTICLES BY CATEGORY (PUBLIC)
export const getArticlesByCategory = async (req, res) => {
  try {
    const articles = await Article.find({
      categorySlug: req.params.slug,
      status: "published",
    }).sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE ARTICLE
export const getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      slug: req.params.slug,
      status: "published",
    });

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getLatestArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(4);

    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ARTICLE
export const updateArticle = async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE ARTICLE
export const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
