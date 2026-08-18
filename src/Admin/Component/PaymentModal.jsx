import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function PaymentModal({
  show,
  handleClose,
  selectedPayment,
  getPayments,
}) {
  const [pricing, setPricing] = useState([]);
      const [bookings, setBookings] = useState([]);
 const [formData,setFormData]=useState({

bookingId:"",
invoiceNumber:"",
customerName:"",
venueName:"",
totalAmount:"",
gstPercentage: "",
gstAmount: "",
advanceAmount:"",
balanceAmount:"",
paymentMethod:"Cash",
paymentStatus:"Pending",
transactionId:"",
remarks:""

});


useEffect(() => {

  if (selectedPayment) {

    setFormData(selectedPayment);

  } else {

    setFormData({
      bookingId: "",
      invoiceNumber: "",
      customerName: "",
      venueName: "",
      totalAmount: "",

      gstPercentage: "",
      gstAmount: "",

      advanceAmount: "",
      balanceAmount: "",
      paymentMethod: "Cash",
      paymentStatus: "Pending",
      transactionId: "",
      remarks: "",
    });

  }

}, [selectedPayment]);

  

 const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData((prev) => {

    const updatedData = {
      ...prev,
      [name]: value,
    };

    if (name === "advanceAmount") {

      const total = Number(prev.totalAmount || 0);
      const advance = Number(value || 0);

      updatedData.balanceAmount =
        advance > total ? 0 : total - advance;
    }

    if (name === "paymentStatus" && value === "Paid") {
      updatedData.balanceAmount = 0;
    }

    return updatedData;
  });
};

  
//conform booking
useEffect(() => {

const loadBookings = async () => {

const res = await axios.get(
"http://localhost:5000/api/payments/confirmed-bookings"
);

setBookings(res.data);

};

loadBookings();

},[]);

useEffect(() => {

  const loadPricing = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/pricing"
      );

      setPricing(res.data);

    } catch (err) {

      console.log("PRICING ERROR:", err);

    }

  };

  loadPricing();

}, []);

//save payment
const savePayment = async () => {

  const total = Number(formData.totalAmount || 0);
  const advance = Number(formData.advanceAmount || 0);

  if (advance > total) {
    alert("Advance amount cannot be greater than total amount");
    return;
  }

  let balance = total - advance;

  if (formData.paymentStatus === "Paid") {
    balance = 0;
  }

  const data = {
  bookingId: formData.bookingId,
  invoiceNumber: formData.invoiceNumber,
  customerName: formData.customerName,
  venueName: formData.venueName,

  totalAmount: total,

gstPercentage: formData.gstPercentage,
gstAmount: formData.gstAmount,

  advanceAmount: advance,
  balanceAmount: balance,

  paymentMethod: formData.paymentMethod,
  paymentStatus: formData.paymentStatus,

  transactionId: formData.transactionId || "",
  remarks: formData.remarks || "",
};

  console.log("SENDING PAYMENT:", data);

  try {

    if (selectedPayment?._id) {

      const res = await axios.put(
        `http://localhost:5000/api/payments/${selectedPayment._id}`,
        data
      );

      console.log("UPDATED:", res.data);

    } else {

      const res = await axios.post(
        "http://localhost:5000/api/payments",
        data
      );

      console.log("CREATED:", res.data);
    }

    await getPayments();

    handleClose();

  } catch (err) {

    console.log(
      "PAYMENT ERROR:",
      err.response?.data || err.message
    );

    alert(
      err.response?.data?.message ||
      "Payment Save Failed"
    );
  }
};
  return (
    <Modal show={show} onHide={handleClose} size="lg">

      <Modal.Header closeButton>
        <Modal.Title>
          {selectedPayment ? "Edit Payment" : "Add Payment"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Invoice Number</Form.Label>
            <Form.Control
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
            />
          </Form.Group>

        
        <Form.Group className="mb-3">

<Form.Label>

Booking

</Form.Label>

<Form.Select
onChange={(e) => {

  const booking = bookings.find(
    x => x._id === e.target.value
  );

  if (!booking) return;

  const gstItem = pricing.find(
  item =>
    item.category?.trim().toLowerCase() === "gst" &&
    item.title?.trim().toLowerCase() === "gst" &&
    item.status === true
);

const gstPercentage = gstItem
  ? Number(gstItem.amount)
  : 0;

const subtotal = Number(booking.totalPrice || 0);

const gstAmount =
  subtotal * gstPercentage / 100;

const grandTotal =
  subtotal + gstAmount;

setFormData({

  ...formData,

  bookingId: booking._id,

  invoiceNumber:
    booking.invoiceNumber ||
    "INV" + Date.now(),

  customerName: booking.fullName,

  venueName: booking.venueName,

  totalAmount: grandTotal,

  gstPercentage: gstPercentage,

  gstAmount: gstAmount,

  advanceAmount: 0,

  balanceAmount: grandTotal,

});

}}
>

<option>

Select Booking

</option>

{

bookings.map((item)=>(

<option
key={item._id}
value={item._id}
>

{item.invoiceNumber}
-
{item.fullName}

</option>

))

}

</Form.Select>

</Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Venue</Form.Label>
            <Form.Control
              name="venueName"
              value={formData.venueName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Advance Amount</Form.Label>
            <Form.Control
              type="number"
              name="advanceAmount"
              value={formData.advanceAmount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Balance Amount</Form.Label>
            <Form.Control
              value={formData.balanceAmount}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>

            <Form.Select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Bank Transfer</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>

            <Form.Select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>Partial</option>
              <option>Paid</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Transaction ID</Form.Label>
            <Form.Control
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </Form.Group>

        </Form>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>

        <Button
          variant="primary"
          onClick={savePayment}
        >
          Save Payment
        </Button>

      </Modal.Footer>

    </Modal>
  );
}

export default PaymentModal;