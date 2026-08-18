import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./MyBookings.css";
import ReviewForm from "../Form/ReviewForm";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  
  const [policies, setPolicies] = useState([]);
const [showCancel, setShowCancel] = useState(false);
const [cancelBooking, setCancelBooking] = useState(null);


const getPolicies = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/cancellation-policies"
    );

    setPolicies(res.data);
  } catch (err) {
    console.log(err);
  }
};
const handleCancelBooking = async () => {
  try {
    if (!cancelBooking) return;

    const token = localStorage.getItem("token");

    const res = await axios.put(
      `http://localhost:5000/api/requests/cancel/${cancelBooking._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data.data;

    alert(
      `Booking Cancelled Successfully\n\n` +
      `Cancellation Charge: ₹${data.cancellationCharge.toLocaleString()}\n` +
      `Refund Amount: ₹${data.refundAmount.toLocaleString()}`
    );

    setShowCancel(false);
    setCancelBooking(null);

    getBookings();

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Cancellation failed"
    );
  }
};

  useEffect(() => {
    getBookings();
     getPolicies();
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
const getSelectedPolicy = () => {
  if (!cancelBooking?.cancellationPolicy) {
    return null;
  }

  return policies.find(
    (policy) =>
      policy.title?.trim() ===
      cancelBooking.cancellationPolicy?.trim()
  );
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
             
             <p>
  <strong>AC Rooms:</strong> {item.acRooms || 0}
</p>

<p>
  <strong>Non-AC Rooms:</strong> {item.nonAcRooms || 0}
</p>

              <p><strong>Phone:</strong> {item.phone}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={item.status.toLowerCase()}>
                  {item.status}
                </span>
              </p>

              <h4>₹ {item.totalPrice?.toLocaleString()}</h4>
              <hr />

<h4>Payment Details</h4>

<p>
  <strong>Payment Status:</strong>{" "}
  <span
    className={`badge ${
      item.paymentStatus === "Paid"
        ? "bg-success"
        : item.paymentStatus === "Partial"
        ? "bg-warning text-dark"
        : "bg-danger"
    }`}
  >
    {item.paymentStatus || "Pending"}
  </span>
</p>

<p>
  <strong>Payment Method:</strong> {item.paymentMethod || "-"}
</p>

<p>
  <strong>Advance Paid:</strong> ₹ {item.advanceAmount?.toLocaleString() || 0}
</p>

<p>
  <strong>Balance Amount:</strong> ₹ {item.balanceAmount?.toLocaleString() || 0}
</p>

{item.paymentId && (
  <button
    className="btn btn-primary mt-3"
    onClick={() =>
      window.open(
        `http://localhost:5000/api/payments/receipt/${item.paymentId}`,
        "_blank"
      )
    }
  >
    Download Receipt
  </button>

  
)}

{item.status === "Confirmed" && (
  <>
    <button
      className="btn btn-danger mt-2 ms-2"
      onClick={() => {
        setCancelBooking(item);
        setShowCancel(true);
      }}
    >
      Cancel Booking
    </button>

    <button
      className="btn btn-success mt-2 ms-2"
      onClick={() => {
        setSelectedBooking(item);
        setShowReview(true);
      }}
    >
      Write Review
    </button>
  </>
)}

            </div>
            

          </div>
        ))
      )}
      
      <Modal
  show={showReview}
  onHide={() => setShowReview(false)}
  centered
  size="lg"
>
  <Modal.Header closeButton>
    <Modal.Title>Share Your Experience</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {selectedBooking && (
      <ReviewForm booking={selectedBooking} />
    )}
  </Modal.Body>
</Modal>

{/* Cancellation Policy Modal */}

<Modal
  show={showCancel}
  onHide={() => setShowCancel(false)}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Cancellation Policy</Modal.Title>
  </Modal.Header>

  <Modal.Body>

    {cancelBooking && (
      <>
        <p>
          <strong>Venue:</strong>{" "}
          {cancelBooking.venueName}
        </p>

        <p>
          <strong>Booking Amount:</strong>{" "}
          ₹ {cancelBooking.totalPrice?.toLocaleString()}
        </p>

        <hr />

        <h5>Cancellation Policy</h5>

        {(() => {
  const selectedPolicy = getSelectedPolicy();

  const grandTotal =
    Number(cancelBooking.grandTotal) ||
    Number(cancelBooking.totalPrice) ||
    0;

  const advance =
    Number(cancelBooking.advanceAmount) || 0;

  const percentage =
    Number(selectedPolicy?.percentage) || 0;

  const cancellationCharge =
    (grandTotal * percentage) / 100;

  const refundAmount =
    Math.max(advance - cancellationCharge, 0);

  if (!selectedPolicy) {
    return (
      <p className="text-danger">
        No cancellation policy selected for this booking.
      </p>
    );
  }

  return (
    <div>

      <h6>
        <strong>{selectedPolicy.title}</strong>
      </h6>

      <p>
        {selectedPolicy.description}
      </p>

      <p>
        <strong>Cancellation Charge:</strong>{" "}
        {percentage}%
      </p>

      <p>
        <strong>Booking Amount:</strong>{" "}
        ₹ {grandTotal.toLocaleString()}
      </p>

      <p>
        <strong>Advance Paid:</strong>{" "}
        ₹ {advance.toLocaleString()}
      </p>

      <p className="text-danger">
        <strong>Cancellation Amount:</strong>{" "}
        ₹ {cancellationCharge.toLocaleString()}
      </p>

      <p className="text-success">
        <strong>Estimated Refund:</strong>{" "}
        ₹ {refundAmount.toLocaleString()}
      </p>

    </div>
  );
})()}

        <p className="text-danger">
          Cancellation charges may apply based on the
          cancellation policy.
        </p>
      </>
    )}

  </Modal.Body>

  <Modal.Footer>

    <Button
      variant="secondary"
      onClick={() => setShowCancel(false)}
    >
      Close
    </Button>

    <Button
  variant="danger"
  onClick={handleCancelBooking}
>
  Confirm Cancellation
</Button>

  </Modal.Footer>
</Modal>
    </div>
    
  );
}

export default MyBookings;