import React, {useEffect, useState} from "react";
import axios from "axios";
import "../pagecss/Notifications.css";


function Notifications(){

const [notifications,setNotifications] = useState([]);


useEffect(()=>{

 getNotifications();

},[]);



const getNotifications = async()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/notifications"
);

setNotifications(res.data);

}
catch(error){

console.log(error);

}

}



return(

<div className="notification-container">


<h2>Notifications</h2>



<div className="notification-list">


{
notifications.length > 0 ?

notifications.map((item)=>(


<div className="notification-card" key={item._id}>


<div className="icon">
🔔
</div>


<div>

<h5>{item.title}</h5>

<p>{item.message}</p>

<span>
{new Date(item.createdAt).toLocaleString()}
</span>


</div>


</div>


))


:

<div className="empty-box">

🔔

<h4>No Notifications</h4>

<p>
You don't have any new notifications
</p>

</div>


}



</div>


</div>


)

}


export default Notifications;