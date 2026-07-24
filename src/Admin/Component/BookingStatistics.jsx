import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";


function BookingStatistics({ data = [] }) {



const colors = [

  "#2563eb", // Blue
  "#16a34a", // Green
  "#f59e0b", // Orange
  "#dc2626", // Red
  "#9333ea", // Purple
  "#0891b2"  // Cyan

];



const total = data.reduce(
  (sum,item)=> sum + item.count,
  0
);



return (

<div className="chart-card booking-chart">



<div className="chart-header">


<div>

<h3>
Booking Statistics
</h3>


<span>
Event category performance overview
</span>


</div>



<div className="chart-badge">

Total {total}

</div>



</div>





{

data.length === 0 ?


<div className="empty-chart">

No booking data available

</div>



:



<ResponsiveContainer

width="100%"

height={330}

>


<PieChart>



<Pie


data={data}


dataKey="count"


nameKey="type"


cx="50%"


cy="50%"


innerRadius={75}


outerRadius={125}


paddingAngle={6}


animationDuration={1200}



>


{

data.map((item,index)=>(


<Cell


key={`cell-${index}`}


fill={
colors[index % colors.length]
}


/>


))


}


</Pie>





<Tooltip



formatter={(value,name)=>(

[

`${value} Bookings`,

name

]

)}



contentStyle={{

background:"#ffffff",

borderRadius:"14px",

border:"1px solid #e5e7eb",

boxShadow:
"0 10px 30px rgba(0,0,0,0.15)"

}}



labelStyle={{

fontWeight:700,

color:"#111827"

}}



 />






<Legend


verticalAlign="bottom"


height={40}


iconType="circle"


formatter={(value)=> (

<span style={{

color:"#475569",

fontSize:"13px",

fontWeight:600

}}>

{value}

</span>

)}


/>



</PieChart>



</ResponsiveContainer>


}



</div>


)

}



export default BookingStatistics;