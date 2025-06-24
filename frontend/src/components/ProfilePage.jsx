import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavigationBar from './NavigationBar.jsx'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Anjali Singh')
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(userName)
  const [balance, setBalance] = useState(5000)

  const handleEdit = () => setIsEditing(true)
  const handleSave = () => {
    setUserName(tempName)
    setIsEditing(false)
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.name}>{userName}</div>
        <div style={styles.balance}>₹ {balance}</div>
      </div>

      <div style={styles.center}>
        {isEditing ? (
          <div style={styles.editBox}>
            <input
              style={styles.input}
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
            <button style={styles.saveBtn} onClick={handleSave}>Save</button>
          </div>
        ) : (
          <button style={styles.editBtn} onClick={handleEdit}>Edit Profile</button>
        )}
        <button style={styles.addBtn} onClick={() => navigate('/dashboard')}>Add Transaction</button>
      </div>

      <div style={styles.footer}>
        <button style={styles.historyBtn} onClick={() => navigate('/history')}>History</button>
        <button style={styles.logoutBtn}>Logout</button>
      </div>

      <NavigationBar />
    </div>
  )
}

const styles = {
  page: {
    height: '100vh',
    backgroundColor: '#e6f0ff',
    color: '#003366',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    fontFamily: 'Arial',
    justifyContent: 'space-between'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  name: {},
  balance: {},
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    flex: 1,
    justifyContent: 'center'
  },
  editBox: {
    display: 'flex',
    gap: '10px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid gray'
  },
  editBtn: {
    backgroundColor: '#0055cc',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer'
  },
  addBtn: {
    backgroundColor: '#0077ff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer'
  },
  saveBtn: {
    backgroundColor: '#003399',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  historyBtn: {
    backgroundColor: '#0066cc',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  logoutBtn: {
    backgroundColor: '#cc0000',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer'
  }
}

export default ProfilePage
