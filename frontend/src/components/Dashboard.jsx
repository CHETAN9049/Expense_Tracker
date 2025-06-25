import React, { useState } from 'react'
import axios from 'axios'
import NavigationBar from './NavigationBar.jsx'

const Dashboard = () => {
  const [sections, setSections] = useState(['General'])
  const [expenses, setExpenses] = useState([])
  const [sectionInput, setSectionInput] = useState('')
  const [expenseInput, setExpenseInput] = useState({
    title: '', amount: '', date: '', section: 'General', notes: ''
  })
  const [message, setMessage] = useState('')

  const addSection = () => 
    {
    const name = sectionInput.trim()
    if (name && !sections.includes(name)) {
      setSections([...sections, name])
      setSectionInput('')
    }
  }

  const addExpense = async () => {
    const { title, amount, date, section, notes } = expenseInput
    if (title && amount && date && !isNaN(amount)) {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.post(
          '/expenses/add',
          {
            amount: parseFloat(amount),
            date,
            category: section,
            note: notes
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        const newExpense = {
          id: Date.now(),
          title,
          amount: parseFloat(amount),
          date,
          section,
          notes
        }
        const updated = [...expenses, newExpense]
        setExpenses(updated)
        localStorage.setItem('expenses', JSON.stringify(updated))
        setExpenseInput({ title: '', amount: '', date: '', section, notes: '' })
        setMessage(res.data.message || 'Expense added!')
      } catch (err) {
        setMessage(err.response?.data?.error || 'Failed to add expense')
      }
    } else {
      setMessage('Please fill all fields correctly')
    }
  }

  const styles = {
    container: {
      fontFamily: 'Times New Roman',
      backgroundColor: '#f5faff',
      minHeight: '100vh',
      padding: '2rem'
    },
    heading: {
      color: '#0047ab',
      textAlign: 'center',
      fontSize: '2.5rem'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '1.5rem',
      maxWidth: '1000px',
      margin: '2rem auto',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    input: {
      padding: '0.5rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginRight: '1rem',
      marginBottom: '1rem'
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#0047ab',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    message: {
      color: 'red',
      marginTop: '1rem'
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>
      <div style={styles.card}>
        <input style={styles.input} placeholder="Section" value={sectionInput} onChange={e => setSectionInput(e.target.value)} />
        <button style={styles.button} onClick={addSection}>Add Section</button>
        <br />
        <input style={styles.input} placeholder="Title" value={expenseInput.title} onChange={e => setExpenseInput({ ...expenseInput, title: e.target.value })} />
        <input style={styles.input} type="number" placeholder="Amount" value={expenseInput.amount} onChange={e => setExpenseInput({ ...expenseInput, amount: e.target.value })} />
        <input style={styles.input} type="date" value={expenseInput.date} onChange={e => setExpenseInput({ ...expenseInput, date: e.target.value })} />
        <select style={styles.input} value={expenseInput.section} onChange={e => setExpenseInput({ ...expenseInput, section: e.target.value })}>
          {sections.map(s => <option key={s}>{s}</option>)}
        </select>
        <input style={styles.input} placeholder="Notes" value={expenseInput.notes} onChange={e => setExpenseInput({ ...expenseInput, notes: e.target.value })} />
        <button style={styles.button} onClick={addExpense}>Add</button>
        {message && <div style={styles.message}>{message}</div>}
      </div>
      <NavigationBar />
    </div>
  )
}

export default Dashboard
