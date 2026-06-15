import { Container } from "react-bootstrap";
import "./Certificate.css";
import badge from "../images/certificate-badge.png"; // ✅ correct path

function Certificate() {
  return (
    <>
    <div className="certificate-section">
      <Container className="text-center">

        {/* 🔹 Badge Image */}
        <img
             src={badge}
             alt="ISO Certified"
             className="cert-badge"/>

        {/* 🔹 Tag */}
        <h6 className="cert-tag">
          ISO 9001:2015 CERTIFIED
        </h6>

        {/* 🔹 Title */}
        <h2 className="cert-title">
          EVENT MANAGEMENT COMPANY IN KERALA
        </h2>

        {/* 🔹 Description */}
        <p className="cert-desc">
          Have you ever dreamed of planning the perfect event that will be remembered forever?
          Look no further than Melodia Event Management, the top-notch event management company in Kerala,
          India, that has everything you need to make your occasion an unforgettable experience.
          We make everything from corporate event planning and personal celebrations to even small customised
          event packages absolutely memorable! Contact us today to learn more about our services and how we can
          help you organise the top event management in Kerala.
        </p>

        {/* 🔹 Bottom Line Design */}
        <div className="cert-divider"></div>

      </Container>
    </div>
    
  </>
  );
}

export default Certificate;