import React, { useEffect, useState } from "react";
import axios from "axios";

import RevenueChart from "../Component/RevenueChart";
import BookingStatistics from "../Component/BookingStatistics";
import DashboardCard from "../Component/DashboardCard";

import "../Dashboard.css";

function Dashboard() {

  const [revenueData, setRevenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    todayLogin: 0,
    newUsers: 0,
  });

  const [stats, setStats] = useState({
    totalRequests: 0,
    confirmedEvents: 0,
    pendingRequests: 0,
    cancelledRequests: 0,
    todayEvents: 0,
    totalVenues: 0,
    revenue: 0,
  });

  const getDashboardData = async () => {
    try {

      // Requests
      const res = await axios.get(
        "http://localhost:5000/api/requests"
      );

      const requests = res.data;

      // Venues
      const venueRes = await axios.get(
        "http://localhost:5000/api/venues"
      );

      // Users
      const users = await axios.get(
        "http://localhost:5000/api/auth/users-count"
      );

      setUserStats(users.data);

      const total = requests.length;

      const confirmed = requests.filter(
        item => item.status === "Confirmed"
      ).length;

      const pending = requests.filter(
        item => item.status === "Pending"
      ).length;

      const cancelled = requests.filter(
        item => item.status === "Cancelled"
      ).length;

      const revenue = requests
        .filter(item => item.status === "Confirmed")
        .reduce(
          (sum, item) => sum + Number(item.totalPrice || 0),
          0
        );

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const todayEvents = requests.filter(
        item =>
          item.functionDate === today &&
          item.status === "Confirmed"
      ).length;

      const totalVenues = venueRes.data.length;

      setStats({
        totalRequests: total,
        confirmedEvents: confirmed,
        pendingRequests: pending,
        cancelledRequests: cancelled,
        todayEvents,
        totalVenues,
        revenue,
      });

      // Revenue Chart

      const monthly = {};

      requests
        .filter(item => item.status === "Confirmed")
        .forEach(item => {

          const month = new Date(item.createdAt)
            .toLocaleString("default", {
              month: "short",
            });

          monthly[month] =
            (monthly[month] || 0) +
            Number(item.totalPrice || 0);

        });

      setRevenueData(
        Object.keys(monthly).map(month => ({
          month,
          revenue: monthly[month],
        }))
      );

      // Booking Statistics

      const types = {};

      requests.forEach(item => {

        types[item.functionType] =
          (types[item.functionType] || 0) + 1;

      });

      setBookingData(
        Object.keys(types).map(type => ({
          type,
          count: types[type],
        }))
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>

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
          title="Pending Requests"
          value={stats.pendingRequests}
          color="#f59e0b"
        />

        <DashboardCard
          title="Cancelled Requests"
          value={stats.cancelledRequests}
          color="#dc2626"
        />

        <DashboardCard
          title="Total Venues"
          value={stats.totalVenues}
          color="#7c3aed"
        />

        <DashboardCard
          title="Today's Events"
          value={stats.todayEvents}
          color="#0891b2"
        />

        <DashboardCard
          title="Total Revenue"
          value={`₹ ${stats.revenue.toLocaleString()}`}
          color="#059669"
        />

      </div>

      <div className="dashboard-charts">
        <RevenueChart data={revenueData} />
        <BookingStatistics data={bookingData} />
      </div>

      <div className="user-stats">

        <div className="user-card">
          <div>
            <h5>Total Customers</h5>
            <h2>{userStats.totalUsers}</h2>
          </div>
          <div className="user-icon customer">👥</div>
        </div>

        <div className="user-card">
          <div>
            <h5>Today's Login</h5>
            <h2>{userStats.todayLogin}</h2>
          </div>
          <div className="user-icon login">🔐</div>
        </div>

        <div className="user-card">
          <div>
            <h5>New Customers</h5>
            <h2>{userStats.newUsers}</h2>
          </div>
          <div className="user-icon new">✨</div>
        </div>

      </div>

    </>
  );
}

export default Dashboard;