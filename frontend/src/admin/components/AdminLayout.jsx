import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "../admin.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
