import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/requests/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="booking-container">
      <h2 className="booking-title">My Bookings</h2>

      {bookings.length === 0 ? (
        <h4>No Bookings Found</h4>
      ) : (
        bookings.map((item) => (
          <div className="booking-card" key={item._id}>

           <img
 src={
   item.image?.startsWith("/uploads")
   ? `http://localhost:5000${item.image}`
   : `http://localhost:5000/uploads/${item.image}`
 }
 alt={item.venueName}
 className="booking-image"
/>

            <div className="booking-details">

              <h3>{item.venueName}</h3>

              <p><strong>Name:</strong> {item.fullName}</p>

              <p><strong>Function:</strong> {item.functionType}</p>

              <p><strong>Date:</strong> {item.functionDate}</p>

              <p><strong>Guests:</strong> {item.guests}</p>

              <p><strong>Rooms:</strong> {item.rooms}</p>

              <p><strong>Phone:</strong> {item.phone}</p>

              <p>
                <strong>Status :</strong>

                <span className={item.status.toLowerCase()}>
                  {item.status}
                </span>
              </p>

            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;