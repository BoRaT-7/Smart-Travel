import { createBrowserRouter } from "react-router-dom";
import Homelayout from "../Layout/Homelayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import TopDestinationDetails from "../Pages/TopDestination/TopDestinationDetails";
import GearShopall from "../Pages/Shop/GearShopall";
import ShopOrder from "../Pages/Shop/ShopOrder"; 
import TopDestinationAll from "../Pages/TopDestination/TopDestinationAll";
import DestinationBook from "../Pages/TopDestination/DestinationBook";

const Router = createBrowserRouter([
  { path: "/", element: <Homelayout /> },

  // Top Destination Details page
  { path: "/destination/:id", element: <TopDestinationDetails /> },

  // Auth routes
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },

  // Shop routes
  { path: "/shop", element: <GearShopall /> },
  { path: "/shoporder", element: <ShopOrder /> }, 

  // Packages / TopDestinationAll
  { 
    path: "/packages",
    element: <TopDestinationAll /> // ✅ Previously correct
  },

  // DestinationBook route (NEW / UPDATED for Book button)
  {
    path: "/destination/book",
    element: <DestinationBook /> // ✅ Added / Updated to handle Book button
  },

  // Catch all 404
  { path: "*", element: <h1>404 Error</h1> },
]);

export default Router;
