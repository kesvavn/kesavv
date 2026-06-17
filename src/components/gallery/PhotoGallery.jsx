// PhotoGallery.jsx

import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MyNavbar from "../../Navbar";
import "../gallery/gallery.css";
import wedding1 from "../../components/gallery/IMG_20231010_101609_331.jpg";
import wedding2 from "../../components/gallery/Kerala-Haldi-stage-decoration-wedding.webp";

function PhotoGallery() {

  const galleryData = {

    wedding: [
      wedding1,
      wedding2,
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    ],

    corporate: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      "https://images.unsplash.com/photo-1515169067868-5387ec356754",
    ],

    music: [
      "https://images.unsplash.com/photo-1506157786151-b8491531f063",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
      "https://images.unsplash.com/photo-1501612780327-45045538702b",
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    ],

    private: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
    ],

    other: [
      "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    ],
  };

  const [activeTab, setActiveTab] = useState("wedding");

  return (
    <>
      {/* Hero Section */}
      <div className="photo-bg">
        <MyNavbar />

        <div className="photo-content text-center">
          <h1>Photo Gallery</h1>
          <p>Beautiful wedding and event photos will appear here.</p>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="gallery-section py-5">
        <Container>

          {/* Top Text */}
          <div className="gallery-top-text">
            <p>
            Melodia® Events always prioritizes the satisfaction of our clients in Kerala. We are particularly delighted to work with the Malayalee community, bringing joy from the heart. Here are some photos of our recent work in Kerala that we would like to share with you.
            Please note that we have only showcased a few photos here due to our company policy limitations. However, if you wish to explore our extensive collection, which includes our latest designs, decorations, wedding dance videos, other entertainment, recent wedding photos, and new trends in decorations and other event aspects, kindly contact us or send us a message on WhatsApp or Gmail. We have a dedicated team available to promptly respond to your inquiries, provide additional photos, and address any clarifications you may have. So, don’t hesitate; send us a message now!
            </p>
          </div>

          {/* Buttons */}
          <div className="gallery-buttons">

            <Button
              className={activeTab === "wedding" ? "active-btn" : "gallery-btn"}
              onClick={() => setActiveTab("wedding")}
            >
              Wedding Decors
            </Button>

            <Button
              className={activeTab === "corporate" ? "active-btn" : "gallery-btn"}
              onClick={() => setActiveTab("corporate")}
            >
              Corporate Event
            </Button>

            <Button
              className={activeTab === "music" ? "active-btn" : "gallery-btn"}
              onClick={() => setActiveTab("music")}
            >
              Music & Entertainment
            </Button>

            <Button
              className={activeTab === "private" ? "active-btn" : "gallery-btn"}
              onClick={() => setActiveTab("private")}
            >
              Private Parties
            </Button>

            <Button
              className={activeTab === "other" ? "active-btn" : "gallery-btn"}
              onClick={() => setActiveTab("other")}
            >
              Other Events
            </Button>

          </div>

          {/* Images */}
          <Row className="g-4 mt-2">

            {galleryData[activeTab].map((img, index) => (
              <Col lg={4} md={6} key={index}>
                <div className="gallery-card">
                  <img src={img} alt="gallery" />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default PhotoGallery;