import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaYoutube,FaFacebookF, FaLinkedinIn, FaTwitter,} from "react-icons/fa";
import Image from "../images/WhatsApp-Image-2022-08-26-at-7.41.01-PM.webp";
import MyNavbar from "../Navbar";
import "./Contact.css";
import BranchOffice from "../components/Contact/BranchOffice"

function Contact() {
  return (
           <>
           
            <div className="cont-bg">
             < MyNavbar />
           <Container className="contact-container">
  <Row>

    <Col md={8} className="contact-content">

      <h1 className="cont-head">
        Contact Us
      </h1>

      <div className="cont-txt">
        <p>
          Need help planning your next event?
          Look no further than Melodia Event Management Kerala!
        </p>

        <p>
          We can provide everything you need
          to ensure your event is a success.
        </p>
      </div>
    </Col>

  </Row>
</Container>

            </div>
    <section className="reach-section">
      
  <Container>
    <Row className="align-items-center">

      {/* LEFT SIDE */}
      <Col lg={6} className="mb-5 mb-lg-0">

        <h2 className="reach-title">
          WANT TO WORK WITH US?
        </h2>

        {/* PHONE */}
        <div className="reach-card">

          <div className="reach-icon">
            <FaPhoneAlt />
          </div>

          <div>
            <p className="reach-label">
              TALK TO OUR CLIENT SUPPORT TEAM
            </p>

            <h4 className="reach-number">
              +91-859-001-0011
            </h4>
          </div>

        </div>

        {/* EMAIL */}
        <div className="reach-card">

          <div className="reach-icon">
            <FaEnvelope />
          </div>

          <div>
            <p className="reach-label">
              WRITE TO US ABOUT YOUR NEEDS
            </p>

            <h4 className="reach-mail">
              melodiaeventmanagement@gmail.com
            </h4>
          </div>

        </div>

        {/* SOCIAL ICONS */}
        <div className="reach-socials">

          <a href="/">
            <FaInstagram />
          </a>

          <a href="/">
            <FaYoutube />
          </a>

          <a href="/">
            <FaFacebookF />
          </a>

          <a href="/">
            <FaLinkedinIn />
          </a>

          <a href="/">
            <FaTwitter />
          </a>

        </div>

      </Col>

      {/* RIGHT SIDE */}
      <Col lg={6}>

        <div className="reach-form-wrapper">

          <Form>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Enter your Full Name"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Enter your Phone Number"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="email"
                placeholder="Enter your Email ID"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Message"
              />
            </Form.Group>

            <Button className="reach-submit-btn">
              SUBMIT
            </Button>

          </Form>

        </div>

      </Col>

    </Row>
  </Container>

</section>
   <BranchOffice />
    </>
  );
}

export default Contact;