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


function RevenueChart({data}){


return(

<div className="chart-box">

<h4>
Revenue Overview
</h4>


<ResponsiveContainer width="100%" height={300}>


<LineChart data={data}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis 
dataKey="month"
/>


<YAxis />


<Tooltip />


<Line

type="monotone"

dataKey="revenue"

/>


</LineChart>


</ResponsiveContainer>


</div>

)

}


export default RevenueChart;