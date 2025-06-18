
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../assets/Expense.css";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const shortIconStyle = {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  };

  const NameStyle = {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2px',
  };

  const headerStyle = {
    backgroundColor: '#2c3e50', 
    padding: '10px 20px',
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

   
    console.log('Form Data:', { name, email, password });

    if (!name || !email || !password) {
      setErrorMessage('*All fields are required');
      return;
    }

    try {
      const response = await axios.post('https://hos-backend.onrender.com/register', {   //add backend 
        name,
        email,
        password,
      });

   
      console.log('API Response:', response.data);

      if (response.data === 'Account already exists') {
        setErrorMessage('Account already exists. Please use a different email.');
      } else {
        alert('Registered successfully');
        navigate('/login');
      }
    } catch (error) {
   
      console.error('Registration Error:', error);

      if (error.response) {
  
        console.error('Error Response Data:', error.response.data);
        console.error('Error Status Code:', error.response.status);
        setErrorMessage('Registration failed. Please try again.');
      } else if (error.request) {
 
        console.error('No Response Received:', error.request);
        setErrorMessage('Network error. Please check your connection.');
      } else {
   
        console.error('Request Setup Error:', error.message);
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div
      className="hos"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', 
      }}
    >
      <header className="navbar navbar-expand-lg navbar-light px-2" style={headerStyle}>
        <div style={NameStyle}>
         
          <span>Expense Tracker</span>
        </div>
      </header>

      <div
        style={{
          flex: 1, 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center', 
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '500px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>SignUp</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" style={{ fontWeight: 'bold', color: '#34495e' }}>
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                style={{ marginBottom: '15px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" style={{ fontWeight: 'bold', color: '#34495e' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                style={{ marginBottom: '15px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ fontWeight: 'bold', color: '#34495e' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                style={{ marginBottom: '15px' }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-0"
              style={{ backgroundColor: '#0147AB', border: 'none', padding: '10px', fontSize: '16px', color: '#fff' }}
            >
              SignUp
            </button>
            {message && <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{message}</div>}
          </form>
          <br />
          
          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            style={{  padding: '10px', fontSize: '16px' }}
          >
           Already Have an Account?
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;