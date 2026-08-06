import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Image,
  Alert,
} from "react-bootstrap";
import  "../pagecss/Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",

    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",

    adminName: "",
    adminEmail: "",
    password: "",

    currency: "INR",
    timezone: "Asia/Kolkata",
    gst: 18,

    emailNotification: true,
    whatsappNotification: true,
    bookingNotification: true,

    twoFactor: false,
    loginAlert: true,

    logo: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/settings");

      if (res.data) {
        setSettings(res.data);
        setPreview(
          `http://localhost:5000/uploads/${res.data.logo}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];

    setLogoFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(settings).forEach((key) => {
        formData.append(key, settings[key]);
      });

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const res = await axios.post(
        "http://localhost:5000/api/settings",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message);

      fetchSettings();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid className="p-4">

      <Card className="shadow">

        <Card.Header className="bg-primary text-white">
          <h4>System Settings</h4>
        </Card.Header>

        <Card.Body>

          {message && (
            <Alert variant="success">{message}</Alert>
          )}

          <Form onSubmit={handleSubmit}>

            <h5 className="mb-3">
              Company Information
            </h5>

            <Row>

              <Col md={3}>
                <Image
                  src={
                    preview ||
                    "https://via.placeholder.com/180"
                  }
                  rounded
                  thumbnail
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />

                <Form.Control
                  type="file"
                  className="mt-3"
                  onChange={handleLogo}
                />
              </Col>

              <Col md={9}>

                <Row>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Company Name
                      </Form.Label>

                      <Form.Control
                        name="companyName"
                        value={settings.companyName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>

                      <Form.Control
                        name="email"
                        value={settings.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>

                      <Form.Control
                        name="phone"
                        value={settings.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>WhatsApp</Form.Label>

                      <Form.Control
                        name="whatsapp"
                        value={settings.whatsapp}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>

                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        value={settings.address}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                </Row>

              </Col>

            </Row>

            <hr />

            <h5 className="mb-3">
              Social Media
            </h5>

            <Row>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Facebook</Form.Label>

                  <Form.Control
                    name="facebook"
                    value={settings.facebook}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Instagram</Form.Label>

                  <Form.Control
                    name="instagram"
                    value={settings.instagram}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>YouTube</Form.Label>

                  <Form.Control
                    name="youtube"
                    value={settings.youtube}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>LinkedIn</Form.Label>

                  <Form.Control
                    name="linkedin"
                    value={settings.linkedin}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

            </Row>

            <hr />

            <h5 className="mb-3">
              Admin Account
            </h5>

            <Row>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Admin Name</Form.Label>

                  <Form.Control
                    name="adminName"
                    value={settings.adminName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Admin Email</Form.Label>

                  <Form.Control
                    name="adminEmail"
                    value={settings.adminEmail}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    New Password
                  </Form.Label>

                  <Form.Control
                    type="password"
                    name="password"
                    value={settings.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

            </Row>

            <hr />

            <h5 className="mb-3">
              System Settings
            </h5>

            <Row>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Currency
                  </Form.Label>

                  <Form.Select
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                  >
                    <option>INR</option>
                    <option>USD</option>
                    <option>AED</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    GST %
                  </Form.Label>

                  <Form.Control
                    name="gst"
                    value={settings.gst}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Timezone
                  </Form.Label>

                  <Form.Control
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

            </Row>

            <hr />

            <h5 className="mb-3">
              Notifications
            </h5>

            <Form.Check
              label="Email Notifications"
              name="emailNotification"
              checked={settings.emailNotification}
              onChange={handleChange}
            />

            <Form.Check
              label="WhatsApp Notifications"
              name="whatsappNotification"
              checked={settings.whatsappNotification}
              onChange={handleChange}
            />

            <Form.Check
              label="Booking Notifications"
              name="bookingNotification"
              checked={settings.bookingNotification}
              onChange={handleChange}
            />

            <hr />

            <h5 className="mb-3">
              Security
            </h5>

            <Form.Check
              label="Enable Two Factor"
              name="twoFactor"
              checked={settings.twoFactor}
              onChange={handleChange}
            />

            <Form.Check
              label="Login Alert"
              name="loginAlert"
              checked={settings.loginAlert}
              onChange={handleChange}
            />

            <div className="mt-4">

              <Button type="submit">
                Save Settings
              </Button>

            </div>

          </Form>

        </Card.Body>

      </Card>

    </Container>
  );
};

export default Settings;