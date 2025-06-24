import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = 'url("https://wallpaperaccess.com/full/333615.jpg")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundAttachment = "";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage("*All fields are required");
      return;
    }

    try {
      const response = await axios.post("https://hos-backend.onrender.com/register", {
        name,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify({ token: response.data.token }));
        navigate("/dashboard");
      } else {
        alert("Registered successfully");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage("Registration failed. Please try again.");
      } else if (error.request) {
        setErrorMessage("Network error. Please check your connection.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="form-control"
              id="name"
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={styles.button}>
            SignUp
          </button>

          {message && <div style={styles.message}>{message}</div>}
        </form>

        <Link to="/login">Already Have an Account? Login</Link>
      </div>
    </div>
  );
}

export default Signup;
