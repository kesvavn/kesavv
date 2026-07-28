import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPhoneVolume, FaWhatsapp } from "react-icons/fa";
import "./WeddingPhotoVideocss/WeddingPhotoVideo.css";

function WeddingPhotosVideo() {
  return (
    <section className="photoHero">

      <div className="heroOverlay"></div>

      <Container className="heroContainer">

        <Row className="align-items-center min-vh-100">

          <Col lg={7} md={9}>

            <div className="heroContent">

              <h1>
                Best Wedding Photography in Kerala:
                <br />
                Capturing Your Love Story
              </h1>

              <p>
                Wedding photography in Kerala is an art that captures the
                timeless beauty and intimate moments of your special day.
                Our skilled wedding photographers will document your love
                story, capturing every laugh, every tear and every precious
                memory that will last a lifetime.
              </p>

              <div className="heroButtons">

                <Button className="expertBtn">
                  <FaPhoneVolume className="me-2" />
                  Talk to Expert
                </Button>

                <a
                  href="https://wa.me/918592877733?text=Hi"
                  target="_blank"
                  rel="noreferrer"
                  className="whatsappBtn"
                >
                  <FaWhatsapp className="me-2" />
                  Whatsapp us
                </a>

              </div>

            </div>

          </Col>

        </Row>

      </Container>

    </section>
  );
}

export default WeddingPhotosVideo;