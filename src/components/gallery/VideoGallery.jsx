// VideoGallery.jsx

import React from "react";
import { Container,Row ,Col } from "react-bootstrap";
import MyNavbar from "../../Navbar";
import "../gallery/gallery.css";

function VideoGallery() {
  return (
    <>
      <div className="video-hero">

        {/* Background YouTube Video */}
        <iframe
          className="bg-video"
          src="https://www.youtube.com/embed/_8UqAZ5CwIA?autoplay=1&mute=1&controls=0&loop=1&playlist=_8UqAZ5CwIA"
          title="Background Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>

        {/* Overlay */}
        <div className="video-overlay"></div>

        {/* Navbar */}
        <MyNavbar />

      <Container className="hero-content1">
  <Row className="justify-content-center">
    <Col lg={12} md={10} xs={2}>
      <h1 className="text-center">
        Video Gallery of Melodia
      </h1>
    </Col>
  </Row>
</Container>

      </div>

      <Container>
        <Row>
          <Col>
           <h1 className="gallytxt ">
             Melodia Event Management: Experience the Magic of Kerala’s Finest Event Videos
           </h1>
           
           <p className="gallytxt1"> Welcome to Melodia® Event Management’s video gallery page, where we bring the vibrancy and joy of celebrations to everybody’s life! As one of the leading event planners in Kerala, we are very passionate about capturing the unforgettable moments that make everybody’s event a unique one. From traditional wedding ceremonies to modern receptions, our videos showcase the heart and soul of each occasion. On this page, you will find a curated selection of our best event videos, featuring:           </p>
             
             <ul className="gallylist">
            <li>Stunning wedding cinematography</li>
            <li>Breathtaking decor highlights</li>
            <li>Mesmerizing dance performances</li>
            <li>Engaging live entertainment</li>
            </ul>
           
           <p className="gallytxt1">We have only shared a few of our works here due to policy constraints, but there’s so much more to explore! Dive into the world of Melodia Event Management by connecting with us directly. Our extensive video collection features the latest trends in event videography, including cinematic wedding films, live stage performances, and engagement highlights. 
 
</p>
            <p className="gallytxt1">Get in Touch for Exclusive Content! </p>

            <p className="gallytxt1">For access to our full video collection, personalized event videos, and more, simply message us on WhatsApp or send an email. Our team is always ready to respond promptly, share additional videos, and guide you with insights to make your event truly spectacular. Do not miss out on experiencing the magic! Contact Melodia Event Management today, and let us help you create memories that last a lifetime.</p>
          </Col>
        </Row>
      </Container>
      

<Container className="py-5">
  <Row className="g-4">
  <Col lg={6} md={11}>
    <div className="video-wrapper1">
      <iframe
        src="https://www.youtube.com/embed/hTor-Ed8e50"
        title="Video 1"
        allowFullScreen
      />
    </div>
  </Col>

  <Col lg={6} md={11}>
    <div className="video-wrapper1">
      <iframe
        src="https://www.youtube.com/embed/_8UqAZ5CwIA"
        title="Video 2"
        allowFullScreen
      />
    </div>
  </Col>

  <Col lg={6} md={11}>
    <div className="video-wrapper1">
      <iframe
      src="https://www.youtube.com/embed/XmeDDNbTLrw"
      title="Video 3"
        allowFullScreen
      />
    </div>
  </Col>

   <Col lg={6} md={11}>
    <div className="video-wrapper1">
      <iframe
      src="https://www.youtube.com/embed/DjOPI2uLQYw?start=12"
      title="Video 3"
        allowFullScreen
      />
    </div>
  </Col>
</Row>
</Container>
    </>
  );
}

export default VideoGallery;