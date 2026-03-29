import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(""); // 🔥 new
  const [error, setError] = useState("");

  // Fetch data
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      console.log(data); // 🔥 always do this in exam
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 Filter logic
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1>User List</h1>

      {/* 🔍 Search Input */}
      <input
        style={styles.input}
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p>{error}</p>}

      {/* 🔥 Use filteredUsers instead of users */}
      {filteredUsers.map((user) => (
        <div key={user.id} style={styles.card}>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "monospace",
    padding: "20px",
  },
  input: {
    padding: "8px",
    border: "2px solid black",
    marginBottom: "20px",
  },
  card: {
    border: "2px solid black",
    margin: "10px 0",
    padding: "10px",
    boxShadow: "4px 4px 0px black",
  },
};

export default App;