import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: 'url("https://wallpaperaccess.com/full/333615.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
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
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    borderRadius: "5px",
    width: "40%",
    margin: "10px auto",
    display: "block",
    backgroundColor: "#0147AB",
    border: "none",
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
  },
  message: {
    marginTop: "10px",
    color: "red",
    textAlign: "center",
  },
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("*All fields are required");
      return;
    }

    try {
      const res = await axios.post("https://your-api-url.com/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify({ token: res.data.token }));
        navigate("/verify-2fa"); // or "/dashboard" if no 2FA
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container" style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Expense Tracker Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label style={styles.label}>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={styles.input}
            />
          </div>

          <div className="form-group">
            <label style={styles.label}>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={styles.input}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={styles.button}>
            Login
          </button>

          {message && <div style={styles.message}>{message}</div>}
        </form>

        <Link to="/signup">Don't have an account? SignUp</Link>
      </div>
    </div>
  );
}

export default Login;
