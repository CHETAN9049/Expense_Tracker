import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavigationBar = () => {
  const navigate = useNavigate()

  const styles = {
    navBar: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '20px'
    },
    navBtn: {
      backgroundColor: '#003366',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px'
    }
  }

  return (
    <div style={styles.navBar}>
      <button style={styles.navBtn} onClick={() => navigate('/')}>Profile</button>
      <button style={styles.navBtn} onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button style={styles.navBtn} onClick={() => navigate('/history')}>History</button>
    </div>
  )
}

export default NavigationBar
