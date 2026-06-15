import { Container, Button } from "react-bootstrap";
import "./Destination.css";

function DestinationSection() {
  return (
    <div className="destination-section">
      <Container className="destination">

        <h2 className="dest-title">
          Unlock Your Dream Destination
          <br />
           Wedding in Kerala
        </h2>

        <p className="dest-text">
        Choose Melodia Event Management Company for your premium destination celebrations in Kerala, India. Whether you dream of a beach event in Kerala or a backwater resort celebration, we will bring it to life and infuse it with rich traditions. We also offer venue selection help and guidance to make planning easier. Our track record includes clients from India and abroad, making us your ideal partner for a dream destination event in Kerala, India
        </p>

        <div className="dest-buttons">
          <Button id="call-btn">
            <i className="fas fa-phone-volume me-2"></i>
            Talk to Expert
          </Button>

          <a href="https://wa.me/918592877733?text=Hi"
            target="_blank" rel="noopener noreferrer">
            <Button id="whatsapp-btn">
              <i className="fab fa-whatsapp me-2"></i>
              Whatsapp us
            </Button>
          </a>
        </div>

      </Container>
    </div>
  );
}

export default DestinationSection;