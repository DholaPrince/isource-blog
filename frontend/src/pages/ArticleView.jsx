"use client"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "../styles/ArticleView.css"
import VideoModal from "../components/VideoModal"

const API = import.meta.env.VITE_API_URL;

const ArticleView = () => {
  const { slug } = useParams()
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/articles/${slug}`)
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

  /* ================= FETCH RELATED ARTICLES (SAME CATEGORY) ================= */

  useEffect(() => {
    if (!article?.category) return;

    fetch(`${API}/api/articles?category=${encodeURIComponent(article.category)}&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.slug !== slug);
        setRelatedArticles(filtered.slice(0, 5));
      })
      .catch(() => setRelatedArticles([]));
  }, [article, slug]);

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

  /* ================= CONTENT FORMATTER ================= */

  const renderContent = (text) => {
    if (!text) return null;

    const paragraphs = text.split("\n").filter(Boolean);

    return paragraphs.map((para, i) => {
      if (para.startsWith("## ")) {
        return (
          <h2 key={i} className="article-heading">
            {para.replace("## ", "")}
          </h2>
        );
      }

      if (para.startsWith("### ")) {
        return (
          <h3 key={i} className="article-subheading">
            {para.replace("### ", "")}
          </h3>
        );
      }

      return (
        <p key={i} className="article-paragraph">
          {para}
        </p>
      );
    });
  };

  /* ================= READING TIME ================= */

  const calculateReadingTime = (text) => {
    if (!text) return "1 min read";
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const readingTime = calculateReadingTime(article.content);

  /* ================= SHARE HANDLERS ================= */

  const pageUrl = window.location.href;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(article.title);

  const shareWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, "_blank");
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <span className="article-separator">•</span>
            <span className="article-reading-time">🕒 {readingTime}</span>
          </div>
        </div>
      </header>

      {/* Article Body Layout */}
        <div className="article-layout">
          {/* MAIN CONTENT */}
          <article className="article-content">
            <div className="article-body">{renderContent(article.content)}</div>

            {/* 🎥 VIDEO TRUST CARD */}
            {article.youtubeUrl && (
              <div className="article-video-card">
                <div className="video-card-left">
                  <div className="video-avatar">
                    <span>YT</span>
                  </div>
                </div>

                <div className="video-card-right">
                  <h4>{article.youtubeTitle || "Watch Expert Video"}</h4>
                  <p>
                    This article references insights from a trusted YouTube
                    creator. Watch the full explanation below.
                  </p>

                  <button
                    className="watch-video-btn"
                    onClick={() => setShowVideo(true)}
                  >
                    ▶ Watch Video
                  </button>
                </div>
              </div>
            )}
            {/* 🔗 SHARE BUTTONS */}
            <div className="article-share">
              <span className="share-label">Share:</span>

              <button
                className="share-btn whatsapp"
                onClick={shareWhatsapp}
                aria-label="Share on WhatsApp"
              >
                WhatsApp
              </button>

              <button
                className="share-btn twitter"
                onClick={shareTwitter}
                aria-label="Share on Twitter"
              >
                Twitter
              </button>

              <button
                className="share-btn facebook"
                onClick={shareFacebook}
                aria-label="Share on Facebook"
              >
                Facebook
              </button>

              <button
                className="share-btn copy"
                onClick={copyLink}
                aria-label="Copy link"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="article-sidebar">
            <h3 className="sidebar-title">Latest in this category</h3>

            {relatedArticles.length === 0 ? (
              <p className="sidebar-empty">No related articles yet.</p>
            ) : (
              <ul className="sidebar-list">
                {relatedArticles.map((item) => (
                  <li key={item._id}>
                    <a href={`/article/${item.slug}`}>
                      <span className="sidebar-article-title">
                        {item.title}
                      </span>
                      <span className="sidebar-article-date">
                        {formatDate(item.createdAt)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>

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
