import React from "react";
import { Container } from "react-bootstrap";
import MyNavbar from "../../Navbar";
import "./Blogs.css";
import Testimonials from "../Testimonials";

function Test() {
  return (
    <>
      <section className="test-section">
        <div className="test-overlay"></div>

        <MyNavbar />

        
      </section>
      <Container className="test-content">
          <div className="client-review-section">
            <p className="client-review-subtitle">
              MELODIA'S CLIENT TESTIMONIALS
            </p>

            <h2 className="client-review-title">
              See what our Clients have to say
            </h2>

            <p className="client-review-text">
              Clients have praised Melodia Events for their professionalism,
              attention to detail, and creative approach in creating stunning
              and unforgettable events. They appreciate the stress-free
              planning experience and 
               recommend Melodia Events as a top-notch
              event management team.
            </p>
          </div>
         
        </Container>
        <Testimonials />
    </>
  );
}

export default Test;