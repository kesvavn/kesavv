import { NavLink } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaFileContract } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaHome, FaClipboardList, FaCalendarCheck, FaUsers, FaBuilding,  FaGift, FaMoneyBillWave,
  FaCalendarAlt, FaCreditCard, FaImages, FaChartBar, FaBell, FaCog, FaSignOutAlt} from "react-icons/fa";


const menus = [
  { name: "Dashboard", path: "/admin", icon: <FaHome /> },
  { name: "Requests", path: "/admin/requests", icon: <FaClipboardList /> },
  { name: "Bookings", path: "/admin/bookings", icon: <FaCalendarCheck /> },
  { name: "Customers", path: "/admin/customers", icon: <FaUsers /> },
  { name: "Venue", path: "/admin/venue", icon: <FaBuilding /> },
  { name: "Cancellation Policy", path: "/admin/cancellation-policy", icon: <FaFileContract />,},
  { name: "Pricing", path: "/admin/pricing", icon: <FaMoneyBillWave /> },
  { name: "Availability", path: "/admin/availability", icon: <FaCalendarAlt /> },
  { name: "Payments", path: "/admin/payments", icon: <FaCreditCard /> },
  { name: "Gallery", path: "/admin/gallery", icon: <FaImages /> },
  { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
  { name: "Reviews", path: "/admin/reviews", icon: <FaStar /> },
  { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
  { name: "Mail", path: "/admin/AdminMail", icon: <FaEnvelope /> },
  { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
];

function Sidebar() {

  const navigate = useNavigate();
const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmLogout) {

    localStorage.removeItem("adminToken");

    alert("Logout Successfully!");

    navigate("/admin/login", { replace: true });
  }
};

  //logo
  const [logo,setLogo] = useState("");

useEffect(()=>{

 const fetchLogo = async()=>{

 try{

 const res = await axios.get(
 "http://localhost:5000/api/settings"
 );


 if(res.data?.logo){

 setLogo(
 `http://localhost:5000/uploads/${res.data.logo}`
 );

 }

 }
 catch(err){

 console.log(err);

 }

 };


 fetchLogo();

},[]);



  return (
    <div className="sidebar">

      <div className="logo-melodia text-center py-3">
<Image
 src={
 logo ||
 "https://via.placeholder.com/180"
 }
 alt="Company Logo"
 fluid
 style={{
 maxWidth:"180px",
 height:"auto"
 }}
/>
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
<div 
 className="logout"
 onClick={handleLogout}
 style={{cursor:"pointer"}}
>
  <FaSignOutAlt />
  <span>Logout</span>
</div>

    </div>
  );
}

export default Sidebar;