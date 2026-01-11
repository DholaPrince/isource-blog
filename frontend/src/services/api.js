const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// Fetch all categories
export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};

// Fetch articles by category
export const getArticlesByCategory = async (slug) => {
  const res = await fetch(`${BASE_URL}/articles/category/${slug}`);
  return res.json();
};

// Fetch single article
export const getSingleArticle = async (slug) => {
  const res = await fetch(`${BASE_URL}/articles/${slug}`);
  return res.json();
};
