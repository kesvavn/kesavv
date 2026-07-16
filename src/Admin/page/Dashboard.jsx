import React, { useEffect, useState } from "react";
import axios from "axios";

import RevenueChart from "../Component/RevenueChart";
import BookingStatistics from "../Component/BookingStatistics";
import DashboardCard from "../Component/DashboardCard";

import "../Dashboard.css";


function Dashboard(){


const [revenueData,setRevenueData]=useState([]);

const [bookingData,setBookingData]=useState([]);
const [userStats,setUserStats] = useState({

totalUsers:0,

todayLogin:0,

newUsers:0

});


const [stats,setStats]=useState({

totalRequests:0,

confirmedEvents:0,

revenue:0

});




const getDashboardData = async()=>{


try{


const res = await axios.get(
"http://localhost:5000/api/requests"
);


const requests = res.data;



// Total Requests

const total = requests.length;




// Confirmed Events

const confirmed = requests.filter(

(item)=>

item.status==="Confirmed"

).length;




// Revenue

const revenue = requests

.filter(

(item)=>

item.status==="Confirmed"

)

.reduce(

(sum,item)=>

sum + Number(item.totalPrice || 0),

0

);




setStats({

totalRequests:total,

confirmedEvents:confirmed,

revenue:revenue

});





// Monthly Revenue Chart


const monthly={};


requests

.filter(
item=>item.status==="Confirmed"
)

.forEach(item=>{


const month = new Date(
item.createdAt
)

.toLocaleString(
"default",
{
month:"short"
}
);



if(!monthly[month]){

monthly[month]=0;

}


monthly[month]+=Number(
item.totalPrice || 0
);



});




setRevenueData(

Object.keys(monthly)

.map(month=>({

month:month,

revenue:monthly[month]

}))

);





// Booking Statistics


const types={};



requests.forEach(item=>{


if(!types[item.functionType]){

types[item.functionType]=0;

}


types[item.functionType]++;


});




setBookingData(

Object.keys(types)

.map(type=>({

type:type,

count:types[type]

}))

);

const users = await axios.get(

"http://localhost:5000/api/auth/users-count"

);


setUserStats(users.data);

}

catch(error){

console.log(error);

}


};




useEffect(()=>{

getDashboardData();

},[]);




return(

<div>




<h2 className="page-title">
Dashboard
</h2>



<div className="cards">


<DashboardCard

title="Total Requests"

value={stats.totalRequests}

color="#2563eb"

/>


<DashboardCard

title="Confirmed Events"

value={stats.confirmedEvents}

color="#16a34a"

/>


<DashboardCard

title="Total Revenue"

value={`₹ ${stats.revenue.toLocaleString()}`}

color="#f59e0b"

/>


</div>




<div className="dashboard-charts">


<RevenueChart

data={revenueData}

/>


<BookingStatistics

data={bookingData}

/>


</div>

<div className="user-stats">


<div className="user-card">

<div>
<h5>Total Customers</h5>
<h2>{userStats.totalUsers}</h2>
</div>

<div className="user-icon customer">
👥
</div>

</div>



<div className="user-card">

<div>
<h5>Today's Login</h5>
<h2>{userStats.todayLogin}</h2>
</div>

<div className="user-icon login">
🔐
</div>

</div>



<div className="user-card">

<div>
<h5>New Customers</h5>
<h2>{userStats.newUsers}</h2>
</div>

<div className="user-icon new">
✨
</div>

</div>


</div>


</div>

)


}


export default Dashboard;