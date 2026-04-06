// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import EmployeeDetail from "./pages/EmployeeDetail";
import Message from "./pages/Message";

function App() {
  const user = {
    name: "Jafeth",
    message: "Bienvenido a mi aplicación React 🚀"
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/employee/:id" element={<EmployeeDetail />} />
        <Route path="/message" element={<Message user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;

// components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <h1>Mi App</h1>
      <div className="flex gap-4">
        <Link to="/">Inicio</Link>
        <Link to="/about">Quiénes somos</Link>
        <Link to="/message">Mensaje</Link>
      </div>
    </nav>
  );
}

// pages/Home.jsx
export default function Home() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Inicio</h2>
      <p>Bienvenido a una app hecha con React Router.</p>
    </div>
  );
}

// pages/About.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Empleados</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="my-2">
            <Link to={`/employee/${user.id}`} className="text-blue-500">
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// pages/EmployeeDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EmployeeDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Detalle del Empleado</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Teléfono:</strong> {user.phone}</p>
      <p><strong>Empresa:</strong> {user.company.name}</p>
    </div>
  );
}

// pages/Message.jsx
export default function Message({ user }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Mensaje</h2>
      <p><strong>Usuario:</strong> {user.name}</p>
      <p>{user.message}</p>
    </div>
  );
}
