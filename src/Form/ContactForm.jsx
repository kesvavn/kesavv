import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  await axios.post(
    "http://localhost:5000/api/contact",
    formData
  );

  alert("Message Sent Successfully");
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter your Full Name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          name="phone"
          placeholder="Enter your Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter your Email ID"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Control
          as="textarea"
          rows={5}
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" className="reach-submit-btn">
        SUBMIT
      </Button>

    </Form>
  );
}

export default ContactForm;