import { createBrowserRouter } from "react-router-dom";
import Homelayout from "../Layout/Homelayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import TopDestinationDetails from "../Pages/TopDestination/TopDestinationDetails";
import GearShopall from "../Pages/Shop/GearShopall";
import ShopOrder from "../Pages/Shop/ShopOrder";
import TopDestinationAll from "../Pages/TopDestination/TopDestinationAll";
import DestinationBook from "../Pages/TopDestination/DestinationBook";
import HotelAll from "../Pages/HotelBooking/HotelAll";
import HotelDetails from "../Pages/HotelBooking/HotelDetails";
import HotelBook from "../Pages/HotelBooking/HotelBook";
import HotelBookingConform from "../Pages/HotelBooking/HotelBookingConform";

const Router = createBrowserRouter([
  { path: "/", element: <Homelayout /> },

  { path: "/destination/:id", element: <TopDestinationDetails /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },

  { path: "/shop", element: <GearShopall /> },
  { path: "/shoporder", element: <ShopOrder /> },

  { path: "/packages", element: <TopDestinationAll /> },
  { path: "/destination/book", element: <DestinationBook /> },

  { path: "/hotel", element: <HotelAll /> },
  { path: "/hotel/:id", element: <HotelDetails /> },
  { path: "/hotel/book/:id", element: <HotelBook /> },
  { path: "/hotel/confirm", element: <HotelBookingConform /> },

  { path: "*", element: <h1>404 Error</h1> },
]);

export default Router;
