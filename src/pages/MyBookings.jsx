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

    console.log("Token:", token);

    const res = await axios.get(
      "http://localhost:5000/api/requests/my-bookings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Bookings Response:", res.data);

    setBookings(res.data);
  } catch (err) {
    console.log("Status:", err.response?.status);
    console.log("Error:", err.response?.data);
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

            {/* LEFT SIDE */}
            <div className="booking-left">

              <img
                src={
                  item.image?.startsWith("/uploads")
                    ? `http://localhost:5000${item.image}`
                    : `http://localhost:5000/uploads/${item.image}`
                }
                alt={item.venueName}
                className="booking-image"
              />

              <div className="additional-package">
                <h4>Additional Package</h4>

                <p>
                  <strong>Package:</strong>{" "}
                  {item.additionalPackage === "Yes"
                    ? "Selected"
                    : "Not Selected"}
                </p>

                {item.functionType === "Corporate Event" && (
                  <>
                    <p><strong>Stage Setup:</strong> {item.stageSetup || "-"}</p>
                    <p><strong>Sound System:</strong> {item.soundSystem || "-"}</p>
                    <p><strong>LED Screen:</strong> {item.ledScreen || "-"}</p>
                  </>
                )}

                {(item.functionType === "Wedding" ||
                  item.functionType === "Reception") && (
                  <>
                    <p><strong>Makeup:</strong> {item.makeupLevel || "-"}</p>
                    <p><strong>Decoration:</strong> {item.decorationLevel || "-"}</p>
                    <p><strong>Photography:</strong> {item.photographyPackage || "-"}</p>
                    <p><strong>Video:</strong> {item.videoPackage || "-"}</p>
                    <p><strong>Food Category:</strong> {item.foodCategory || "-"}</p>
                    <p><strong>Food Type:</strong> {item.foodType || "-"}</p>
                  </>
                )}

                {item.functionType === "Private Party" && (
                  <>
                    <p><strong>Party Type:</strong> {item.privatePartyType || "-"}</p>
                    <p><strong>Cake:</strong> {item.cakePackage || "-"}</p>
                    <p><strong>Birthday Decoration:</strong> {item.birthdayDecoration || "-"}</p>
                    <p><strong>Photography:</strong> {item.photographyPackage || "-"}</p>
                    <p><strong>Music:</strong> {item.musicEntertainment || "-"}</p>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="booking-details">

              <h3>{item.venueName}</h3>

              <p><strong>Name:</strong> {item.fullName}</p>
              <p><strong>Function:</strong> {item.functionType}</p>
              <p><strong>Date:</strong> {item.functionDate}</p>
              <p><strong>Guests:</strong> {item.guests}</p>
              <p><strong>Rooms:</strong> {item.rooms}</p>
              <p><strong>Phone:</strong> {item.phone}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={item.status.toLowerCase()}>
                  {item.status}
                </span>
              </p>

              <h4>₹ {item.totalPrice?.toLocaleString()}</h4>

            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;