import { useState, useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const API = "http://localhost:5000/users";

  // FETCH USERS
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // ADD OR UPDATE USER
  const handleSubmit = async () => {
    if (!name) return;

    if (editId) {
      // UPDATE
      const res = await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      const updated = await res.json();

      setUsers(users.map(u => (u.id === editId ? updated : u)));
      setEditId(null);
    } else {
      // ADD
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      const newUser = await res.json();
      setUsers([...users, newUser]);
    }

    setName("");
  };

  // DELETE
  const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setUsers(users.filter(u => u.id !== id));
  };

  // EDIT
  const editUser = (user) => {
    setName(user.name);
    setEditId(user.id);
  };

  // FILTER
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Manager</h2>

      <input
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button style={styles.button} onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      <input
        style={styles.input}
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.map(user => (
        <div key={user.id} style={styles.card}>
          <span>{user.name}</span>

          <div>
            <button
              style={styles.smallBtn}
              onClick={() => editUser(user)}
            >
              Edit
            </button>

            <button
              style={styles.smallBtn}
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// 🎨 Retro Style (your preference 😎)
const styles = {
  container: {
    fontFamily: "monospace",
    background: "white",
    padding: "20px",
    minHeight: "100vh"
  },
  heading: {
    borderBottom: "2px solid black",
    display: "inline-block"
  },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "8px",
    border: "2px solid black"
  },
  button: {
    padding: "8px",
    border: "2px solid black",
    cursor: "pointer",
    marginBottom: "10px"
  },
  card: {
    border: "2px solid black",
    padding: "10px",
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "4px 4px 0px black"
  },
  smallBtn: {
    marginLeft: "5px",
    border: "2px solid black",
    cursor: "pointer"
  }
};