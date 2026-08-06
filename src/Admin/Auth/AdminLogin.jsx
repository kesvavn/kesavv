import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Auth/AdminAuth.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("adminToken", res.data.token);

      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.admin)
      );

      navigate("/admin");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <form className="admin-login-form" onSubmit={handleLogin}>

      <h1 className="admin-login-title">
        Admin Login
      </h1>

      <input
        className="admin-login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="admin-login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="admin-login-btn" type="submit">
        Login
      </button>

    </form>
  );
}

export default AdminLogin;