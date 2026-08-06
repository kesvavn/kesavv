import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Badge,
  Form,
} from "react-bootstrap";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews/admin");
      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveReview = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/${id}`, {
        status: "Approved",
      });

      fetchReviews();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectReview = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/${id}`, {
        status: "Rejected",
      });

      fetchReviews();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredReviews = reviews.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container fluid className="p-4">

      <h2 className="mb-4">Reviews</h2>

      <Form.Control
        type="text"
        placeholder="Search Customer..."
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table striped bordered hover responsive>

        <thead className="table-dark">

          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Date</th>
            <th>Status</th>
            <th width="250">Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredReviews.length === 0 ? (

            <tr>
              <td colSpan="7" className="text-center">
                No Reviews Found
              </td>
            </tr>

          ) : (

            filteredReviews.map((item, index) => (

              <tr key={item._id}>

                <td>{index + 1}</td>

                <td>{item.name}</td>

                <td style={{ color: "#ffb400" }}>
                  {"⭐".repeat(item.rating)}
                </td>

                <td>{item.text}</td>

                <td>
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <Badge
                    bg={
                      item.status === "Approved"
                        ? "success"
                        : item.status === "Rejected"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {item.status}
                  </Badge>
                </td>

                <td>

                  <Button
                    size="sm"
                    variant="success"
                    className="me-2"
                    onClick={() => approveReview(item._id)}
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => rejectReview(item._id)}
                  >
                    Reject
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteReview(item._id)}
                  >
                    Delete
                  </Button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </Table>

    </Container>
  );
}

export default Reviews;