import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

// layouts
// import Admin from "layouts/Admin.js";
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Switch>
          {/* add routes with layouts */}
          <Route path="/admin" component={App} />
          {/* <Route path="/auth" component={Auth} /> */}
          {/* add routes without layouts */}
          {/* <Route path="/landing" exact component={Landing} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/" exact component={Index} /> */}
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>,
  </React.StrictMode>,
)
