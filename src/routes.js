 
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import customersList from "./views/CustomersList"

import BlockedAdminResult from "views/BlockedAdminResult";



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    layout: "/admin"
  },
  {
    
    path: "/table",
    name: "Admin",
    icon: "pe-7s-add-user",
  
    layout: "/admin"
  },
  {
    path: "/tariff",
    name: "Tariff",
    icon: "pe-7s-note2",
    layout: "/admin"
  },
  {
    
    path: "/vehicles",
    name: "Vehicles",
    icon: "pe-7s-car",
   
    layout: "/admin"
  },
  {
    
    path: "/captain",
    name: "captain",
    icon: "pe-7s-id",
   
    layout: "/admin"
  },

 
  {
    
    path: "/customer",
    name: "Customer",
    icon: "pe-7s-user",
   
    layout: "/admin"
  },

  {
    path: "/rides",
    name: "Rides",
    icon: "pe-7s-car",
    layout: "/admin"
  },
  {
    path: "/report",
    name: "Reports",
    icon: "pe-7s-news-paper",
    layout: "/admin"
  },
    
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "pe-7s-science",
  //   component: Icons,
  //   layout: "/admin"
  // },
 
];

export default dashboardRoutes;
