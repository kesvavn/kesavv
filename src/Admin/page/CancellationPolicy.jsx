import React, { useEffect, useState } from "react";
import axios from "axios";

function CancellationPolicy() {
  const [policies, setPolicies] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

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

  useEffect(() => {
    getPolicies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/cancellation-policy/${editId}`,
          formData
        );

        alert("Policy Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/cancellation-policy",
          formData
        );

        alert("Policy Added Successfully");
      }

      setFormData({
        title: "",
        description: "",
      });

      setEditId(null);

      getPolicies();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePolicy = async (id) => {
    if (!window.confirm("Delete this policy?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/cancellation-policy/${id}`
      );

      alert("Policy Deleted Successfully");

      getPolicies();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Cancellation Policy</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="title"
          placeholder="Policy Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          {editId ? "Update Policy" : "Add Policy"}
        </button>
      </form>

      <hr />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {policies.map((policy) => (
            <tr key={policy._id}>
              <td>{policy.title}</td>
              <td>{policy.description}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditId(policy._id);
                    setFormData({
                      title: policy.title,
                      description: policy.description,
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deletePolicy(policy._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CancellationPolicy;