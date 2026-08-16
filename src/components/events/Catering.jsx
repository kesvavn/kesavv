import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyNavbar from "../../Navbar";
import "../events/event css/Catering.css";

function Catering() {
  return (
    <>    <div className="catering-page">

      {/* Hero Section */}
      <section className="catering-hero-section">

        {/* Navbar */}
        <MyNavbar />

        {/* Dark Overlay */}
        <div className="catering-hero-overlay"></div>

        {/* Hero Content */}
        <Container className="catering-container h-100 position-relative">
          <Row className="catering-row h-100 align-items-center justify-content-center">

            <Col
              xs={12}
              className="catering-hero-content text-center"
            >
              <h1 className="catering-hero-title">
                Best Catering Service in Kerala
              </h1>

              {/* Scroll Icon */}
              <div className="catering-scroll-icon">
                ↓
              </div>

            </Col>

          </Row>
        </Container>

      </section>

    </div>
    </>

  );
}

export default Catering;