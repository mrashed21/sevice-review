import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="h-16 w-16 text-blue-500" />
      </div>
    );
  }
  return (
    <section>
      <HelmetProvider>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
        <ToastContainer />
      </HelmetProvider>
    </section>
  );
};

export default MainLayout;
