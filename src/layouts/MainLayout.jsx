import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <>
      <header>
        {" "}
        <nav>this is nav bar</nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>this is footer</footer>
    </>
  );
};

export default MainLayout;
