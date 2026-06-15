import "./ContactSection.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import awardImage1 from "./events/award2.webp";
import awardImage2 from "./events/award1.webp";
import awardImage3 from "./events/Screenshot-2025-12-27-at-1.23.02 PM-2048x1101.webp";

function ContactSection() {
  return (
      <>
    <section className="contact-section">
      <div className="overlay"></div>

      <Container>
        <Row className="contact-container">

          {/* LEFT CONTENT */}
          <Col lg={6} className="contact-left">
            <h1 className="contact-title">
              LOOKING FOR THE MOST <br />
              CREATIVE & INNOVATIVE EVENT <br />
              PLANNERS IN KERALA?
            </h1>

            <p className="contact-description">
              Imagine celebrating the most special events of your life without
              worrying about a single thing. Melodia Event Management is here
              to make your dream events come true! Our expert event management
              team offers professional event planning and management services
              across Kerala using creative and innovative methods.
            </p>
          </Col>

          {/* RIGHT FORM */}
          <Col lg={5} className="contact-right">
            <Form>

              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Enter your Full Name"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Enter your Phone Number"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Enter your Email ID"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Message"
                />
              </Form.Group>

              <Button className="submit-btn" style={{  border: "2px solid white" }}>
                SUBMIT
              </Button>

            </Form>
          </Col>

        </Row>
      </Container>
    </section>


       <section className="awards-section">

      <p className="award-subtitle">
        AWARDS & RECOGNITIONS
      </p>

      <h2 className="award-title">
        The Best Event Management Company in Kerala
      </h2>

      <p className="award-description">
        Our excellence in event planning has been officially honoured at the
        BGS Business Growth Summit, where we were awarded the title of
        <strong> Best Event Management Company in Kerala.</strong>

        We were privileged to receive this award from the renowned Malayalam
        actor <span className="highlight">Tini Tom</span>, adding even more
        pride to this achievement.

        This recognition reflects our commitment to flawless execution,
        creative concepts, and customer happiness. Every event we plan, from
        very small birthday parties to very big corporate celebrations, is
        driven by passion, innovation, and trust.

        We continue to raise the standards of event management in Kerala with
        premium service, reliable coordination, and memorable experiences for
        every client.
      </p>

      <div className="divider">
        <span></span>
        ◆
        <span></span>
      </div>
      <section className="image-section">
      <Container>
        <Row className="g-4 align-items-center">

          {/* LEFT IMAGE */}
          <Col lg={6} md={6} sm={12}>
            <img
              src={awardImage1}
              alt="event"
              className="side-img"
            />
          </Col>

          {/* RIGHT IMAGE */}
          <Col lg={6} md={6} sm={12}>
            <img
              src={awardImage2}
              alt="event"
              className="side-img"
            />
          </Col>

           <Col full={12} className="text-center">
            <img
              src={awardImage3}
              alt="event"
              className="side-img"
            />
          </Col>
        </Row>
      </Container>
    </section>
    
    </section>
    </>
  );
}

export default ContactSection;
