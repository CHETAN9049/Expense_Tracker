import React, { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: 'url("https://wallpaperaccess.com/full/333615.jpg")',
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2c3e50",
  },
  label: {
    fontWeight: "bold",
    color: "#34495e",
  },
  input: {
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    marginBottom: "10px",
    backgroundColor: "#0147AB",
    color: '#fff',
    border: "none",
  },
  message: {
    marginTop: "10px",
    color: "red",
    textAlign: "center",
  },
};

function AdminLogin() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!adminEmail || !adminPassword) {
      setMessage("*All fields are required");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email: adminEmail, password: adminPassword });

      if (res.data.token && res.data.user && res.data.user.role === "admin") {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminName", res.data.user.username || "Admin");
        localStorage.setItem("adminToken", res.data.token);
        navigate("/addashboard");
      } else {
        setMessage("Invalid admin credentials");
      }
    } catch (error) {
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container" style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <div className="form-group">
            <label style={styles.label}>Admin Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Admin Email"
              onChange={(e) => setAdminEmail(e.target.value)}
              value={adminEmail}
              style={styles.input}
            />
          </div>

          <div className="form-group">
            <label style={styles.label}>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setAdminPassword(e.target.value)}
              value={adminPassword}
              style={styles.input}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={styles.button}>
            Login as Admin
          </button>

          {message && <div style={styles.message}>{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
