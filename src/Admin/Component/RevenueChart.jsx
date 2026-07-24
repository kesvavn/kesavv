import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";


function RevenueChart({data=[]}){


return(

<div className="chart-box">


<h4>
Revenue Overview
</h4>



<ResponsiveContainer
width="100%"
height={300}
>


<LineChart

data={data}

margin={{
top:20,
right:20,
left:0,
bottom:10
}}

>


<CartesianGrid

strokeDasharray="4 4"

/>



<XAxis


dataKey="month"


tickFormatter={(value,index)=>{

return `${value} ${data[index]?.year}`;

}}


/>



<YAxis

tickFormatter={(value)=>

`₹${value/1000}k`

}

/>



<Tooltip


formatter={(value)=>

[
`₹${value.toLocaleString()}`,
"Revenue"
]

}


labelFormatter={(label,index)=>{

return `${label} ${data[index]?.year}`;

}}


/>



<Line

type="monotone"

dataKey="revenue"

stroke="#2563eb"

strokeWidth={4}

dot={{
r:6
}}

activeDot={{
r:8
}}


/>



</LineChart>


</ResponsiveContainer>


</div>


)

}


export default RevenueChart;