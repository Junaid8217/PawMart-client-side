import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";
import Home from "../pages/home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import ServiceDetails from "../pages/ServiceDetails";
import ForgetPass from "../pages/ForgetPass";
import Error from "../pages/Error";
import AddService from "../pages/AddService";
import MyServices from "../pages/MyServices";
import UpdateService from "../pages/UpdateService";
import MyOrders from "../pages/MyOrders";

// Dashboard imports
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardOverview from "../pages/dashboard/DashboardOverview";
import DashboardProfile from "../pages/dashboard/DashboardProfile";
import DashboardMyServices from "../pages/dashboard/DashboardMyServices";
import DashboardAddService from "../pages/dashboard/DashboardAddService";
import DashboardUpdateService from "../pages/dashboard/DashboardUpdateService";
import DashboardMyOrders from "../pages/dashboard/DashboardMyOrders";

// Admin dashboard imports
import AllServices from "../pages/dashboard/admin/AllServices";
import AllOrders from "../pages/dashboard/admin/AllOrders";
import UsersManagement from "../pages/dashboard/admin/UsersManagement";
import Analytics from "../pages/dashboard/admin/Analytics";
import AdminRoute from "../components/AdminRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
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
          element: <ServiceDetails></ServiceDetails>
        },
        {
          path: '/forget/:email',
          element: <ForgetPass></ForgetPass>
        },
        {
          path: '/add-service',
          element: <PrivateRoute><AddService></AddService></PrivateRoute>
        },
        {
          path: '/my-services',
          element: <PrivateRoute><MyServices></MyServices></PrivateRoute>
        },
        {
          path: '/update-service/:id',
          element: <UpdateService></UpdateService>
        },
        {
          path:'/my-orders',
          element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
        }
        
    ]
  },
  // Dashboard Routes
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardOverview></DashboardOverview>
      },
      {
        path: "/dashboard/profile",
        element: <DashboardProfile></DashboardProfile>
      },
      {
        path: "/dashboard/my-services",
        element: <DashboardMyServices></DashboardMyServices>
      },
      {
        path: "/dashboard/add-service",
        element: <DashboardAddService></DashboardAddService>
      },
      {
        path: "/dashboard/update-service/:id",
        element: <DashboardUpdateService></DashboardUpdateService>
      },
      {
        path: "/dashboard/my-orders",
        element: <DashboardMyOrders></DashboardMyOrders>
      },
      // Admin Routes
      {
        path: "/dashboard/all-services",
        element: <AdminRoute><AllServices></AllServices></AdminRoute>
      },
      {
        path: "/dashboard/all-orders",
        element: <AdminRoute><AllOrders></AllOrders></AdminRoute>
      },
      {
        path: "/dashboard/users",
        element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
      },
      {
        path: "/dashboard/analytics",
        element: <AdminRoute><Analytics></Analytics></AdminRoute>
      }
    ]
  }
]);

export default router;