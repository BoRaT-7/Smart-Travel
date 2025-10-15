import { createBrowserRouter } from "react-router-dom";
import Homelayout from "../Layout/Homelayout"

const Router = createBrowserRouter([
  {
    path:"/",
    element: <Homelayout></Homelayout>
  },
  {
    path:"/news",
    element:<h1>News Layout</h1>
  },
  {
    path:"auth",
    element:<h2>Login</h2>
  },
  {
    path: "*",
    element: <h1>404 Error</h1>,
  },
]);

export default Router;
