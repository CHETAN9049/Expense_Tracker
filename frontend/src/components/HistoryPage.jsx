import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavigationBar from './NavigationBar.jsx'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const HistoryPage = () => {
  const [expenses, setExpenses] = useState([])
  const [month, setMonth] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${API_URL}/expenses/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setExpenses(res.data.expenses || [])
      } catch (err) {
        setExpenses([])
      }
    }
    fetchExpenses()
  }, [])

  const filtered = expenses.filter(e => {
    const matchesMonth = month ? new Date(e.date).getMonth() + 1 === parseInt(month) : true
    const matchesCat = category ? e.category === category || e.section === category : true
    return matchesMonth && matchesCat
  })

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#eef6ff',
      minHeight: '100vh',
      fontFamily: 'Arial'
    },
    heading: {
      fontSize: '2rem',
      color: '#0047ab',
      textAlign: 'center'
    },
    table: {
      width: '100%',
      background: 'white',
      marginTop: '1rem',
      borderCollapse: 'collapse'
    },
    th: {
      backgroundColor: '#0047ab',
      color: 'white',
      padding: '0.8rem'
    },
    td: {
      padding: '0.8rem',
      borderBottom: '1px solid #ccc'
    },
    filter: {
      margin: '1rem 0',
      display: 'flex',
      gap: '1rem'
    },
    btn: {
      padding: '0.3rem 0.6rem',
      backgroundColor: '#0077ff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  }

  const allSections = [...new Set(expenses.map(e => e.category || e.section))]

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Expense History</h2>
      <div style={styles.filter}>
        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {[...Array(12).keys()].map(m => (
            <option key={m+1} value={m+1}>{new Date(0, m).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {allSections.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Section</th>
            <th style={styles.th}>Notes</th>
            <th style={styles.th}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(e => (
            <tr key={e._id || e.id}>
              <td style={styles.td}>{e.title || e.note || ''}</td>
              <td style={styles.td}>₹{e.amount}</td>
              <td style={styles.td}>{e.date ? new Date(e.date).toLocaleDateString() : ''}</td>
              <td style={styles.td}>{e.category || e.section}</td>
              <td style={styles.td}>{e.notes || e.note || ''}</td>
              <td style={styles.td}><button style={styles.btn} onClick={() => navigate('/dashboard')}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <NavigationBar />
    </div>
  )
}

export default HistoryPage
