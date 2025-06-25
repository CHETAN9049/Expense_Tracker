import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    minHeight: '100vh',
    padding: '40px',
    fontFamily: "'Montserrat', sans-serif",
    backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/003/031/764/original/blue-wide-background-with-linear-blurred-gradient-free-vector.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0147AB',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
 buttonContainer: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',   
  alignItems: 'center',
  width: '100%',                  
  marginTop: '40px',
},
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#0147AB',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '200px', 
  },
};

function AdminDashboard() {
  const navigate = useNavigate();
  const adminName = localStorage.getItem('adminName') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminToken');
    navigate('/adminlogin');
  };

  const handleViewUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/view-users', { state: { users: res.data.users } });
    } catch (error) {
      setMessage("Login failed. Please try again.");
    }
  };

  const handleEdit = () => {
    navigate('/edit-user');
  };

  const handleDelete = () => {
    navigate('/delete-user');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Welcome, {adminName} 👋</h2>
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleViewUsers}>View Users</button>
        <button style={styles.button} onClick={handleEdit}>Edit Users</button>
        <button style={styles.button} onClick={handleDelete}>Delete Users</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
