import { useState } from "react";
import { Button } from "react-bootstrap";
import "../pagecss/Request.css";
import RequestModal from "../Component/RequestModal";

function Requests() {
const [search, setSearch] = useState("");
  //view button
const [show, setShow] = useState(false);
const [selectedRequest, setSelectedRequest] = useState(null);

const openModal = (item) => {
  setSelectedRequest(item);
  setShow(true);
};

const closeModal = () => {
  setShow(false);
};

//upadte function
const updateStatus = (id, status) => {
  const updated = requests.map((item) =>
    item.id === id ? { ...item, status } : item
  );

  setRequests(updated);

  if (selectedRequest && selectedRequest.id === id) {
    setSelectedRequest({ ...selectedRequest, status });
  }
};  

 const [requests, setRequests] = useState([
  {
    id: 1,
    customer: "Rahul",
    phone: "9876543210",
    event: "Wedding",
    guests: 300,
    price: "₹2,00,000",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Priya",
    phone: "9876543211",
    event: "Birthday",
    guests: 150,
    price: "₹80,000",
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Arun",
    phone: "9876543212",
    event: "Reception",
    guests: 500,
    price: "₹5,00,000",
    status: "Cancelled",
  },
]);

  const filteredRequests = requests.filter((item) =>
  item.customer.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="requests-page">

      <h2>Pricing Requests</h2>

      <div className="request-header">
        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>+ Add Request</button>
      </div>
     <div className="table-wrapper">
      <table className="request-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Event</th>
            <th>Guests</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          
  {filteredRequests.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.customer}</td>
      <td>{item.phone}</td>
      <td>{item.event}</td>
      <td>{item.guests}</td>
      <td>{item.price}</td>
      <td>{item.status}</td>
      <td>
      
  <span className={item.status.toLowerCase()}>
    {item.status}
  </span>
</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => openModal(item)}> View</Button>
                <button>✏</button>
                <button>✔</button>
                <button>❌</button>
                <button>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      </div>
      <RequestModal
  show={show}
  handleClose={closeModal}
  request={selectedRequest}
  updateStatus={updateStatus}
/>
    </div>
  );
}

export default Requests;