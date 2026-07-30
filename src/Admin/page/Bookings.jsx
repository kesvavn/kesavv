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

import "../Dashboard.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState(null);

  const [show, setShow] = useState(false);

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

  useEffect(() => {
    const data = bookings.filter((item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.venueName.toLowerCase().includes(search.toLowerCase()) ||
      item.functionType.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(data);
  }, [search, bookings]);

  const viewBooking = (item) => {
    setSelected(item);
    setShow(true);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

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

  const totalRevenue = filtered.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  return (
    <div>

      <h2 className="page-title">
        Confirmed Bookings
      </h2>

      {/* Dashboard Cards */}

      <Row className="mb-4">

        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <h6>Total Bookings</h6>
              <h3>{filtered.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <h6>Total Revenue</h6>
              <h3>₹ {totalRevenue.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <h6>Confirmed</h6>
              <h3>{filtered.length}</h3>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* Search */}

      <Form.Control
        className="mb-3"
        placeholder="Search Booking..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-box">

        <Table bordered hover responsive>

          <thead>

            <tr>

              <th>Customer</th>

              <th>Phone</th>

              <th>Venue</th>

              <th>Event</th>

              <th>Date</th>

              <th>Guests</th>

              <th>Rooms</th>

              <th>Amount</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              filtered.length ?

                filtered.map((item) => (

                  <tr key={item._id}>

                    <td>{item.fullName}</td>

                    <td>{item.phone}</td>

                    <td>{item.venueName}</td>

                    <td>{item.functionType}</td>

                    <td>{item.functionDate}</td>

                    <td>{item.guests}</td>

                    <td>{item.rooms}</td>

                    <td>₹ {item.totalPrice?.toLocaleString()}</td>
<td>

  <Button
    size="sm"
    variant="primary"
    onClick={() => viewBooking(item)}
  >
    View
  </Button>

  {" "}

  <Button
    size="sm"
    variant="success"
    onClick={() => {
      window.open(
        `http://localhost:5000/api/requests/receipt/${item._id}`,
        "_blank"
      );
    }}
  >
    Receipt
  </Button>

  {" "}

  <Button
    size="sm"
    variant="warning"
    onClick={async () => {
      try {
        await axios.put(
          `http://localhost:5000/api/requests/confirm/${item._id}`
        );

        alert("Booking Confirmed & Email Sent");

        getBookings();

      } catch (err) {
        console.log(err);
      }
    }}
  >
    Confirm
  </Button>

  {" "}

  <Button
    size="sm"
    variant="danger"
    onClick={() => cancelBooking(item._id)}
  >
    Cancel
  </Button>

</td>

                  </tr>

                ))

                :

                <tr>

                  <td
                    colSpan="9"
                    className="text-center"
                  >
                    No Confirmed Bookings
                  </td>

                </tr>

            }

          </tbody>

        </Table>

      </div>

      {/* Details Modal */}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
      >

        <Modal.Header closeButton>
          <Modal.Title>
            Booking Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {
            selected &&

            <Row>

              <Col md={6}>
                <p><strong>Customer:</strong> {selected.fullName}</p>
              </Col>

              <Col md={6}>
                <p><strong>Phone:</strong> {selected.phone}</p>
              </Col>

              <Col md={6}>
                <p><strong>Email:</strong> {selected.email}</p>
              </Col>

              <Col md={6}>
                <p><strong>Venue:</strong> {selected.venueName}</p>
              </Col>

              <Col md={6}>
                <p><strong>Function:</strong> {selected.functionType}</p>
              </Col>

              <Col md={6}>
                <p><strong>Date:</strong> {selected.functionDate}</p>
              </Col>

              <Col md={6}>
                <p><strong>Guests:</strong> {selected.guests}</p>
              </Col>

              <Col md={6}>
                <p><strong>Rooms:</strong> {selected.rooms}</p>
              </Col>

              <Col md={6}>
                <p><strong>Total Amount:</strong> ₹ {selected.totalPrice?.toLocaleString()}</p>
              </Col>

              <Col md={6}>
                <p><strong>Status:</strong> {selected.status}</p>
              </Col>

            </Row>

          }

        </Modal.Body>

      </Modal>

    </div>
  );
}

export default Bookings;