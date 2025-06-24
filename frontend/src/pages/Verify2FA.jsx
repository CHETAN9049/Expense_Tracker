import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    width: '40%',
    margin: '10px auto',
    display: 'block',
    backgroundColor: '#0147AB',
    border: 'none',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
  },
  message: {
    marginTop: "10px",
    color: "red",
    textAlign: "center",
  }
};

function Verify2FA() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();

    if (code === "123456") { // replace this with API check
      localStorage.setItem("is2FAVerified", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid code. Try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Verify 2FA Code</h2>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Verify Code
          </button>
          {error && <div style={styles.message}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Verify2FA;
