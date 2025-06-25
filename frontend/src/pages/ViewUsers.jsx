import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    minHeight: '100vh',
     backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/003/031/764/original/blue-wide-background-with-linear-blurred-gradient-free-vector.jpg")',
    backgroundSize: 'cover',
    padding: '40px',
    fontFamily: "'Montserrat', sans-serif",
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  th: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    backgroundColor: '#0147AB',
    color: '#fff',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  searchBar: {
    marginBottom: '20px',
    justifyContent: 'right',
    textAlign:'right',
  border: '15px',
  padding: '50px',
  margin: '20px',
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
};

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios.get('admin/users') // replace with  API
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  const filtered = users.filter((user) =>
    user.id?.toString().includes(searchId.trim())
  );

  const paginatedUsers = filtered.slice((page - 1) * usersPerPage, page * usersPerPage);

  return (
    <div style={styles.container}>
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>User ID</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length ? (
            paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  {new Date(user.date || Date.now()).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={styles.td} colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
        <button disabled={page * usersPerPage >= filtered.length} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ViewUsers;
