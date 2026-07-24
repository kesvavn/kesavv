import { NavLink } from "react-router-dom";
import { Image } from "react-bootstrap";
import { FaFileContract } from "react-icons/fa";
import { FaHome, FaClipboardList, FaCalendarCheck, FaUsers, FaBuilding, FaGlassCheers, FaGift, FaMoneyBillWave,
  FaCalendarAlt, FaCreditCard, FaImages, FaChartBar, FaBell, FaCog, FaSignOutAlt,} from "react-icons/fa";
import Logomelodia from "../../images/MELODIA-LOGO-03-1.webp"; 

const menus = [
  { name: "Dashboard", path: "/admin", icon: <FaHome /> },
  { name: "Requests", path: "/admin/requests", icon: <FaClipboardList /> },
  { name: "Bookings", path: "/admin/bookings", icon: <FaCalendarCheck /> },
  { name: "Customers", path: "/admin/customers", icon: <FaUsers /> },
  { name: "Venue", path: "/admin/venue", icon: <FaBuilding /> },
  { name: "Packages", path: "/admin/packages", icon: <FaGift /> },
  { name: "Cancellation Policy", path: "/admin/cancellation-policy", icon: <FaFileContract />,},
  { name: "Pricing", path: "/admin/pricing", icon: <FaMoneyBillWave /> },
  { name: "Availability", path: "/admin/availability", icon: <FaCalendarAlt /> },
  { name: "Payments", path: "/admin/payments", icon: <FaCreditCard /> },
  { name: "Gallery", path: "/admin/gallery", icon: <FaImages /> },
  { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
  { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
  { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
];

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo-melodia text-center py-3">
  <Image
    src={Logomelodia}
    alt="Melodia Logo"
    fluid
    style={{ maxWidth: "180px", height: "auto" }}/> 
    <p className="mt-2 mb-0">Admin Panel</p>
    </div>

      <ul>
        {menus.map((menu) => (
          <li key={menu.name}>
            <NavLink to={menu.path}>
              {menu.icon}
              <span>{menu.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="logout">
        <FaSignOutAlt />
        <span>Logout</span>
      </div>

    </div>
  );
}

export default Sidebar;