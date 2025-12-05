import { createBrowserRouter } from "react-router";
import RootLayout from "../src/layout/RootLayout/RootLayout";
import Home from "../src/pages/Home/Home";
import Login from "../src/pages/SignUp-Login/Login";
import Register from "../src/pages/SignUp-Login/Register";
import Profile from "../src/pages/SignUp-Login/Profile/Profile";
import PrivateRoute from "./../src/context/PrivateRoute/PrivateRoute";
import Error from "../src/pages/Error/Error";
import DashboardLayout from "../src/layout/DashboardLayout/DashboardLayout";
import DashboardHome from "../src/pages/Dashboard/DashboardHome/DashboardHome";
import AddScholarship from "../src/pages/Dashboard/AddScholarship/AddScholarship";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [ 
      {
        index: true,
        Component: DashboardHome, 
      },
      {
        path: '/dashboard/add-scholarship',
        Component: AddScholarship,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
export default router;
