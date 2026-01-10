const AdminNavbar = () => {
  const logout = () => {
    localStorage.removeItem("adminPassword");
    window.location.href = "/admin-login";
  };

  return (
    <header className="admin-navbar">
      <h3>Admin Panel</h3>
      <span>👋 Hello Admin</span>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </header>
  );
};

export default AdminNavbar;
