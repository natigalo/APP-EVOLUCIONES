import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

// components

import AdminNavbar from './components/Navbars/AdminNavbar.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import HeaderStats from './components/Headers/HeaderStats.jsx';
// import FooterAdmin from "components/Footers/FooterAdmin.js";


// views

import Dashboard from './views/admin/Dashboard.jsx';

const App = () => {
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

export default App;
