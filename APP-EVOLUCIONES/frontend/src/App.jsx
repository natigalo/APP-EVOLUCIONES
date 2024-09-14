import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// views

import Dashboard from "./views/admin/Dashboard.jsx";

// components

import AdminNavbar from "./components/Navbars/AdminNavbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import HeaderStats from "./components/Headers/HeaderStats.jsx";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

function App() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            {/* <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} /> */}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}

export default App 
/* 
import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
  return (
    <div className='bg-blue-400 w-full h-48 '>
      <h1 >Actividades</h1>
      <ul>
        {actividades.map((act) => (
          <li key={act.ID_ACT}>{act.NAME_ACT}</li>
        ))}
      </ul>
      <div>
        <h2>Agregar Habilidad</h2>
        <input
          type="text"
          value={habilidad}
          onChange={(e) => setHabilidad(e.target.value)}
        />
        <button onClick={handleAddHabilidad}>Agregar</button>
      </div>
    </>
  );
};
 
export default App; 
 */