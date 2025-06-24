import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/calc.webp';

const styles = {
  header: {
    backgroundColor: '#0147AB',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    fontFamily: "'Montserrat', sans-serif",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '60px',
    height: '60px',
    marginRight: '10px',
    borderRadius: '50%',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: "'Montserrat', sans-serif",
  },
  adminButton: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
    border: '2px solid white',
    padding: '10px 20px',
    borderRadius: '30px',
    transition: '0.3s',
    fontFamily: "'Montserrat', sans-serif",
  },
  hero: {
    backgroundImage: `url("https://img.freepik.com/premium-photo/top-view-image-blue-calculator-blue-background-with-copy-space_577978-1363.jpg?w=740")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: 'white',
    textAlign: 'left',
    fontFamily: "'Montserrat', sans-serif",
    paddingLeft: '20px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), -1px -1px 0 grey, 1px -1px 0, -1px 1px 0 grey, 1px 1px 0 grey',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
  },
  heroSubtitle: {
    fontSize: '24px',
    marginBottom: '40px',
    textShadow: '1px 1px 2px rgb(0, 0, 0), -1px -1px 0 grey, 1px -1px 0 grey, -1px 1px 0 grey, 1px 1px 0 grey',
    color: '#fff',
    fontFamily: "'Lato', sans-serif",
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#1E88E5',
    backgroundColor: '#fff',
    border: '2px solid white',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
    fontFamily: "'Montserrat', sans-serif",
  },
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    borderColor: '#1E88E5',
  },
  footer: {
    backgroundColor: '#0147AB',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
  },
};

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src={Logo} alt=" Logo" style={styles.logoImage} />
          <span style={styles.logoText}>Expense Tracker</span>
        </div>
      
        <Link
          to="/adminlogin"
          style={styles.adminButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#fff';
            e.target.style.color = '#0147AB';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#fff';
          }}
        >
          Admin Login
        </Link>
      </header>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>ONE PAY STOP FOR ALL</h1>
        <p style={styles.heroSubtitle}>Track Every Rupee, Master Your Budget.</p>
        <div style={styles.buttonContainer}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Login</button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Register</button>
          </Link>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>&copy; 2025 Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
