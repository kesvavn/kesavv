import Table from "react-bootstrap/Table";
import {
  FaEye,
  FaTrash,
} from "react-icons/fa";

function RequestTable() {

  const requests = [
    {
      id: 1,
      name: "Arun Kumar",
      phone: "9876543210",
      email: "arun@gmail.com",
      date: "25/06/2025",
      type: "Wedding",
      status: "Pending",
    },
    {
      id: 2,
      name: "Neha Suresh",
      phone: "9567891234",
      email: "neha@gmail.com",
      date: "30/06/2025",
      type: "Other Event",
      status: "Responded",
    },
    {
      id: 3,
      name: "Priya",
      phone: "9045678901",
      email: "priya@gmail.com",
      date: "05/07/2025",
      type: "Wedding",
      status: "Closed",
    },
  ];

  return (
    <div className="table-wrapper">

      <Table hover responsive>

        <thead>
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>EMAIL</th>
            <th>FUNCTION DATE</th>
            <th>FUNCTION TYPE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>

          {requests.map((item) => (
            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>{item.phone}</td>

              <td>{item.email}</td>

              <td>{item.date}</td>

              <td>{item.type}</td>

              <td>
                <span
                  className={`status-${item.status.toLowerCase()}`}
                >
                  {item.status}
                </span>
              </td>

              <td>

                <button className="action-btn view-btn">
                  <FaEye />
                </button>

                <button className="action-btn delete-btn">
                  <FaTrash />
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </Table>

    </div>
  );
}

export default RequestTable;