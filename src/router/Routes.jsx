import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";
import Home from "../pages/home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import ServiceDetails from "../pages/ServiceDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path:'/services',
          element: <Services></Services>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/profile',
          element: <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        },
        {
          path: '/details/:id',
          element: <PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>
        }
        
    ]
  },
]);

export default router;