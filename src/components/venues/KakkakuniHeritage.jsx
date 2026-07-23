import React from "react";
import { Container,Col, Row, Card, Form, Button } from "react-bootstrap";
import { FaUsers,FaCar, FaWifi, FaBolt, FaVideo,FaMapMarkerAlt, FaCheck,FaInstagram, FaYoutube,FaFacebookF,} from "react-icons/fa";

import { MdMeetingRoom, MdOutlineBedroomChild,} from "react-icons/md";
import { TbTrees } from "react-icons/tb";
import { BiShield } from "react-icons/bi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import MyNavbar from "../../Navbar";
import "./venuecss/KakkakuniHeritage.css";

import melodiaLogo from "../../images/MELODIA-LOGO-03-1.webp";


function KakkakuniHeritage() {

  return (
    <>
     <div className="kakkakuni-bg">
      <MyNavbar />
    

  <div className="kakkakuni-hero-content">

    <h1>
      Kakkakuni Heritage
      <br />
      - Wedding & Event Space
    </h1>


    <div className="kakkakuni-location">

      <span>
        📍 Thalakkathur, Kozhikode
      </span>


      <span>
        4.6 Star Rated
      </span>


      <span className="stars">
        ★★★★★
      </span>

    </div>


  </div>


</div>
      
  <Container>
      <Row className="kakkakuni-container">

        {/* Left Side */}

        <Col lg={8}>

          <h2 className="kakkakuni-title">
            About Kakkakuni Heritage in Chathanur, Pattambi, Palakkad
          </h2>


          <p className="kakkakuni-text">

            Kakkakuni Heritage is a traditional heritage wedding venue
            containing an indoor area with a capacity of 150–200 and an
            outdoor area with a capacity of 500 guests. Parking is available
            for 100 cars.

          </p>


          {/* Facilities */}

          <Card className="shadow-sm kakkakuni-facility-card mt-4">

            <Card.Body>

              <h4 className="kakkakuni-section-title">
                Facilities
              </h4>


              <Row className="kakkakuni-facility-row mt-4">


                <Col md={4}>
                  <FaUsers />
                  Guest Capacity : 500
                </Col>


                <Col md={4}>
                  <MdMeetingRoom />
                  Indoor Space : 1
                </Col>


                <Col md={4}>
                  <MdOutlineBedroomChild />
                  Non AC Rooms : None
                </Col>



                <Col md={4} className="mt-3">
                  <FaCar />
                  Parking : 100 Cars
                </Col>


                <Col md={4} className="mt-3">
                  <TbTrees />
                  Outdoor Space : 1
                </Col>


                <Col md={4} className="mt-3">
                  <MdOutlineBedroomChild />
                  AC Rooms : 1
                </Col>


              </Row>


            </Card.Body>

          </Card>



          {/* Amenities */}


          <Card className="shadow-sm kakkakuni-facility-card mt-4">


            <Card.Body>


              <h4 className="kakkakuni-section-title">
                Amenities
              </h4>


              <Row className="mt-4">


                <Col md={4}>
                  <FaWifi />
                  Free WiFi
                </Col>


                <Col md={4}>
                  <BiShield />
                  24/7 Security
                </Col>


                <Col md={4}>
                  <HiOutlineClipboardDocumentList />
                  Custom Package
                </Col>



                <Col md={4} className="mt-3">
                  <FaBolt />
                  Backup Power
                </Col>


                <Col md={4} className="mt-3">
                  <FaVideo />
                  CCTV Surveillance
                </Col>


              </Row>


            </Card.Body>


          </Card>


        </Col>

        {/* Right Side */}


        <Col lg={4}>


          <Card className="shadow kakkakuni-enquiry-card">


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


        <br /><br /><br /><br /><br />
          <Card className="kakkakuni-promo-card text-white">


            <Card.Body className="kakkakuni-overlay">


              <img
                src={melodiaLogo}
                alt="Melodia"
                className="kakkakuni-logo mb-4"
              />



              <p className="kakkakuni-promo-text">

                Melodia Event Management is a professional wedding and
                event planning company in Kerala. We offer full event
                support including stage decoration, lighting,
                entertainment and complete event coordination.

              </p>
              <p>
                <FaMapMarkerAlt className="me-2" />
                Serving All of Kerala
              </p>
              <p>
                <FaCheck className="me-2" />
                Trusted by Thousands
              </p>


              <div className="kakkakuni-social-icons my-4">


                <a href="#">
                  <FaInstagram />
                </a>


                <a href="#">
                  <FaYoutube />
                </a>


                <a href="#">
                  <FaFacebookF />
                </a>


              </div>




              <h2 className="kakkakuni-enquiry-title">

                Make an Enquiry!

              </h2>




              <Button

                href="https://wa.me/919876543210"

                target="_blank"

                variant="light"

                className="kakkakuni-talk-btn w-100"

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


export default KakkakuniHeritage;