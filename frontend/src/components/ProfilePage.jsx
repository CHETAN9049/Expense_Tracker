import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavigationBar from './NavigationBar.jsx'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(userName)

  const [balance, setBalance] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${API_URL}/user/userProfile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUserName(res.data.user.username)
        setTempName(res.data.user.username)
        setBalance(res.data.user.balance || 0)
      } catch (err) {
        setMessage('Failed to load profile')
      }
    }
    fetchProfile()
  }, [])

  const handleEdit = () => setIsEditing(true)

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.patch(
        '/user/userProfile',
        { username: tempName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setUserName(res.data.user.username)
      setTempName(res.data.user.username)
      setIsEditing(false)
      setMessage('Profile updated!')
    } catch (err) {
      setMessage('Failed to update profile')
    }
  }

  const handleSalarySave = () => {
    const num = parseFloat(tempSalary)
    if (!isNaN(num)) {
      setSalary(num)
      setIsEditingSalary(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.name}>{userName}</div>
          <div style={styles.salary}>Monthly Salary: ₹ {salary}</div>
        </div>
        <div style={styles.balance}>₹ {balance}</div>
      </div>

      <div style={styles.center}>
        {balance < warningLimit && (
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            Warning: Balance below ₹{warningLimit}
          </div>
        )}

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

        {isEditingSalary ? (
          <div style={styles.salaryBox}>
            <input
              type="number"
              style={styles.input}
              value={tempSalary}
              onChange={(e) => setTempSalary(e.target.value)}
              placeholder="Enter Monthly Salary"
            />
            <button style={styles.saveBtn} onClick={handleSalarySave}>Save</button>
          </div>
        ) : (
          <button style={styles.editBtn} onClick={() => setIsEditingSalary(true)}>Edit Salary</button>
        )}

        <div style={styles.salaryBox}>
          <input
            type="number"
            placeholder="Set Warning Limit"
            style={styles.input}
            value={warningLimit}
            onChange={(e) => setWarningLimit(parseFloat(e.target.value) || 0)}
          />
        </div>

        <button style={styles.addBtn} onClick={() => navigate('/dashboard')}>Add Transaction</button>
        {message && <div style={{ color: 'red', marginTop: 10 }}>{message}</div>}
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
  name: {
    fontSize: '22px',
    fontWeight: 'bold'
  },
  salary: {
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#003366'
  },
  balance: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
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
  },
  salaryBox: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  }
}

export default ProfilePage
