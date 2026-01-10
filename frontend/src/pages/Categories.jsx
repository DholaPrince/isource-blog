"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategories } from "../services/api"
import "../styles/Categories.css"

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((data) => setCategories(data))
  }, [])

  return (
    <main className="categories-container">
      <header className="categories-header">
        <h1>Explore Categories</h1>
        <p>Discover articles across diverse topics and interests</p>
      </header>

      {categories.length === 0 ? (
        <section className="no-categories">
          <p>No categories found. Check back soon for new content.</p>
        </section>
      ) : (
        <section className="categories-grid">
          {categories.map((cat) => (
            <article key={cat._id} className="category-card">
              <div className="category-icon">{cat.name.charAt(0).toUpperCase()}</div>
              <div className="category-content">
                <h2>
                  <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                </h2>
                <p className="category-description">Explore all articles in {cat.name}</p>
              </div>
              <div className="category-arrow">→</div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default Categories
