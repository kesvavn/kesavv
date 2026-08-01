import React, { useEffect, useState } from "react";
import axios from "axios";

import RevenueChart from "../Component/RevenueChart";
import BookingStatistics from "../Component/BookingStatistics";
import DashboardCard from "../Component/DashboardCard";

import "../Dashboard.css";

function Dashboard() {
  const [revenueData, setRevenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

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

    totalPayments: 0,
    paidAmount: 0,
    pendingAmount: 0,
    partialPayments: 0,
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

      // Payments
      const paymentRes = await axios.get(
        "http://localhost:5000/api/payments"
      );

      

      const payments = paymentRes.data;

      setUserStats(users.data);

      const total = requests.length;

      const confirmed = requests.filter(
        (item) => item.status === "Confirmed"
      ).length;

      const pending = requests.filter(
        (item) => item.status === "Pending"
      ).length;

      const cancelled = requests.filter(
        (item) => item.status === "Cancelled"
      ).length;

      const revenue = requests
        .filter((item) => item.status === "Confirmed")
        .reduce(
          (sum, item) => sum + Number(item.totalPrice || 0),
          0
        );

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const todayEvents = requests.filter(
        (item) =>
          item.functionDate === today &&
          item.status === "Confirmed"
      ).length;

      const totalVenues = venueRes.data.length;

      // Payment Statistics

      // ==========================
// Payment Statistics
// ==========================

const totalPayments = payments.length;

const paidAmount = payments
  .filter((item) => item.paymentStatus === "Paid")
  .reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0
  );

const pendingAmount = payments
  .filter((item) => item.paymentStatus !== "Paid")
  .reduce(
    (sum, item) => sum + Number(item.balanceAmount || 0),
    0
  );

const partialPayments = payments.filter(
  (item) => item.paymentStatus === "Partial"
).length;

// Recent Payments
setRecentPayments(payments.slice(0, 5));

    setStats({
  totalRequests: total,
  confirmedEvents: confirmed,
  pendingRequests: pending,
  cancelledRequests: cancelled,
  todayEvents,
  totalVenues,
  revenue,

  totalPayments,
  paidAmount,
  pendingAmount,
  partialPayments,
});

      // Revenue Chart

      const monthly = {};

      requests
        .filter((item) => item.status === "Confirmed")
        .forEach((item) => {
          const month = new Date(item.createdAt).toLocaleString(
            "default",
            {
              month: "short",
            }
          );

          monthly[month] =
            (monthly[month] || 0) +
            Number(item.totalPrice || 0);
        });

      setRevenueData(
        Object.keys(monthly).map((month) => ({
          month,
          revenue: monthly[month],
        }))
      );

      // Booking Statistics

      const types = {};

      requests.forEach((item) => {
        types[item.functionType] =
          (types[item.functionType] || 0) + 1;
      });

      setBookingData(
        Object.keys(types).map((type) => ({
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
      <h2 className="page-title">Dashboard</h2>

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

        <DashboardCard
          title="Total Payments"
          value={stats.totalPayments}
          color="#0ea5e9"
        />

        <DashboardCard
          title="Paid Amount"
          value={`₹ ${stats.paidAmount.toLocaleString()}`}
          color="#22c55e"
        />

        <DashboardCard
          title="Pending Amount"
          value={`₹ ${stats.pendingAmount.toLocaleString()}`}
          color="#ef4444"
        />

        <DashboardCard
          title="Partial Payments"
          value={stats.partialPayments}
          color="#f97316"
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
      <div className="card shadow mt-4">
  <div className="card-header bg-primary text-white">
    <h5 className="mb-0">Recent Payments</h5>
  </div>

  <div className="card-body">
    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          <th>Invoice</th>
          <th>Customer</th>
          <th>Venue</th>
          <th>Amount</th>
          <th>Method</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {recentPayments.length > 0 ? (
          recentPayments.map((item) => (
            <tr key={item._id}>
              <td>{item.invoiceNumber}</td>
              <td>{item.customerName}</td>
              <td>{item.venueName}</td>
              <td>₹ {item.totalAmount?.toLocaleString()}</td>
              <td>{item.paymentMethod}</td>
              <td>
                <span
                  className={`badge ${
                    item.paymentStatus === "Paid"
                      ? "bg-success"
                      : item.paymentStatus === "Partial"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                  }`}
                >
                  {item.paymentStatus}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No Payments Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
    </>
  );
}

export default Dashboard;