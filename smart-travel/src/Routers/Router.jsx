// Router.jsx (fixed)
import { createBrowserRouter } from "react-router-dom";
import Homelayout from "../Layout/Homelayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import TopDestinationDetails from "../Pages/TopDestinationDetails"; // ✅ এই লাইনটা যোগ করো

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout />,
  },
  {
    path: "/news",
    element: <h1>News Layout</h1>,
  },
  {
    path: "/destination/:id",
    element: <TopDestinationDetails />, // ✅ এখন এটা কাজ করবে
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />, // ✅ ছোট ফিক্স
  },
  {
    path: "*",
    element: <h1>404 Error</h1>,
  },
]);

export default Router;
