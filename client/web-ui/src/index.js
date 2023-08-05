import react, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import "./design/index.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const serverAdress = 'http://localhost:5000/'
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState(null);
  
  const handleUsers = async (user) => {
    try {
      const response = await fetch(`${serverAdress}api/Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        // Registration successful
        setUsers((prevUsers) => [...prevUsers, user]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
};
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home users={users} handleUsers={handleUsers} socket={socket} setSocket={setSocket} setUsername={setUsername} />} />
        <Route path="/chats" element={<Chats socket={socket} username={username} />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);