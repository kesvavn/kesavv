import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentModal from "../Component/PaymentModal";
import "../pagecss/Payment.css"

function Payments() {
  const [search, setSearch] = useState("");
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [selectedPayment, setSelectedPayment] = useState(null);

const getPayments = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/payments"
    );

    console.log("PAYMENTS FROM BACKEND:", res.data);

    res.data.forEach((item) => {
      console.log(
        item.invoiceNumber,
        "=>",
        item.paymentStatus
      );
    });

    setPayments(res.data);

  } catch (err) {
    console.log(err);
  }
};
  //delete 
  const deletePayment = async (id) => {
  if (!window.confirm("Delete this payment?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/payments/${id}`);
    getPayments();
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Payments</h2>

       <button
  className="btn btn-primary"
  onClick={() => {
    setSelectedPayment(null);
    setShowModal(true);
  }}
>
  + Add Payment
</button>
      </div>

      <div className="card shadow">

        <div className="card-body">

          <div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search by Invoice or Customer..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Venue</th>
                <th>Total</th>
                <th>Advance</th>
                <th>Balance</th>
                <th>Method</th>
                 <th>Date</th>
                <th>Status</th>
               
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {payments.length > 0 ? (
                payments
                .filter((item) =>
                  item.customerName.toLowerCase().includes(search.toLowerCase()) ||
                  item.invoiceNumber.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
         
    
                  <tr key={item._id}>

                    <td>{item.invoiceNumber}</td>

                    <td>{item.customerName}</td>

                    <td>{item.venueName}</td>

                    <td>₹ {item.totalAmount?.toLocaleString()}</td>

                    <td>₹ {item.advanceAmount?.toLocaleString()}</td>

                    <td>₹ {item.balanceAmount?.toLocaleString()}</td>

                    <td>{item.paymentMethod}</td>

                     <td>{new Date(item.paymentDate).toLocaleDateString("en-IN")} </td>  
                  
                  <td>
                <span
                  className={`badge ${
                    String(item.paymentStatus).trim().toLowerCase() === "paid"
                      ? "bg-success"
                      : String(item.paymentStatus).trim().toLowerCase() === "partial"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {item.paymentStatus}
                </span>
              </td>


              <td className="payment-btns">

  <button
    className="btn btn-success btn-sm me-2"
    onClick={() => {
      setSelectedPayment(item);
      setShowModal(true);
    }}
  >
    Edit
  </button>


  <button
    className="btn btn-danger btn-sm me-2"
    onClick={() => deletePayment(item._id)}
  >
    Delete
  </button>


  <button
    className="btn btn-info btn-sm"
    onClick={() => {

      window.open(
        `http://localhost:5000/api/payments/receipt/${item._id}`,
        "_blank"
      );

    }}
  >
    Receipt
  </button>


</td>

                  </tr>

                ))
              ) : (

                <tr>

                  <td colSpan="10" className="text-center">
                    No Payments Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

  <PaymentModal
  show={showModal}
  handleClose={() => setShowModal(false)}
  selectedPayment={selectedPayment}
  getPayments={getPayments}
/>
    </div>
  );
}

export default Payments;