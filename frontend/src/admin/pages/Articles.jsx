import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    categorySlug: "", // ✅ FIX
    shortDescription: "",
    content: "",
    status: "draft",
    youtubeTitle: "",
youtubeUrl: "",
  });

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  // ================= FETCH =================

 const fetchArticles = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/articles", {
      headers: {
        "x-admin-password": localStorage.getItem("adminPassword"),
      },
    });

    const data = await res.json();
    setArticles(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error(err);
    setArticles([]);
  } finally {
    setLoading(false);
  }
};


  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= HELPERS =================

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && { slug: generateSlug(value) }),
    }));
  };

  // ================= EDIT =================

  const handleEdit = (article) => {
    setEditingId(article._id);
    setForm({
      title: article.title,
      slug: article.slug,
      categorySlug: article.categorySlug || "", // ✅ FIX
      shortDescription: article.shortDescription || "",
      content: article.content || "",
      status: article.status || "draft",
      youtubeTitle: article.youtubeTitle || "",
youtubeUrl: article.youtubeUrl || "",
    });
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:5000/api/articles/${editingId}`
      : "http://localhost:5000/api/articles";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
  "Content-Type": "application/json",
  "x-admin-password": localStorage.getItem("adminPassword"),
},
      body: JSON.stringify(form),
    });

    resetForm();
    fetchArticles();
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;

    await fetch(`http://localhost:5000/api/articles/${id}`, {
  method: "DELETE",
  headers: {
    "x-admin-password": localStorage.getItem("adminPassword"),
  },
});

    fetchArticles();
  };

  // ================= RESET =================

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      slug: "",
      categorySlug: "",
      shortDescription: "",
      content: "",
      status: "draft",
      youtubeTitle: "",
    youtubeUrl: "",
    });
  };

  // ================= UI =================

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1>Manage Articles</h1>

        {/* FORM */}
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Article title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input type="text" value={form.slug} disabled />

          <select
            name="categorySlug"  // ✅ FIX
            value={form.categorySlug}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <textarea
            name="shortDescription"
            placeholder="Meta description (SEO)"
            value={form.shortDescription}
            onChange={handleChange}
            rows="2"
          />

          <textarea
            name="content"
            placeholder="Article content"
            value={form.content}
            onChange={handleChange}
            rows="6"
          />

          <input
  type="text"
  name="youtubeTitle"
  placeholder="YouTube Video Title (optional)"
  value={form.youtubeTitle}
  onChange={handleChange}
/>

<input
  type="text"
  name="youtubeUrl"
  placeholder="YouTube Video URL (optional)"
  value={form.youtubeUrl}
  onChange={handleChange}
/>


          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <button type="submit">
            {editingId ? "Update Article" : "Add Article"}
          </button>

          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : articles.length === 0 ? (
          <p>No articles found</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((art, i) => (
                <tr key={art._id}>
                  <td>{i + 1}</td>
                  <td>{art.title}</td>
                  <td>{art.slug}</td>
                  <td>{art.status}</td>
                  <td>
                    <button onClick={() => handleEdit(art)}>Edit</button>
                    <button onClick={() => handleDelete(art._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default Articles;
