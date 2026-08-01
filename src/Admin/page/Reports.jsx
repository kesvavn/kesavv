import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import "../../Admin/pagecss/Reports.css";


function Reports(){

  const COLORS = [
  "#16a34a", // Confirmed - Green
  "#f59e0b", // Pending - Orange
  "#dc2626"  // Cancelled - Red
];

const [reportData,setReportData] = useState({
  totalBookings:0,
  confirmed:0,
  pending:0,
  cancelled:0,
  revenue:0
});


const [monthlyRevenue,setMonthlyRevenue]=useState([]);

const [statusData,setStatusData]=useState([]);



useEffect(()=>{

 getReports();

},[]);



const getReports = async()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/requests"
);


const requests = res.data;



const totalBookings=requests.length;


const confirmed=requests.filter(
(item)=>item.status==="Confirmed"
).length;



const pending=requests.filter(
(item)=>item.status==="Pending"
).length;



const cancelled=requests.filter(
(item)=>item.status==="Cancelled"
).length;



const revenue=requests
.filter(item=>item.status==="Confirmed")
.reduce(
(sum,item)=>sum+Number(item.totalPrice||0),
0
);



setReportData({
 totalBookings,
 confirmed,
 pending,
 cancelled,
 revenue
});



// status chart

setStatusData([
{
 name:"Confirmed",
 value:confirmed
},
{
 name:"Pending",
 value:pending
},
{
 name:"Cancelled",
 value:cancelled
}
]);




// monthly revenue

const monthly={};


requests
.filter(item=>item.status==="Confirmed")
.forEach(item=>{

const month=new Date(
item.createdAt
).toLocaleString(
"default",
{
month:"short"
}
);


monthly[month]=
(monthly[month]||0)
+
Number(item.totalPrice||0);


});



setMonthlyRevenue(
Object.keys(monthly).map(month=>({

month,
amount:monthly[month]

}))
);



}
catch(error){

console.log(error);

}

}




return(

<div className="reports-container">


<h2>Reports</h2>


<div className="report-cards">


<div className="report-card">
<h5>Total Bookings</h5>
<h2>{reportData.totalBookings}</h2>
</div>


<div className="report-card">
<h5>Confirmed Events</h5>
<h2>{reportData.confirmed}</h2>
</div>


<div className="report-card">
<h5>Pending Requests</h5>
<h2>{reportData.pending}</h2>
</div>


<div className="report-card">
<h5>Revenue</h5>
<h2>
₹ {reportData.revenue.toLocaleString()}
</h2>
</div>


</div>



<div className="charts">


<div className="chart-box">

<h4>Monthly Revenue</h4>


<ResponsiveContainer width="100%" height={300}>

<BarChart data={monthlyRevenue}>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Bar 
dataKey="amount"
/>

</BarChart>


</ResponsiveContainer>


</div>




<div className="chart-box">

<h4>Booking Status</h4>


<ResponsiveContainer width="100%" height={300}>


<PieChart>


<Pie
data={statusData}
dataKey="value"
nameKey="name"
outerRadius={100}
>


{
 statusData.map((item,index)=>(

  <Cell 
    key={index}
    fill={COLORS[index]}
  />

 ))
}


</Pie>


<Tooltip/>

<Legend/>


</PieChart>


</ResponsiveContainer>


</div>


</div>


</div>

)

}


export default Reports;