import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import "../Styles/admin.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <Header />

        <div className="admin-content">
          {children}
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;