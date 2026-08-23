import React, { useEffect, useState } from "react";
import axios from "axios";
import {Table,Button,Form,Modal,Row,Col} from "react-bootstrap";

import "../Dashboard.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);

  const [customer, setCustomer] = useState(null);

  const [history, setHistory] = useState([]);

  const [note, setNote] = useState("");

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    const data = customers.filter((item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.email.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(data);
  }, [search, customers]);

  const getCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests");

      const unique = [];

      res.data.forEach((item) => {
        const exist = unique.find(
          (x) => x.phone === item.phone
        );

        if (!exist) {
          unique.push(item);
        }
      });

      setCustomers(unique);
      setFiltered(unique);

    } catch (err) {
      console.log(err);
    }
  };
const viewCustomer = async (item) => {

  setCustomer({ ...item });

  setNote(item.note || "");

  try {

    const res = await axios.get(
      `http://localhost:5000/api/requests/history/${item.phone}`
    );

    setHistory(res.data.data);   // ✅ இதுதான் correct

  } catch (err) {
    console.log(err);
    setHistory([]); // optional
  }

  setShow(true);
};
  const saveCustomer = async () => {

    try {

      await axios.put(
        `http://localhost:5000/api/requests/${customer._id}`,
        {
          fullName: customer.fullName,
          phone: customer.phone,
          email: customer.email,
          note,
        }
      );

      alert("Customer Updated");

      setShow(false);

      getCustomers();

    } catch (err) {
      console.log(err);
    }
  };

  const deleteCustomer = async (id) => {

    if (!window.confirm("Delete Customer?")) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/requests/${id}`
      );

      getCustomers();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <h2 className="page-title">
        Customers
      </h2>

      <Form.Control
        placeholder="Search Customer..."
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-box">

        <Table bordered hover>

          <thead>

            <tr>

              <th>Name</th>

              <th>Phone</th>

              <th>Email</th>

                <th>Venues</th>
              
              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              filtered.length > 0 ?

                filtered.map((item) => (

                  <tr key={item._id}>

                    <td>{item.fullName}</td>

                    <td>{item.phone}</td>

                    <td>{item.email}</td>

                      <td>{item.venueName}</td>

                    <td>{item.status}</td>

                     

                   <td style={{ whiteSpace: "nowrap" }}>
                    <Button
                      size="sm"
                     variant="primary"
                     onClick={() => viewCustomer(item)} >
                     View 
                     </Button>

                     <Button size="sm" variant="danger" className="ms-2"
                      onClick={() => deleteCustomer(item._id)}>
                      Delete</Button></td>
                  </tr>

                ))

                :

                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No Customers Found
                  </td>

                </tr>

            }

          </tbody>

        </Table>

      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Customer Details
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          {
            customer &&

            <>

              <Row>

                <Col md={6}>

                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    value={customer.fullName}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        fullName: e.target.value,
                      })
                    }
                  />

                </Col>

                <Col md={6}>

                  <Form.Label>Phone</Form.Label>

                  <Form.Control
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        phone: e.target.value,
                      })
                    }
                  />

                </Col>

                <Col md={6} className="mt-3">

                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        email: e.target.value,
                      })
                    }
                  />

                </Col>

                <Col md={6} className="mt-3">

                  <Form.Label>Status</Form.Label>

                  <Form.Control
                    value={customer.status}
                    disabled
                  />

                </Col>

              </Row>

              <hr />

              <h5>Booking History</h5>

              <Table bordered>

                <thead>

                  <tr>

                    <th>Date</th>

                    <th>Venue</th>

                    <th>Function</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    history.map((item) => (

                      <tr key={item._id}>

                        <td>{item.functionDate}</td>

                        <td>{item.venueName}</td>

                        <td>{item.functionType}</td>

                        <td>{item.status}</td>

                      </tr>

                    ))
                  }

                </tbody>

              </Table>

              <Form.Group>

                <Form.Label>
                  Notes
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={4}
                  value={note}
                  onChange={(e) =>
                    setNote(e.target.value)
                  }
                />

              </Form.Group>

            </>

          }

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
            onClick={saveCustomer}
          >
            Save
          </Button>

        </Modal.Footer>

      </Modal>

    </div>
  );
}

export default Customers;