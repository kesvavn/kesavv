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

    navigate("/admin");

  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  }
};

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default AdminLogin;