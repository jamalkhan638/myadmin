 
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import Login from '../src/components/loginForn/Login';
import AdminLayout from "layouts/Admin.jsx";



ReactDOM.render(
  <HashRouter baseUrl="/build">
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
  
      <Route path="/" render={props => <Login/>} />
    </Switch>
  </HashRouter>,
  
  document.getElementById("root")
);

