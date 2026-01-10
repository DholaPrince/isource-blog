"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import AdBlock from "../components/AdBlock"
import "../styles/CategoryArticles.css"

const updateMeta = (name, content) => {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute("name", name)
    document.head.appendChild(tag)
  }
  tag.setAttribute("content", content)
}

const updateProperty = (property, content) => {
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute("property", property)
    document.head.appendChild(tag)
  }
  tag.setAttribute("content", content)
}

const updateCanonical = (url) => {
  let link = document.querySelector("link[rel='canonical']")
  if (!link) {
    link = document.createElement("link")
    link.setAttribute("rel", "canonical")
    document.head.appendChild(link)
  }
  link.setAttribute("href", url)
}

const calculateReadingTime = (content) => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return readingTime
}

const formatDate = (dateString) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  const options = { year: "numeric", month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

const CategoryArticles = () => {
  const { slug } = useParams()
  const [articles, setArticles] = useState([])

  /* ------------------ SEO Meta Handling ------------------ */
  useEffect(() => {
    if (!slug) return

    setTimeout(() => {
      const title = `Latest ${slug} Articles | ISource`
      const description = `Read latest ${slug} related articles, tips, guides and updates.`

      document.title = title
      updateMeta("description", description)
      updateCanonical(`${window.location.origin}/category/${slug}`)

      updateProperty("og:title", title)
      updateProperty("og:description", description)
      updateProperty("og:type", "website")
    }, 0)
  }, [slug])

  /* ------------------ Fetch Articles ------------------ */
  useEffect(() => {
    if (!slug) return

    fetch(`http://localhost:5000/api/articles/category/${slug}`)
      .then((res) => res.json())
      .then((data) => setArticles(data || []))
      .catch((err) => console.error(err))
  }, [slug])

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">{slug.replace("-", " ").toUpperCase()}</h1>
        <p className="category-subtitle">Latest articles and insights</p>
      </div>

      <AdBlock position="category-top" />

      <div className="articles-container">
        {articles.length === 0 ? (
          <div className="no-articles">
            <p>No articles found in this category</p>
          </div>
        ) : (
          <div className="articles-list">
            {articles.map((art, index) => (
              <article key={art._id} className="article-card">
                <div className="article-header">
                  <h2 className="article-title">
                    <Link to={`/article/${art.slug}`}>{art.title}</Link>
                  </h2>
                  <div className="article-meta">
                    <span className="meta-item">{formatDate(art.createdAt || art.publishedDate)}</span>
                    {art.content && <span className="meta-item">{calculateReadingTime(art.content)} min read</span>}
                  </div>
                </div>

                <p className="article-excerpt">{art.shortDescription || art.content.slice(0, 150) + "..."}</p>

                <Link to={`/article/${art.slug}`} className="read-more">
                  Read Article →
                </Link>

                {(index + 1) % 3 === 0 && (
                  <div className="ad-spacing">
                    <AdBlock position={`category-ad-${index}`} />
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      <AdBlock position="category-bottom" />
    </div>
  )
}

export default CategoryArticles
