import DashboardCard from "../Component/DashboardCard";
import RevenueChart from "../Component/RevenueChart";
import RecentRequests from "../Component/RecentRequests";
import QuickActions from "../Component/QuickActions";

import {
  FaCalendarCheck,
  FaRupeeSign,
  FaUsers,
  FaClock
} from "react-icons/fa";

import "../Dashboard.css";

function Dashboard() {
  return (
    <div>

      <h2 className="page-title">Dashboard</h2>

      <div className="cards">

        <DashboardCard
          title="Bookings"
          value="125"
          color="#2563eb"
          icon={<FaCalendarCheck />}
        />

        <DashboardCard
          title="Revenue"
          value="₹8,50,000"
          color="#16a34a"
          icon={<FaRupeeSign />}
        />

        <DashboardCard
          title="Customers"
          value="245"
          color="#ea580c"
          icon={<FaUsers />}
        />

        <DashboardCard
          title="Pending"
          value="18"
          color="#dc2626"
          icon={<FaClock />}
        />

      </div>

      <RevenueChart />

      <RecentRequests />

      <QuickActions />

    </div>
  );
}

export default Dashboard;