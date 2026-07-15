import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import "../Admin.css";

function MainLayout() {

  return (

    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <TopNavbar />

        <div className="admin-content">
          <Outlet />
        </div>

      </div>

    </div>

  );

}

export default MainLayout;