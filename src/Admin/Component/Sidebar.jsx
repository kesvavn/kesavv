import { Link } from "react-router-dom";
import { FaHome, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaFileInvoiceDollar,FaUsers,FaCog, FaEnvelope, FaQuestionCircle } from "react-icons/fa";
import { Image } from "react-bootstrap";
import Logo1 from "../assets/image/MELODIA-LOGO-03-1.webp";
import "../Styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-logo">
  <Image
    src={Logo1}
    alt="Melodia Logo"
    fluid
    className="sidebar-logo-img1"
  />
</div>

      <div className="sidebar-menu">

        <span className="menu-title">MAIN</span>

        <Link to="/admin" className="sidebar-link">
          <FaHome />
          <span>Dashboard</span>
        </Link>

        <Link to="/admin/venuetypes" className="sidebar-link">
          <FaBuilding />
          <span>Venue Types</span>
        </Link>

        <Link to="/admin/locations" className="sidebar-link">
          <FaMapMarkerAlt />
          <span>Locations</span>
        </Link>

        <span className="menu-title mt-4">BOOKINGS</span>

        <Link to="/admin/bookings" className="sidebar-link">
          <FaCalendarAlt />
          <span>Bookings</span>
        </Link>

        <Link to="/admin/pricing" className="sidebar-link active">
          <FaFileInvoiceDollar />
          <span>Pricing Requests</span>
        </Link>

        <Link to="/admin/enquiries" className="sidebar-link">
          <FaQuestionCircle />
          <span>Enquiries</span>
        </Link>

        <span className="menu-title mt-4">MANAGE</span>

        <Link to="/admin/users" className="sidebar-link">
          <FaUsers />
          <span>Users</span>
        </Link>

        <Link to="/admin/subscribers" className="sidebar-link">
          <FaEnvelope />
          <span>Subscribers</span>
        </Link>

        <Link to="/admin/settings" className="sidebar-link">
          <FaCog />
          <span>Settings</span>
        </Link>

      </div>

      <div className="sidebar-footer">

        <div className="admin-box">

          <img
            src=""
            alt="admin"
            className="admin-img"
          />

          <div>
            <h6>Admin</h6>
            <span>Super Admin</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;