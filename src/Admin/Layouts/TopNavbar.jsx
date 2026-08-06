import { useState, useEffect } from "react";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../Admin.css";


function TopNavbar() {

const [darkMode,setDarkMode] = useState(false);

const [notificationCount,setNotificationCount]=useState(0);

const [mailCount,setMailCount]=useState(0);

//admin data
const [admin,setAdmin] = useState(null);


useEffect(()=>{

const adminData = localStorage.getItem("admin");

if(adminData){
 setAdmin(JSON.parse(adminData));
}

getNotificationCount();
getMailCount();

},[]);

//theme
const navigate = useNavigate();

const today = new Date().toLocaleDateString("en-IN", {
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric",
});



useEffect(()=>{

getNotificationCount();
getMailCount();

},[]);



// Notification Count

const getNotificationCount = async()=>{

try{

const res = await fetch(
"http://localhost:5000/api/notifications/count"
);


const data = await res.json();

setNotificationCount(data.count);


}
catch(error){

console.log(error);

}

};



// Mail Count

const getMailCount = async()=>{

try{

const res = await fetch(
"http://localhost:5000/api/mails/count"
);


const data = await res.json();

setMailCount(data.count);


}
catch(error){

console.log(error);

}

};



return (

<div className={`top-navbar ${darkMode ? "dark":""}`}>



<div className="top-left">


<FaBars className="menu-icon"/>


<div className="search-box">

<FaSearch/>

<input
type="text"
placeholder="Search..."
/>

</div>


</div>





<div className="top-right">


<div className="current-date">

📅 {today}

</div>





<div 
className="icon-box"
onClick={()=>setDarkMode(!darkMode)}
>

{
darkMode ?
<FaSun/>
:
<FaMoon/>
}

</div>






{/* MAIL */}

<div 
className="icon-box"
onClick={()=>navigate("/admin/AdminMail")}
>

<FaEnvelope/>


{
mailCount > 0 &&

<span className="badge1">

{mailCount}

</span>

}


</div>






{/* NOTIFICATION */}

<div 
className="icon-box"
onClick={()=>navigate("/admin/notifications")}
>

<FaBell/>


{
notificationCount > 0 &&

<span className="badge">

{notificationCount}

</span>

}


</div>






<div className="profile">


<FaUserCircle className="profile-icon"/>


<div>
<h6>
 {admin?.name || "Admin"}
</h6>

<small>
 {admin?.role || "Administrator"}
</small>


</div>


</div>



</div>



</div>


)

}


export default TopNavbar;