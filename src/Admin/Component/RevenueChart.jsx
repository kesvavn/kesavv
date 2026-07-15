import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 30000 },
  { month: "Feb", revenue: 45000 },
  { month: "Mar", revenue: 52000 },
  { month: "Apr", revenue: 68000 },
  { month: "May", revenue: 75000 },
  { month: "Jun", revenue: 98000 },
];

function RevenueChart() {
  return (
    <div className="chart-box">

      <h4>Revenue Overview</h4>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#7A3E00"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;