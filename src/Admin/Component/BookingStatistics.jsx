import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";


function BookingStatistics({ data }) {


  const colors = [
    "#2563eb", // Blue
    "#16a34a", // Green
    "#f59e0b", // Orange
    "#dc2626", // Red
    "#9333ea", // Purple
    "#0891b2"  // Cyan
  ];


  return (

    <div className="chart-card">


      <div className="chart-header">

        <h4>
          Booking Statistics
        </h4>

        <p>
          Event category performance
        </p>

      </div>



      <ResponsiveContainer
        width="100%"
        height={300}
      >


        <BarChart
          data={data}
          barSize={45}
        >


          <CartesianGrid
            strokeDasharray="3 3"
          />


          <XAxis
            dataKey="type"
          />


          <YAxis />


          <Tooltip
            contentStyle={{
              background:"#fff",
              borderRadius:"10px",
              border:"none",
              boxShadow:"0 5px 20px rgba(0,0,0,0.15)"
            }}
          />



          <Bar
            dataKey="count"
            radius={[12,12,0,0]}
          >


            {
              data?.map((item,index)=>(

                <Cell

                  key={`cell-${index}`}

                  fill={
                    colors[index % colors.length]
                  }

                />

              ))
            }


          </Bar>


        </BarChart>


      </ResponsiveContainer>


    </div>

  );


}


export default BookingStatistics;