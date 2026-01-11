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
import AllScholarships from "../src/pages/Home/AllScholarships/AllScholarships";
import ScholarshipDetails from "../src/pages/ScholarshipDetails/ScholarshipDetails";
import ManageScholarships from "../src/pages/Dashboard/ManageScholarships/ManageScholarships";
import UpdateScholarship from "../src/pages/Dashboard/UpdateScholarship/UpdateScholarship";
import MyApplications from "../src/pages/Dashboard/MyApplications/MyApplications";
import ApplyScholarship from "../src/pages/ApplyScholarship/ApplyScholarship";
import Payment from "../src/pages/Dashboard/Payment/Payment/Payment";
import PaymentSuccess from "../src/pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../src/pages/Dashboard/Payment/PaymentFailed/PaymentFailed";
import ManageAppliedApplications from "../src/pages/Dashboard/ManageAppliedApplications/ManageAppliedApplications";
import MyReviews from "../src/pages/Dashboard/MyReviews/MyReviews";
import AllReviews from "../src/pages/Dashboard/AllReviews/AllReviews";
import ManageUsers from "../src/pages/Dashboard/ManageUsers/ManageUsers";
import Analytics from "../src/pages/Dashboard/Analytics/Analytics";
import AdminRoute from "../src/context/PrivateRoute/AdminRoute";
import ModeratorRoute from "../src/context/PrivateRoute/ModeratorRoute";
import AboutUs from "../src/components/AboutUs/AboutUs";
import Settings from "../src/pages/Dashboard/Settings/Settings";
import Blogs from "../src/pages/Home/Blogs/Blogs";
import ContactUs from "../src/pages/Home/ContactUs/ContactUs";

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
        path: "/all-scholarships",
        Component: AllScholarships,
      },
      {
        path: "/scholarshipDetails/:id",
        element:<ScholarshipDetails></ScholarshipDetails>,
      },
      {
        path: "/apply-scholarship/:id",
        element:<PrivateRoute><ApplyScholarship></ApplyScholarship></PrivateRoute>,
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
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      }
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
        path: "/dashboard/add-scholarship",
        element: <AdminRoute><AddScholarship></AddScholarship></AdminRoute>,
      },
      {
        path: "/dashboard/manage-scholarship",
        element: <AdminRoute><ManageScholarships></ManageScholarships></AdminRoute>,
      },
      {
        path: "/dashboard/update-scholarship/:id",
        Component: UpdateScholarship,
      },
      {
        path: "/dashboard/my-application",
        Component: MyApplications,
      },
      {
        path: "/dashboard/payment/:scholarshipId/:applicationId",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/dashboard/payment-cancelled",
        element: <PaymentFailed></PaymentFailed>
      },
      {
        path: "/dashboard/manage-applied-applications",
        element: <ModeratorRoute><ManageAppliedApplications></ManageAppliedApplications></ModeratorRoute>,
      },
      {
        path: "/dashboard/my-reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "/dashboard/all-reviews",
        element: <ModeratorRoute><AllReviews></AllReviews></ModeratorRoute>,
      },
      {
        path: "/dashboard/manage-users",
        // element: <ManageUsers></ManageUsers>,
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "/dashboard/analytics",
        element: <AdminRoute><Analytics></Analytics></AdminRoute>,
      },
      {
        path: "/dashboard/settings",
        element: <Settings></Settings>
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      }
      
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
export default router;
