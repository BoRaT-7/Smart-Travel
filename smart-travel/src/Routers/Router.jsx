import { createBrowserRouter } from "react-router-dom";
import Homelayout from "../Layout/Homelayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import TopDestinationDetails from "../Pages/TopDestinationDetails";

const Router = createBrowserRouter([
  { path: "/", element: <Homelayout /> },
  { path: "/destination/:id", element: <TopDestinationDetails /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "*", element: <h1>404 Error</h1> },
]);

export default Router;
