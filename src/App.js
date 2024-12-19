import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainNavbar from "./components/MainNavbar";
import { useSelector } from "react-redux";
import MainFooter from "./components/MainFooter";
function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo ? (
        <header>
          <MainNavbar />
        </header>
      ) : (
        ""
      )}

      <main>
        <Outlet />
        <MainFooter/>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
