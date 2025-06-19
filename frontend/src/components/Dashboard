import React, { useState } from 'react'

const Dashboard = () => {
  const [sections, setSections] = useState(['General'])
  const [expenses, setExpenses] = useState([])
  const [sectionInput, setSectionInput] = useState('')
  const [expenseInput, setExpenseInput] = useState({
    title: '',
    amount: '',
    date: '',
    section: 'General'
  })
  const [filterMonth, setFilterMonth] = useState('')
  const [filterYear, setFilterYear] = useState('')

  const addSection = () => {
    const name = sectionInput.trim()
    if (name && !sections.includes(name)) {
      setSections([...sections, name])
      setSectionInput('')
    }
  }

  const addExpense = () => {
    const { title, amount, date, section } = expenseInput
    if (title && amount && date && section && !isNaN(amount)) {
      const newExpense = {
        id: Date.now(),
        title,
        amount: parseFloat(amount),
        date,
        section
      }
      setExpenses([...expenses, newExpense])
      setExpenseInput({ title: '', amount: '', date: '', section: section })
    }
  }

  const filteredExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date)
    const monthMatch = filterMonth ? expDate.getMonth() + 1 === parseInt(filterMonth) : true
    const yearMatch = filterYear ? expDate.getFullYear() === parseInt(filterYear) : true
    return monthMatch && yearMatch
  })

  const monthlyTotal = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)

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
      fontFamily: 'Times New Roman',
      marginRight: '1rem',
      marginBottom: '1rem'
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: '#0047ab',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontFamily: 'Times New Roman',
      cursor: 'pointer'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '1.1rem',
      marginTop: '1rem'
    },
    th: {
      backgroundColor: '#0047ab',
      color: 'white',
      padding: '0.8rem',
      textAlign: 'left'
    },
    td: {
      padding: '0.8rem',
      borderBottom: '1px solid #ddd'
    },
    total: {
      marginTop: '1rem',
      textAlign: 'right',
      fontSize: '1.3rem',
      color: '#0047ab'
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Expense Tracker Dashboard</h1>
      <div style={styles.card}>
        <h2 style={{ ...styles.heading, fontSize: '1.5rem' }}>Add Section</h2>
        <input
          style={styles.input}
          value={sectionInput}
          onChange={e => setSectionInput(e.target.value)}
          placeholder="Enter section name"
        />
        <button style={styles.button} onClick={addSection}>Add Section</button>

        <h2 style={{ ...styles.heading, fontSize: '1.5rem', marginTop: '2rem' }}>Add Expense</h2>
        <input
          style={styles.input}
          placeholder="Title"
          value={expenseInput.title}
          onChange={e => setExpenseInput({ ...expenseInput, title: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Amount"
          value={expenseInput.amount}
          onChange={e => setExpenseInput({ ...expenseInput, amount: e.target.value })}
        />
        <input
          style={styles.input}
          type="date"
          value={expenseInput.date}
          onChange={e => setExpenseInput({ ...expenseInput, date: e.target.value })}
        />
        <select
          style={styles.input}
          value={expenseInput.section}
          onChange={e => setExpenseInput({ ...expenseInput, section: e.target.value })}
        >
          {sections.map(sec => <option key={sec}>{sec}</option>)}
        </select>
        <button style={styles.button} onClick={addExpense}>Add Expense</button>

        <h2 style={{ ...styles.heading, fontSize: '1.5rem', marginTop: '2rem' }}>Filter by Month</h2>
        <select
          style={styles.input}
          value={filterMonth}
          onChange={e => setFilterMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {[...Array(12).keys()].map(m => (
            <option key={m + 1} value={m + 1}>
              {new Date(0, m).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <input
          style={styles.input}
          type="number"
          placeholder="Year (e.g. 2025)"
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
        />

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Amount (₹)</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Section</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(exp => (
              <tr key={exp.id}>
                <td style={styles.td}>{exp.title}</td>
                <td style={styles.td}>{exp.amount}</td>
                <td style={styles.td}>{exp.date}</td>
                <td style={styles.td}>{exp.section}</td>
              </tr>
            ))}
            {filteredExpenses.length === 0 && (
              <tr>
                <td colSpan="4" style={{ ...styles.td, textAlign: 'center' }}>No expenses found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={styles.total}>Total This Month: ₹{monthlyTotal}</div>
      </div>
    </div>
  )
}

export default Dashboard
