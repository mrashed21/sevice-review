import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import MyReview from "../components/review/MyReview";
import MyServices from "../components/service/MyService";
import ServiceDetails from "../components/service/ServiceDetails";
import AuthProvider from "../context/AuthProvaider";
import MainLayout from "../layouts/MainLayout";
import AddService from "../pages/AddService";
import Home from "../pages/Home";
import Services from "../pages/Services";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "service/details/:id", element: <ServiceDetails /> },
      {
        path: "/service/add",
        element: (
          <PrivateRoute>
            {" "}
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "/service/me",
        element: (
          <PrivateRoute>
            {" "}
            <MyServices />
          </PrivateRoute>
        ),
      },
      {
        path: "review/me",
        element: (
          <PrivateRoute>
            {" "}
            <MyReview />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default routes;
