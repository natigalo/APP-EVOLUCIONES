import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';

// views
import Dashboard from "./views/admin/Dashboard.jsx";
import Login from "./views/auth/Login.jsx";
import Evoluciones from './views/pages/Evolutions.jsx'

// components
import AdminNavbar from "./components/Navbars/AdminNavbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import HeaderStats from "./components/Headers/HeaderStats.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Cambia a false para probar el login

  const token = localStorage.getItem('token'); // Asegúrate de que 'token' es el nombre correcto

  const api = axios.create({
    baseURL: 'http://localhost:3000', // Cambia la URL base según sea necesario
    headers: {
        Authorization: `${token}`, // Agregar el token al header de autorización
    },
});


useEffect(() => {
  api.get('/consultabd')
      .then((response) => {
          console.log(response.data);
          setIsAuthenticated(true)
      })
      .catch((error) => console.error('Error fetching API:', error));
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      <Switch>
        {/* Rutas protegidas */}
        {isAuthenticated ? (
          <>
            <Route path="/evoluciones" exact>
              <Sidebar />
              <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar />
                <HeaderStats />
                <div className="px-2 md:px-8 mx-auto w-full -m-24">
                  <Evoluciones />
                </div>
              </div>
            </Route>
            <Redirect from="/" to="/evoluciones" />
          </>
        ) : (
          <Route path="/" exact>
            <Login handleLogin={handleLogin} />
          </Route>
        )}
        <Redirect from="*" to="/" /> {/* Redirige cualquier ruta desconocida al login */}
      </Switch>
    </>
  );
}

export default App;