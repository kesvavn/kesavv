import "./FeaturedSection.css";
import { Container, Row, Col } from "react-bootstrap";
import phoneImage from "./events/Screenshot_2025-05-27_105934-removebg-preview.png";

function FeaturedSection() {
  return (
    <section className="featured-section">
      <Container>
        <div className="featured-box">

          <Row className="align-items-center">

            {/* LEFT CONTENT */}
            <Col lg={6} md={6} sm={12} className="text-center">

              <p className="featured-subtitle">
                FEATURED ON
              </p>

              <h2 className="featured-title">
                The New York Times <br />
                Magazine
              </h2>

              <a
                href="https://www.nytimes.com/2022/01/08/world/asia/india-weddings-south-kerala.html"
                target="_blank"
                rel="noopener noreferrer"
                className="read-btn"
              >
                Read Article
                <i className="fas fa-arrow-right"></i>
              </a>

            </Col>

            {/* RIGHT IMAGE */}
            <Col lg={6} md={6} sm={12} className="text-center">
              <img
                src={phoneImage}
                alt="phone"
                className="phone-img"
              />
            </Col>

          </Row>

        </div>
      </Container>
    </section>
  );
}

export default FeaturedSection;