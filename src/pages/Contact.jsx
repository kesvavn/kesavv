import { Container, Row, Col } from "react-bootstrap";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import MyNavbar from "../Navbar";
import "./Contact.css";

import BranchOffice from "../components/Contact/BranchOffice";
import Footer from "./Footer";
import ContactForm from "../Form/ContactForm";

import { useSettings } from "../context/SettingsContext";

function Contact() {
  const { settings, loading } = useSettings();

  // Settings loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* ================= CONTACT HERO ================= */}

      <div className="cont-bg">

        <MyNavbar />

        <Container className="contact-container">

          <Row>

            <Col md={12} className="contact-content">

              <h1 className="cont-head">
                Contact Us
              </h1>

              <div className="cont-txt">

                <p>
                  Need help planning your next event?
                  Look no further than{" "}
                  {settings.companyName || "Melodia Event Management"}!
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


      {/* ================= REACH SECTION ================= */}

      <section className="reach-section">

        <Container>

          <Row className="align-items-center">

            {/* ================= LEFT SIDE ================= */}

            <Col lg={6} className="mb-5 mb-lg-0">

              <h2 className="reach-title">
                WANT TO WORK WITH US?
              </h2>


              {/* ================= PHONE ================= */}

              <div className="reach-card">

                <div className="reach-icon">
                  <FaPhoneAlt />
                </div>

                <div>

                  <p className="reach-label">
                    TALK TO OUR CLIENT SUPPORT TEAM
                  </p>

                  <h4 className="reach-number">

                    <a
                      href={`tel:${settings.phone || ""}`}
                      className="contact-link"
                    >
                      {settings.phone || "+91 859 001 0011"}
                    </a>

                  </h4>

                </div>

              </div>


              {/* ================= EMAIL ================= */}

              <div className="reach-card">

                <div className="reach-icon">
                  <FaEnvelope />
                </div>

                <div>

                  <p className="reach-label">
                    WRITE TO US ABOUT YOUR NEEDS
                  </p>

                  <h4 className="reach-mail">

                    <a
                      href={`mailto:${settings.email || ""}`}
                      className="contact-link"
                    >
                      {settings.email ||
                        "melodiaeventmanagement@gmail.com"}
                    </a>

                  </h4>

                </div>

              </div>


              {/* ================= SOCIAL ICONS ================= */}

              <div className="reach-socials">

                {/* Instagram */}

                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                )}


                {/* YouTube */}

                {settings.youtube && (
                  <a
                    href={settings.youtube}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </a>
                )}


                {/* Facebook */}

                {settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                )}


                {/* LinkedIn */}

                {settings.linkedin && (
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                )}


                {/* Twitter */}

                {settings.twitter && (
                  <a
                    href={settings.twitter}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                )}

              </div>

            </Col>


            {/* ================= RIGHT SIDE ================= */}

            <Col lg={6}>

              <div className="reach-form-wrapper">

                <ContactForm />

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* ================= BRANCH OFFICE ================= */}

      <BranchOffice />


      {/* ================= FOOTER ================= */}

      <Footer />

    </>
  );
}

export default Contact;