import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">ISource Admin</h2>

      <nav>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/categories">Categories</NavLink>
        <NavLink to="/admin/articles">Articles</NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
