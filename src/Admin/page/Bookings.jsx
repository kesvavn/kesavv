import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Form,
  Button,
  Modal,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import {
  FaEye,
  FaTrash,
  FaFileInvoice,
  FaCheck,
  FaPrint,
  FaFilePdf,
  FaFileCsv,
} from "react-icons/fa";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "../Dashboard.css";

function Bookings() {

  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);

  // Search Filters
  const [filters, setFilters] = useState({
    customer: "",
    phone: "",
    venue: "",
    event: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState(10);

  const lastIndex = currentPage * entries;
  const firstIndex = lastIndex - entries;

  const currentBookings = filtered.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filtered.length / entries);

  // Fetch Bookings
  const getBookings = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/requests"
      );

      const confirmed = res.data.filter(
        (item) => item.status === "Confirmed"
      );

      setBookings(confirmed);
      setFiltered(confirmed);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  // Filter Search
  useEffect(() => {

    const data = bookings.filter((item) => {

      return (

        item.fullName
          .toLowerCase()
          .includes(filters.customer.toLowerCase()) &&

        item.phone
          .includes(filters.phone) &&

        item.venueName
          .toLowerCase()
          .includes(filters.venue.toLowerCase()) &&

        item.functionType
          .toLowerCase()
          .includes(filters.event.toLowerCase())

      );

    });

    setFiltered(data);
    setCurrentPage(1);

  }, [filters, bookings]);

  // Dashboard Revenue

  const totalRevenue = filtered.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  // View

  const viewBooking = (item) => {
    setSelected(item);
    setShow(true);
  };

  // Cancel

  const cancelBooking = async (id) => {

    if (!window.confirm("Cancel Booking?"))
      return;

    try {

      await axios.put(
        `http://localhost:5000/api/requests/${id}`,
        {
          status: "Cancelled",
        }
      );

      getBookings();

    } catch (err) {
      console.log(err);
    }
  };

  // CSV Export

  const exportCSV = () => {

    const rows = filtered.map((item) => ({
      Customer: item.fullName,
      Phone: item.phone,
      Venue: item.venueName,
      Event: item.functionType,
      Date: item.functionDate,
      Guests: item.guests,
      Rooms: item.rooms,
      Amount: item.totalPrice,
      Status: item.status,
    }));

    const csv =
      [
        Object.keys(rows[0]).join(","),
        ...rows.map((r) => Object.values(r).join(",")),
      ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "Bookings.csv";

    a.click();

  };

  // PDF Export

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "Confirmed Bookings Report",
      14,
      15
    );

    autoTable(doc, {

      head: [[
        "Customer",
        "Venue",
        "Event",
        "Guests",
        "Amount"
      ]],

      body: filtered.map((item) => [

        item.fullName,
        item.venueName,
        item.functionType,
        item.guests,
        item.totalPrice,

      ])

    });

    doc.save("Bookings.pdf");

  };

  // Print

  const printPage = () => {
    window.print();
  };
  return (
<div className="container-fluid">

{/* Header */}

<Row className="align-items-center mb-4">

  <Col md={6}>
    <h2 className="page-title">
      Confirmed Bookings
    </h2>
  </Col>

  <Col md={6} className="text-end">

    <Button
      variant="success"
      className="me-2"
      onClick={exportCSV}
    >
      <FaFileCsv className="me-1" />
      CSV
    </Button>

    <Button
      variant="danger"
      className="me-2"
      onClick={exportPDF}
    >
      <FaFilePdf className="me-1" />
      PDF
    </Button>

    <Button
      variant="primary"
      onClick={printPage}
    >
      <FaPrint className="me-1" />
      Print
    </Button>

  </Col>

</Row>

{/* Dashboard Cards */}

<Row className="mb-4">

  <Col md={4}>
    <Card className="shadow border-0">
      <Card.Body>
        <h6>Total Bookings</h6>
        <h2>{filtered.length}</h2>
      </Card.Body>
    </Card>
  </Col>

  <Col md={4}>
    <Card className="shadow border-0">
      <Card.Body>
        <h6>Total Revenue</h6>
        <h2>₹ {totalRevenue.toLocaleString()}</h2>
      </Card.Body>
    </Card>
  </Col>

  <Col md={4}>
    <Card className="shadow border-0">
      <Card.Body>
        <h6>Confirmed</h6>
        <h2>{filtered.length}</h2>
      </Card.Body>
    </Card>
  </Col>

</Row>

{/* Filters */}

<Row className="g-2 mb-4">

  <Col md={3}>
    <Form.Control
      placeholder="Customer"
      value={filters.customer}
      onChange={(e)=>
      setFilters({
        ...filters,
        customer:e.target.value
      })}
    />
  </Col>

  <Col md={3}>
    <Form.Control
      placeholder="Phone"
      value={filters.phone}
      onChange={(e)=>
      setFilters({
        ...filters,
        phone:e.target.value
      })}
    />
  </Col>

  <Col md={3}>
    <Form.Control
      placeholder="Venue"
      value={filters.venue}
      onChange={(e)=>
      setFilters({
        ...filters,
        venue:e.target.value
      })}
    />
  </Col>

  <Col md={3}>
    <Form.Control
      placeholder="Event"
      value={filters.event}
      onChange={(e)=>
      setFilters({
        ...filters,
        event:e.target.value
      })}
    />
  </Col>

</Row>

<Row className="mb-3">

  <Col md={2}>

    <Form.Select
      value={entries}
      onChange={(e)=>
      setEntries(Number(e.target.value))}
    >

      <option value={10}>10 Entries</option>
      <option value={25}>25 Entries</option>
      <option value={50}>50 Entries</option>
      <option value={100}>100 Entries</option>

    </Form.Select>

  </Col>

</Row>

{/* Table */}

<div className="table-responsive">

<Table
striped
hover
bordered
className="align-middle shadow-sm"
>

<thead className="table-dark">

<tr>

<th>#</th>

<th>Customer</th>

<th>Phone</th>

<th>Venue</th>

<th>Event</th>

<th>Date</th>

<th>Guests</th>

<th>Rooms</th>

<th>Amount</th>

<th>Status</th>

<th width="230">
Actions
</th>

</tr>

</thead>

<tbody>

{
currentBookings.length ?

currentBookings.map((item,index)=>(

<tr key={item._id}>

<td>{firstIndex+index+1}</td>

<td>{item.fullName}</td>

<td>{item.phone}</td>

<td>{item.venueName}</td>

<td>{item.functionType}</td>

<td>{item.functionDate}</td>

<td>{item.guests}</td>

<td>{item.rooms}</td>

<td>
₹ {item.totalPrice?.toLocaleString()}
</td>

<td>

<span
className={`badge ${
item.status==="Confirmed"
?
"bg-success"
:
item.status==="Pending"
?
"bg-warning text-dark"
:
"bg-danger"
}`}
>

{item.status}

</span>

</td>

<td>

<Button
size="sm"
variant="primary"
className="me-1"
onClick={()=>viewBooking(item)}
>
<FaEye/>
</Button>

<Button
size="sm"
variant="success"
className="me-1"
onClick={()=>
window.open(
`http://localhost:5000/api/requests/receipt/${item._id}`,
"_blank"
)}
>
<FaFileInvoice/>
</Button>

<Button
size="sm"
variant="warning"
className="me-1"
onClick={async()=>{

try{

await axios.put(
`http://localhost:5000/api/requests/confirm/${item._id}`
);

alert("Booking Confirmed");

getBookings();

}
catch(err){

console.log(err);

}

}}
>

<FaCheck/>

</Button>

<Button
size="sm"
variant="danger"
onClick={()=>
cancelBooking(item._id)}
>

<FaTrash/>

</Button>

</td>

</tr>

))

:

<tr>

<td
colSpan="11"
className="text-center"
>

No Confirmed Bookings

</td>

</tr>

}

</tbody>

</Table>

</div>
{/* Booking Details Modal */}

<Modal
  show={show}
  onHide={() => setShow(false)}
  size="lg"
  centered
>
  <Modal.Header closeButton className="bg-primary text-white">
    <Modal.Title>Booking Details</Modal.Title>
  </Modal.Header>

  <Modal.Body>

    {selected && (

      <Row>

        <Col md={6} className="mb-3">
          <strong>Customer Name</strong>
          <p>{selected.fullName}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Phone Number</strong>
          <p>{selected.phone}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Email</strong>
          <p>{selected.email}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Venue</strong>
          <p>{selected.venueName}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Event Type</strong>
          <p>{selected.functionType}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Function Date</strong>
          <p>{selected.functionDate}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Guests</strong>
          <p>{selected.guests}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Rooms</strong>
          <p>{selected.rooms}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Total Amount</strong>
          <p>₹ {selected.totalPrice?.toLocaleString()}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Status</strong>
          <p>
            <span
              className={`badge ${
                selected.status === "Confirmed"
                  ? "bg-success"
                  : selected.status === "Pending"
                  ? "bg-warning text-dark"
                  : "bg-danger"
              }`}
            >
              {selected.status}
            </span>
          </p>
        </Col>

      </Row>

    )}

  </Modal.Body>

  <Modal.Footer>

    <Button
      variant="secondary"
      onClick={() => setShow(false)}
    >
      Close
    </Button>

    <Button
      variant="success"
      onClick={() =>
        window.open(
          `http://localhost:5000/api/requests/receipt/${selected._id}`,
          "_blank"
        )
      }
    >
      Download Receipt
    </Button>

  </Modal.Footer>

</Modal>
{/* Pagination */}

<Row className="mt-3 align-items-center">

  <Col md={6}>
    <p className="mb-0">
      Showing {currentBookings.length} of {filtered.length} Records
    </p>
  </Col>

  <Col md={6}>

    <div className="d-flex justify-content-end">

      <Button
        variant="outline-primary"
        className="me-2"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
      >
        Previous
      </Button>

      <span className="align-self-center mx-2">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline-primary"
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
      >
        Next
      </Button>

    </div>

  </Col>

</Row>

{/* Booking Details Modal */}

<Modal
  show={show}
  onHide={() => setShow(false)}
  size="lg"
  centered
>

  <Modal.Header
    closeButton
    className="bg-primary text-white"
  >
    <Modal.Title>
      Booking Details
    </Modal.Title>
  </Modal.Header>

  <Modal.Body>

    {selected && (

      <Row>

        <Col md={6} className="mb-3">
          <strong>Customer</strong>
          <p>{selected.fullName}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Phone</strong>
          <p>{selected.phone}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Email</strong>
          <p>{selected.email}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Venue</strong>
          <p>{selected.venueName}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Event</strong>
          <p>{selected.functionType}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Date</strong>
          <p>{selected.functionDate}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Guests</strong>
          <p>{selected.guests}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Rooms</strong>
          <p>{selected.rooms}</p>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Total Amount</strong>
          <h5 className="text-success">
            ₹ {selected.totalPrice?.toLocaleString()}
          </h5>
        </Col>

        <Col md={6} className="mb-3">
          <strong>Status</strong>

          <br />

          <span
            className={`badge ${
              selected.status === "Confirmed"
                ? "bg-success"
                : selected.status === "Pending"
                ? "bg-warning text-dark"
                : "bg-danger"
            }`}
          >
            {selected.status}
          </span>

        </Col>

      </Row>

    )}

  </Modal.Body>

  <Modal.Footer>

    <Button
      variant="secondary"
      onClick={() => setShow(false)}
    >
      Close
    </Button>

    <Button
      variant="success"
      onClick={() =>
        window.open(
          `http://localhost:5000/api/requests/receipt/${selected._id}`,
          "_blank"
        )
      }
    >
      Download Receipt
    </Button>

  </Modal.Footer>

</Modal>

</div>

);

}

export default Bookings;