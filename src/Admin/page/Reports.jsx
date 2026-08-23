import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import "../../Admin/pagecss/Reports.css";


function Reports() {

  // =========================================
  // COLORS
  // =========================================

  const COLORS = [
    "#16a34a",
    "#f59e0b",
    "#dc2626",
  ];


  // =========================================
  // STATES
  // =========================================

  const [requests, setRequests] = useState([]);

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);


  const [reportData, setReportData] = useState({
    totalBookings: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    revenue: 0,
  });


  const [monthlyRevenue, setMonthlyRevenue] =
    useState([]);


  const [monthlyBookings, setMonthlyBookings] =
    useState([]);


  const [dailyBookings, setDailyBookings] =
    useState([]);


  const [statusData, setStatusData] =
    useState([]);


  // =========================================
  // GET REPORT DATA
  // =========================================

  const getReports = async (isRefresh = false) => {

    try {

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }


      const res = await axios.get(
        "http://localhost:5000/api/requests"
      );


      setRequests(
        Array.isArray(res.data)
          ? res.data
          : []
      );


    } catch (error) {

      console.error(
        "Reports Error:",
        error
      );

    } finally {

      setLoading(false);

      setRefreshing(false);

    }

  };


  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {

    getReports();

  }, []);


  // =========================================
  // FILTERED REQUESTS
  // =========================================

  const filteredRequests = useMemo(() => {

    if (selectedStatus === "All") {

      return requests;

    }


    return requests.filter(
      item =>
        item.status === selectedStatus
    );

  }, [
    requests,
    selectedStatus
  ]);


  // =========================================
  // GENERATE REPORTS
  // =========================================

  useEffect(() => {

    // -----------------------------------------
    // COUNTS
    // -----------------------------------------

    const totalBookings =
      filteredRequests.length;


    const confirmed =
      filteredRequests.filter(
        item =>
          item.status === "Confirmed"
      ).length;


    const pending =
      filteredRequests.filter(
        item =>
          item.status === "Pending"
      ).length;


    const cancelled =
      filteredRequests.filter(
        item =>
          item.status === "Cancelled"
      ).length;


    // -----------------------------------------
    // REVENUE
    // -----------------------------------------

    const revenue =
      filteredRequests
        .filter(
          item =>
            item.status === "Confirmed"
        )
        .reduce(
          (sum, item) =>
            sum +
            Number(
              item.totalPrice || 0
            ),
          0
        );


    setReportData({

      totalBookings,

      confirmed,

      pending,

      cancelled,

      revenue,

    });


    // =========================================
    // BOOKING STATUS
    // =========================================

    setStatusData([

      {
        name: "Confirmed",
        value: confirmed,
      },

      {
        name: "Pending",
        value: pending,
      },

      {
        name: "Cancelled",
        value: cancelled,
      },

    ]);


    // =========================================
    // MONTHLY BOOKING
    // =========================================

    const monthlyStatus = {};


    filteredRequests.forEach(item => {

      if (!item.createdAt) {
        return;
      }


      const date =
        new Date(item.createdAt);


      if (isNaN(date.getTime())) {
        return;
      }


      const monthIndex =
        date.getMonth();


      const monthName =
        date.toLocaleString(
          "default",
          {
            month: "short",
          }
        );


      if (!monthlyStatus[monthIndex]) {

        monthlyStatus[monthIndex] = {

          month: monthName,

          confirmed: 0,

          pending: 0,

          cancelled: 0,

        };

      }


      if (
        item.status ===
        "Confirmed"
      ) {

        monthlyStatus[
          monthIndex
        ].confirmed++;

      }


      if (
        item.status ===
        "Pending"
      ) {

        monthlyStatus[
          monthIndex
        ].pending++;

      }


      if (
        item.status ===
        "Cancelled"
      ) {

        monthlyStatus[
          monthIndex
        ].cancelled++;

      }

    });


    const monthlyBookingArray =
      Object.keys(monthlyStatus)
        .sort(
          (a, b) =>
            Number(a) -
            Number(b)
        )
        .map(key => {

          return {

            month:
              monthlyStatus[key]
                .month,

            confirmed:
              monthlyStatus[key]
                .confirmed,

            pending:
              monthlyStatus[key]
                .pending,

            cancelled:
              monthlyStatus[key]
                .cancelled,

          };

        });


    setMonthlyBookings(
      monthlyBookingArray
    );


    // =========================================
    // MONTHLY REVENUE
    // =========================================

    const monthlyRevenueData = {};


    filteredRequests

      .filter(
        item =>
          item.status ===
          "Confirmed"
      )

      .forEach(item => {

        if (!item.createdAt) {
          return;
        }


        const date =
          new Date(
            item.createdAt
          );


        if (isNaN(date.getTime())) {
          return;
        }


        const monthIndex =
          date.getMonth();


        const monthName =
          date.toLocaleString(
            "default",
            {
              month: "short",
            }
          );


        if (
          !monthlyRevenueData[
            monthIndex
          ]
        ) {

          monthlyRevenueData[
            monthIndex
          ] = {

            month: monthName,

            amount: 0,

          };

        }


        monthlyRevenueData[
          monthIndex
        ].amount +=
          Number(
            item.totalPrice || 0
          );

      });


    setMonthlyRevenue(

      Object.keys(
        monthlyRevenueData
      )

        .sort(
          (a, b) =>
            Number(a) -
            Number(b)
        )

        .map(key => ({

          month:
            monthlyRevenueData[
              key
            ].month,

          amount:
            monthlyRevenueData[
              key
            ].amount,

        }))

    );


    // =========================================
    // DAILY BOOKINGS
    // =========================================

    const daily = {};


    filteredRequests.forEach(item => {

      if (!item.createdAt) {
        return;
      }


      const date =
        new Date(
          item.createdAt
        );


      if (isNaN(date.getTime())) {
        return;
      }


      const dateKey =
        date.toISOString()
          .split("T")[0];


      const displayDate =
        date.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
          }
        );


      if (!daily[dateKey]) {

        daily[dateKey] = {

          date: displayDate,

          bookings: 0,

        };

      }


      daily[dateKey].bookings++;

    });


    setDailyBookings(

      Object.keys(daily)

        .sort()

        .map(key => ({

          date:
            daily[key].date,

          bookings:
            daily[key].bookings,

        }))

    );


  }, [
    filteredRequests
  ]);


  // =========================================
  // FORMAT CURRENCY
  // =========================================

  const formatCurrency = value => {

    return `₹ ${Number(
      value || 0
    ).toLocaleString("en-IN")}`;

  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="reports-loading">

        <div className="reports-spinner">
        </div>

        <p>
          Loading reports...
        </p>

      </div>

    );

  }


  // =========================================
  // RETURN
  // =========================================

  return (

    <div className="reports-container">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="reports-header">

        <div>

          <h2>
            Reports & Analytics
          </h2>

          <p>
            Monitor bookings, revenue and
            event performance
          </p>

        </div>


        <button
          className="reports-refresh-btn"
          onClick={() =>
            getReports(true)
          }
          disabled={refreshing}
        >

          {refreshing
            ? "Refreshing..."
            : "↻ Refresh"}

        </button>

      </div>


      {/* =====================================
          FILTERS
      ===================================== */}

      <div className="report-filter-section">

        <div className="filter-title">

          <span>
            Booking Status
          </span>

        </div>


        <div className="report-filters">

          {[
            "All",
            "Confirmed",
            "Pending",
            "Cancelled",
          ].map(status => (

            <button
              key={status}
              className={
                selectedStatus === status
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSelectedStatus(
                  status
                )
              }
            >

              {status}

            </button>

          ))}

        </div>

      </div>


      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="report-cards">


        {/* Total */}

        <div className="report-card total-card">

          <div className="report-card-content">

            <span>
              Total Bookings
            </span>

            <h3>
              {reportData.totalBookings}
            </h3>

            <small>
              All booking requests
            </small>

          </div>


          <div className="report-card-icon">
            📊
          </div>

        </div>


        {/* Confirmed */}

        <div className="report-card confirmed-card">

          <div className="report-card-content">

            <span>
              Confirmed Events
            </span>

            <h3>
              {reportData.confirmed}
            </h3>

            <small>
              Successfully confirmed
            </small>

          </div>


          <div className="report-card-icon">
            ✓
          </div>

        </div>


        {/* Pending */}

        <div className="report-card pending-card">

          <div className="report-card-content">

            <span>
              Pending Requests
            </span>

            <h3>
              {reportData.pending}
            </h3>

            <small>
              Awaiting confirmation
            </small>

          </div>


          <div className="report-card-icon">
            ⏳
          </div>

        </div>


        {/* Revenue */}

        <div className="report-card revenue-card">

          <div className="report-card-content">

            <span>
              Total Revenue
            </span>

            <h3>
              {formatCurrency(
                reportData.revenue
              )}
            </h3>

            <small>
              From confirmed events
            </small>

          </div>


          <div className="report-card-icon">
            ₹
          </div>

        </div>


      </div>


      {/* =====================================
          ANALYTICS GRID
      ===================================== */}

      <div className="charts">


        {/* ===================================
            MONTHLY REVENUE
        =================================== */}

        <div className="chart-box">

          <div className="chart-header">

            <div>

              <h4>
                Monthly Revenue
              </h4>

              <p>
                Revenue generated by month
              </p>

            </div>

          </div>


          {monthlyRevenue.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart
                data={monthlyRevenue}
                margin={{
                  top: 10,
                  right: 15,
                  left: 10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />


                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                />


                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={
                    value =>
                      `₹${Number(
                        value
                      ).toLocaleString(
                        "en-IN"
                      )}`
                  }
                />


                <Tooltip
                  formatter={value => [
                    formatCurrency(
                      value
                    ),
                    "Revenue",
                  ]}
                />


                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#ffffff",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 7,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          ) : (

            <div className="chart-empty">
              No revenue data available
            </div>

          )}

        </div>


        {/* ===================================
            MONTHLY BOOKINGS
        =================================== */}

        <div className="chart-box">

          <div className="chart-header">

            <div>

              <h4>
                Monthly Booking Statistics
              </h4>

              <p>
                Confirmed, pending and cancelled
                bookings
              </p>

            </div>

          </div>


          {monthlyBookings.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart
                data={monthlyBookings}
                margin={{
                  top: 10,
                  right: 15,
                  left: 5,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />


                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                />


                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                />


                <Tooltip />


                <Legend />


                <Line
                  type="monotone"
                  dataKey="confirmed"
                  name="Confirmed"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />


                <Line
                  type="monotone"
                  dataKey="pending"
                  name="Pending"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />


                <Line
                  type="monotone"
                  dataKey="cancelled"
                  name="Cancelled"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

              </LineChart>

            </ResponsiveContainer>

          ) : (

            <div className="chart-empty">
              No booking data available
            </div>

          )}

        </div>


        {/* ===================================
            BOOKING STATUS
        =================================== */}

        <div className="chart-box">

          <div className="chart-header">

            <div>

              <h4>
                Booking Status
              </h4>

              <p>
                Overall booking distribution
              </p>

            </div>

          </div>


          {statusData.some(
            item =>
              item.value > 0
          ) ? (

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                >

                  {statusData.map(
                    (item, index) => (

                      <Cell
                        key={
                          `${item.name}-${index}`
                        }
                        fill={
                          COLORS[index]
                        }
                      />

                    )
                  )}

                </Pie>


                <Tooltip />


                <Legend
                  verticalAlign="bottom"
                />

              </PieChart>

            </ResponsiveContainer>

          ) : (

            <div className="chart-empty">
              No booking data available
            </div>

          )}

        </div>


        {/* ===================================
            DAILY BOOKINGS
        =================================== */}

        <div className="chart-box">

          <div className="chart-header">

            <div>

              <h4>
                Daily Bookings
              </h4>

              <p>
                Booking requests by day
              </p>

            </div>

          </div>


          {dailyBookings.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={dailyBookings}
                margin={{
                  top: 10,
                  right: 15,
                  left: 5,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />


                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                />


                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                />


                <Tooltip
                  formatter={value => [
                    value,
                    "Bookings",
                  ]}
                />


                <Bar
                  dataKey="bookings"
                  name="Bookings"
                  fill="#2563eb"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          ) : (

            <div className="chart-empty">
              No booking data available
            </div>

          )}

        </div>


      </div>




    </div>

  );

}


export default Reports;