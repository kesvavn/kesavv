import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import {
  FaUsers,
  FaCar,
  FaWifi,
  FaBolt,
  FaVideo,
  FaChevronRight,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCheck,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

import {
  MdMeetingRoom,
  MdOutlineBedroomChild,
} from "react-icons/md";

import { TbTrees } from "react-icons/tb";
import { BiShield } from "react-icons/bi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

import "./venuecss/KakkattuMana.css";
import MyNavbar from "../../Navbar";
import melodiaLogo from "../../images/MELODIA-LOGO-03-1.webp";

function KakkattuMana() {
  return (
    <>
     <div className="kakkattu-section">
  <MyNavbar />

  <Container className="kakkattu-container">
    <Row className="kakkattu-row justify-content-center align-items-center text-center">
      <Col lg={8}>
        <h1 className="kakkattu-title text-white fw-bold">
          Kakkattu Mana <br />
          <span className="kakkattu-subtitle">
            Wedding & Event Space
          </span>
        </h1>
      </Col>
    </Row>
  </Container>
</div>
<div className="kakkattu-img " >
      <h1 className="kakkattu-img-text">
        Planning a wedding or special event at Kakkattu Mana in
        <br /> Chathanur, Pattambi, Palakkad? Melodia Event Management 
        <br /> provides professional event planning support to help 
        <br /> organize a smooth and memorable celebration at this venue.
      </h1>
    </div>
    
   
   <div className="d-flex justify-content-center my-4">
  <Button
    href="https://wa.me/919876543210?text=Hi,%20I%20want%20to%20know%20about%20Kakkattu%20Mana"
    target="_blank"
    rel="noopener noreferrer"
    className="contact-whatsapp-btn"
  >
    Get Details on WhatsApp
  </Button>
</div>

<Container className="py-5">

  <Row>
   
    {/* Left Side */}
    <Col lg={8}>

      <h2 className="about-title">
        About Kakkattu Mana in Chathanur, Pattambi, Palakkad
      </h2>

      <p className="about-text">
        Kakkattu Mana is a heritage wedding venue containing an indoor area
        with a capacity of 150–200 and an outdoor area with a capacity of
        500 guests. Parking is available for 100 cars.
      </p>

      {/* Facilities */}

      <Card className="shadow-sm facility-card mt-4">
        <Card.Body>

          <h4 className="section-title">Facilities</h4>

          <Row className="facility-row mt-4">

            <Col md={4}><FaUsers /> Guest Capacity : 500</Col>
            <Col md={4}><MdMeetingRoom /> Indoor Space : 1</Col>
            <Col md={4}><MdOutlineBedroomChild /> Non AC Rooms : None</Col>

            <Col md={4} className="mt-3"><FaCar /> Parking : 100 Cars</Col>
            <Col md={4} className="mt-3"><TbTrees /> Outdoor Space : 1</Col>
            <Col md={4} className="mt-3"><MdOutlineBedroomChild /> AC Rooms : 1</Col>

          </Row>

        </Card.Body>
      </Card>

      {/* Amenities */}

      <Card className="shadow-sm facility-card mt-4">

        <Card.Body>

          <h4 className="section-title">Amenities</h4>

          <Row className="mt-4">

            <Col md={4}><FaWifi /> Free WiFi</Col>
            <Col md={4}><BiShield /> 24/7 Security</Col>
            <Col md={4}><HiOutlineClipboardDocumentList /> Custom Package</Col>

            <Col md={4} className="mt-3"><FaBolt /> Backup Power</Col>
            <Col md={4} className="mt-3"><FaVideo /> CCTV Surveillance</Col>

          </Row>

        </Card.Body>

      </Card>

    </Col>

    {/* Right Side */}

    <Col lg={4}>

      <Card className="shadow enquiry-card">

        <Card.Body>

          <Form>

            <Form.Control
              placeholder="Enter your Full Name"
              className="mb-3"
            />

            <Form.Control
              placeholder="Enter your Phone Number"
              className="mb-3"
            />

            <Button
              variant="secondary"
              className="w-100"
              size="lg"
            >
              Plan your event with us
            </Button>

          </Form>

        </Card.Body>

      </Card>

      <br />
      <Card className="promo-card text-white">
  <Card.Body className="overlay">

    <img
      src="../../assets/images/melodia-logo.webp"
      alt="Melodia"
      className="logo mb-4"
    />

    <p className="promo-text">
      Melodia Event Management is a professional wedding and event
      planning company in Kerala. We offer full event support including
      stage decoration, lighting, entertainment and complete event
      coordination.
    </p>

    <p><FaMapMarkerAlt className="me-2" />Serving All of Kerala</p>

    <p><FaCheck className="me-2" />Trusted by Thousands</p>

    <div className="social-icons my-4">
      <a href="#"><FaInstagram /></a>
      <a href="#"><FaYoutube /></a>
      <a href="#"><FaFacebookF /></a>
    </div>

    <h2 className="enquiry-title">Make an Enquiry!</h2>

  <Button
  href="https://wa.me/919876543210"
  target="_blank"
  variant="light"
  className="talk-btn w-100"
>
  Let's Talk
</Button>

  </Card.Body>
</Card>

    </Col>

  </Row>


</Container>
    </>
  );
}

export default KakkattuMana;