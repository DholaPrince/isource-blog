import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const API = import.meta.env.VITE_API_URL;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Enter category name");

    await fetch(`${API}/api/categories`, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  "x-admin-password": localStorage.getItem("adminPassword"),
},
      body: JSON.stringify({
        name,
        slug: generateSlug(name),
      }),
    });

    setName("");
    fetchCategories();
  };

  const handleEdit = async (id, oldName) => {
    const newName = prompt("Edit category name", oldName);
    if (!newName) return;

    await fetch(`${API}/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json",
        "x-admin-password": localStorage.getItem("adminPassword"),
       },
      body: JSON.stringify({
        name: newName,
        slug: generateSlug(newName),
      }),
    });

    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    await fetch(`${API}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
    "x-admin-password": localStorage.getItem("adminPassword"),
  },
    });

    fetchCategories();
  };

  return (
    <AdminLayout>
      <h1>Manage Categories</h1>

      {/* Add Category */}
      <form onSubmit={handleAddCategory} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", width: "250px", marginRight: "10px" }}
        />
        <button type="submit">Add Category</button>
      </form>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", marginTop: "30px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, i) => (
              <tr key={cat._id}>
                <td>{i + 1}</td>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>
                  <button onClick={() => handleEdit(cat._id, cat.name)}>
                    Edit
                  </button>{" "}
                  <button onClick={() => handleDelete(cat._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
};

export default Categories;
