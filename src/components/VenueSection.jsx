import { Container, Row, Col, Button } from "react-bootstrap";
import "./VenueSection.css";
import ImageSlider from "./ImageSlider";
import GallerySlider from "../components/GallerySlider";

function VenueSection() {
  return (
    <section className="venue-section">

      <Container>

        <div className="venue-box">

          <Row className="align-items-center">

            {/* LEFT IMAGES */}
            <Col lg={4} md={8}>

              <div className="venue-grid">
                <GallerySlider />
                <GallerySlider />
                <GallerySlider />
                <GallerySlider />
              </div>

            </Col>

            {/* CENTER CONTENT */}
            <Col lg={6} md={12}>

              <div className="venue-content">

                <h2>
                  Struggling to find the perfect venue?
                </h2>

                <p>
                  Find your perfect venue with Melodia. Explore
                  endless venue options across Kerala with expert
                  event planning guidance.
                </p>

                <Button className="venue-btn">
                  Explore Venues in Kerala
                </Button>

              </div>

            </Col>

            {/* RIGHT LEAF */}
            <Col lg={2} className="d-none d-lg-flex justify-content-center">

              <div className="leaf-design">
                ❀
              </div>

            </Col>

          </Row>

        </div>

      </Container>

    </section>

    
  );
}

export default VenueSection;