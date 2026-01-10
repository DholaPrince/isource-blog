import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!password) {
      alert("Enter admin password");
      return;
    }

    // save password in browser
    localStorage.setItem("adminPassword", password);

    // go to admin dashboard
    navigate("/admin");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Admin Login</h2>

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button onClick={handleLogin} style={{ width: "100%", padding: "10px" }}>
        Login
      </button>
    </div>
  );
};

export default AdminLogin;