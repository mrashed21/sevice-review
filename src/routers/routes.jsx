import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ServiceDetails from "../components/service/ServiceDetails";
import AuthProvider from "../context/AuthProvaider";
import MainLayout from "../layouts/MainLayout";
import AddService from "../pages/AddService";
import Home from "../pages/Home";
import Services from "../pages/Services";

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
      { path: "/service/add", element: <AddService /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default routes;
