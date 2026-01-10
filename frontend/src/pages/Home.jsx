import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState({
    articles: 0,
    categories: 0,
    readers: "Growing",
  });

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  // ================= FETCH =================

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
      setStats((prev) => ({
        ...prev,
        categories: Array.isArray(data) ? data.length : 0,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchArticles = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/articles/latest");
    const data = await res.json();

    const articlesArray = Array.isArray(data) ? data : [];

    setArticles(articlesArray.slice(0, 4));
    setStats((prev) => ({
      ...prev,
      articles: articlesArray.length,
    }));
  } catch (err) {
    console.error(err);
  }
};


  // ================= UI =================

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Quality Articles for Your Knowledge</h2>
          <p className="hero-subtitle">
            Discover insightful content across multiple categories. Read, learn,
            and grow with iSource.
          </p>
          <Link to="/categories" className="cta-button">
            Explore Articles
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="categories-section">
        <h2 className="section-title">Featured Categories</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              className="category-card"
            >
              <div className="category-icon">📚</div>
              <h3>{cat.name}</h3>
              <p>{cat.description || "Explore articles in this category"}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="featured-articles">
        <h2 className="section-title">Latest Articles</h2>
        <div className="articles-list">
          {articles.length === 0 ? (
            <p>No articles yet</p>
          ) : (
            articles.map((art) => (
              <article key={art._id} className="article-item">
                <div className="article-meta">
                  <span className="article-date">
                    {new Date(art.createdAt).toDateString()}
                  </span>
<span className="article-category">{art.categorySlug}</span>
                </div>

                <h3 className="article-title">{art.title}</h3>

                <p className="article-excerpt">
                  {art.shortDescription ||
                    art.content?.slice(0, 120) + "..."}
                </p>

                <Link
                  to={`/article/${art.slug}`}
                  className="read-more"
                >
                  Read Article →
                </Link>
              </article>
            ))
          )}
        </div>
      </section>

      {/* About / Stats */}
      <section id="about" className="about-section">
        <div className="about-content">
          <h2 className="section-title">What is iSource?</h2>
          <p>
            iSource is a premium content platform dedicated to delivering
            high-quality articles across diverse categories.
          </p>
          <p>
            Our mission is to create engaging, SEO-friendly content that informs
            and inspires readers worldwide.
          </p>

          <div className="stats">
            <div className="stat-item">
              <h3>{stats.articles}+</h3>
              <p>Articles Published</p>
            </div>
            <div className="stat-item">
              <h3>{stats.readers}</h3>
              <p>Monthly Readers</p>
            </div>
            <div className="stat-item">
              <h3>{stats.categories}</h3>
              <p>Content Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Dive In?</h2>
        <p>Start exploring our vast collection of articles today</p>
        <Link to="/categories" className="cta-button primary">
          Browse All Articles
        </Link>
      </section>
    </div>
  );
}

export default Home;
