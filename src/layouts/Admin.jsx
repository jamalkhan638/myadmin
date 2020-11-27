 
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import { style } from "variables/Variables.jsx";

import routes from "routes.js";

import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Tariff from "views/Tariff";
import AddTariff from "views/AddTariff.jsx"
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import CustomersList from "../views/CustomersList"
import Vehicles from "../views/Vehicles"
import Reports from "../views/Reports"

import Profile from '../views/profile';
import CaptainProfile from '../views/captainProfile'



import image from "assets/img/sidebar-3.jpg";
import BlockedAdminResult from "views/BlockedAdminResult"
import AddVehicles from "views/AddVehicles";
import Captain from "views/Captain";
import Rides from "views/Rides";
import { Report } from "@material-ui/icons";
import AddCaptain from "views/AddCaptain";
import Input from '../views/input';
import ShowDriver from "views/showDriver";
import CaptainRide from "views/captainRide";
import CustomerRide from '../views/customerRide';
import EditCustomer from '../views/editCustomer'
import CustomerReport from "views/customerReport";
import CaptainReport from '../views/captainReport'
import EditCaptain from "views/editCaptain";
import ShowCaptainRideDetail from "views/showcaptainRideDetail";
import Ledger from "views/ledger";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }
  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Razzaq Dashboard</b>
          
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
        
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
         Welcome to <b>Razzaq Dashboard</b>
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 15
    });
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        color={this.state.color}
        hasImage={this.state.hasImage}/>
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={"admin"}
          />
          <Switch>
       
          <Route
            path='/admin/dashboard'
            render={props => (
              <Dashboard
                handleClick={this.handleNotificationClick}
              />
            )}
           
          />

<Route
            path='/admin/tariff'
            render={props => (
              <Tariff
                handleClick={this.handleNotificationClick}
              />
            )}
           
          />
            <Route
            path='/admin/table'
            render={props => (
              <TableList
                handleClick={this.handleNotificationClick}
              />
            )}
           
          />
        
            <Route
            path='/admin/customer'
            render={props => (
              <CustomersList
                handleClick={this.handleNotificationClick}
              />
            )}
           
          />

          <Route
            path='/admin/captain'
            render={props => (
              <Captain
                handleClick={this.handleNotificationClick}
              />
            )}
           
          />
          <Route
            path='/admin/addCaptain'
            render={props => (
              <AddCaptain
                handleClick={this.handleNotificationClick}
              />
            )}
           
          />

            <Route
            path='/admin/user'
            render={props => (
              <UserProfile
                handleClick={this.handleNotificationClick}
              />
            )}
           
          />
                      <Route
            path='/admin/addTariff'
            render={props => (
              <AddTariff {...props}
              />
            )}
           
          />

            <Route
            path='/admin/EditTarrif:id'
            render={props => (
              <AddTariff {...props}
              />
            )}
           
          />
        
            <Route
            path='/admin/vehicles'
            render={props => (
              <Vehicles
                
              />
              
            )}
           
          />
              <Route
            path='/admin/addVehicles:id'
            render={props => (
              <AddVehicles {...props}
                
              />
              
            )}
           
          />
           <Route
            path='/admin/newaddVehicles'
            render={props => (
              <AddVehicles {...props}
                
              />
              
            )}
           
          />
            <Route
            path="/admin/rides"
            render={(props) => <Rides {...props} />}
          />


            <Route
            path='/admin/report'
            render={props => (
              <Reports
                
              />
              
            )}
           
          />
            <Route
            path='/admin/icons'
            render={props => (
              <Icons
                handleClick={this.handleNotificationClick}
              />
              
            )}
           
          />
          
          {/* <Route
            path='/admin/input'
            render={props => (
              <Input {...props}
                handleClick={this.handleNotificationClick}
              />
              
            )}
           
          /> */}

           <Route
            path='/admin/input:id'
            render={props => (
              <Input {...props}
              />
            )}
           
          />








           <Route
            path='/admin/showDriver'
            render={props => (
              <ShowDriver {...props}
              />
            )}
           
          />
           <Route
            path='/admin/profile:id'
            render={props => (
              <Profile {...props}
              />
            )}
           
          />
            <Route
            path='/admin/captainProfile:id'
            render={props => (
              <CaptainProfile {...props}
              />
            )}
           
          />
           <Route
            path='/admin/ledger:id'
            render={props => (
              <Ledger {...props}
              />
            )}
           
          />
     <Route
            path='/admin/captainRide:id'
            render={props => (
              <CaptainRide {...props}
              />
            )}
           
          />
            <Route
            path='/admin/customerRide:id'
            render={props => (
              <CustomerRide {...props}
              />
            )}
           
          />
  <Route
            path='/admin/editCustomer:id'
            render={props => (
              <EditCustomer {...props}
              />
            )}
           
          />
  <Route
            path='/admin/editCaptain:id'
            render={props => (
              <EditCaptain {...props}
              />
            )}
           
          />
<Route
            path='/admin/customerReport:id'
            render={props => (
              <CustomerReport {...props}
              />
            )}
           
          />

<Route
            path='/admin/captainReport:id'
            render={props => (
              <CaptainReport {...props}
              />
            )}
           
          />
          <Route
            path='/admin/showcaptainRideDetail:id'
            render={props => (
              <ShowCaptainRideDetail {...props}
              />
            )}
           
          />
         
          </Switch>
          <Footer />
          <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            handleHasImage={this.handleHasImage}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            mini={this.state["mini"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          />
        </div>
      </div>
    );
  }
}

export default Admin;
