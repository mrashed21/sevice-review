import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
const MainLayout = () => {
  return (
    <>
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
    </>
  );
};

export default MainLayout;
