import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentModal from "../Component/PaymentModal";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [selectedPayment, setSelectedPayment] = useState(null);

  const getPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
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
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {payments.length > 0 ? (
                payments.map((item) => (

                  <tr key={item._id}>

                    <td>{item.invoiceNumber}</td>

                    <td>{item.customerName}</td>

                    <td>{item.venueName}</td>

                    <td>₹ {item.totalAmount?.toLocaleString()}</td>

                    <td>₹ {item.advanceAmount?.toLocaleString()}</td>

                    <td>₹ {item.balanceAmount?.toLocaleString()}</td>

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

                    <td>
                      {new Date(item.paymentDate).toLocaleDateString()}
                    </td>

                   <td>

  <button
    className="btn btn-success btn-sm me-2"
    onClick={() => {
      setSelectedPayment(item);
      setShowModal(true);
    }}
  >
    Edit
  </button><br />


  <button
    className="btn btn-danger btn-sm me-2"
    onClick={() => deletePayment(item._id)}
  >
    Delete
  </button><br />


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
  </button><br />


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