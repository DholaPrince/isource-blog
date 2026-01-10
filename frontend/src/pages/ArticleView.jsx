"use client"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "../styles/ArticleView.css"
import VideoModal from "../components/VideoModal"

const ArticleView = () => {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data)

        setTimeout(() => {
          const title = `${data.title} | ISource`
          const description = data.shortDescription || data.content?.slice(0, 160)

          document.title = title

          updateMeta("description", description)
          updateCanonical(`${window.location.origin}/article/${data.slug}`)

          /* 🔥 SOCIAL SEO */
          updateProperty("og:title", title)
          updateProperty("og:description", description)
          updateProperty("og:type", "article")
          updateProperty("og:url", window.location.href)

          updateMeta("twitter:card", "summary_large_image")
          updateMeta("twitter:title", title)
          updateMeta("twitter:description", description)
        }, 0)
      })
  }, [slug])

  useEffect(() => {
    if (!article) return

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.shortDescription || article.content?.slice(0, 160),
      datePublished: article.createdAt,
      dateModified: article.updatedAt || article.createdAt,
      author: {
        "@type": "Organization",
        name: "ISource",
      },
      publisher: {
        "@type": "Organization",
        name: "ISource",
        logo: {
          "@type": "ImageObject",
          url: `${window.location.origin}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": window.location.href,
      },
    }

    let script = document.querySelector('script[type="application/ld+json"]')

    if (!script) {
      script = document.createElement("script")
      script.type = "application/ld+json"
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(schema)

    return () => {
      script.remove()
    }
  }, [article])

  if (!article)
    return (
      <div className="article-page">
        <div className="article-loading">
          <p>Loading article...</p>
        </div>
      </div>
    )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

   /* ================= VIDEO HELPER (🔥 MISSING PART) ================= */

  const getEmbedUrl = (url) => {
    if (!url) return ""

    if (url.includes("embed")) return url

    const videoId =
      url.split("v=")[1]?.split("&")[0] || url.split("/").pop()

    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <>
    <div className="article-page">
      {/* Top Advertisement */}
      <div className="ad-container ad-top">
        <div className="ad-slot ad-top" />
      </div>

      {/* Article Header Section */}
      <header className="article-header">
        <div className="article-header-content">
          <h1 className="article-title">{article.title}</h1>

          <div className="article-meta">
            <span className="article-date">{formatDate(article.createdAt)}</span>
            <span className="article-separator">•</span>
            <span className="article-author">By ISource</span>
          </div>
        </div>
      </header>

      {/* Main Article Content */}
      <article className="article-content">
        <div className="article-body">
          <p>{article.content}</p>
        </div>
      </article>

      {article.youtubeUrl && (
  <div className="article-video-card">
    <h3>{article.youtubeTitle || "Watch Related Video"}</h3>

    <button
      className="watch-video-btn"
      onClick={() => setShowVideo(true)}
    >
      ▶ Watch Video
    </button>
  </div>
)}

      {/* Middle Advertisement */}
      <div className="ad-container ad-middle">
        <div className="ad-slot ad-middle" />
      </div>

      {/* Bottom Advertisement */}
      <div className="ad-container ad-bottom">
        <div className="ad-slot ad-bottom" />
      </div>
    </div>

    {/* 🎥 VIDEO MODAL */}
      {showVideo && (
        <VideoModal
          videoUrl={getEmbedUrl(article.youtubeUrl)}
          onClose={() => setShowVideo(false)}
        />
      )}
</>

  )
}

/* ================= SEO HELPERS ================= */

const updateMeta = (name, content) => {
  if (!content) return

  let meta = document.querySelector(`meta[name="${name}"]`)
  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute("name", name)
    document.head.appendChild(meta)
  }
  meta.setAttribute("content", content)
}

const updateProperty = (property, content) => {
  let meta = document.querySelector(`meta[property="${property}"]`)
  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute("property", property)
    document.head.appendChild(meta)
  }
  meta.setAttribute("content", content)
}

const updateCanonical = (url) => {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement("link")
    link.setAttribute("rel", "canonical")
    document.head.appendChild(link)
  }
  link.setAttribute("href", url)
}

export default ArticleView
