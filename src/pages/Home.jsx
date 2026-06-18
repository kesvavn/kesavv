import MyNavbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import "./Home.css";

import Stats from "../components/Stats";
import DestinationSection from "../components/DestinationSection";
import ImageSlider from "../components/ImageSlider";
import ImageSlider1 from "../components/ImageSlider1";
import ImageSlider2 from "../components/ImageSlider2";
import ImageSlider3 from "../components/ImageSlider3";

import OurServices from "../components/OurServices";
import VideoSection from "../components/video section/VideoSection";
import Certificate from "../components/Certificate";
import { Container, Button } from "react-bootstrap";
import Testimonials from "../components/Testimonials";
import ContactSection from "../components/ContactSection";
import FeaturedSection from "../components/FeaturedSection";
import BlogSection from "../components/BLOGS & ARTICLES/BlogSection";
import VenueSection from "../components/VenueSection";
import VideoReview from "../components/VideoReview";
import Faq from "../components/Faq";
import TopVenueSlider from "../components/venues/TopVenueSlider";
import Location from "../components/Location";

import Review from "../images/1.webp";
import Review1 from "../images/2.webp";
import Review2 from "../images/3.webp";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero">

      {/* SLIDER SECTION */}
      <div className="slider-container">
        <Slider>
          <MyNavbar />

          <div className="hero-section">
            <Container className="hero-content offset-lg-0 col-lg-6 col-12">

              <p className="top-text1">
                KERALA'S #1 EXCLUSIVE EVENT COMPANY
              </p>

              <h1 className="main-heading">
                Partner with Melodia <br />
                Event Management in <br />
                Kerala
              </h1>

              {/* HERO BOTTOM */}
              <div className="hero-bottom">

                <Button
                  id="contact"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </Button>

                <div className="review-wrapper">

                  <div className="review-images">
                    <img src={Review} alt="review" className="review-img" />
                    <img src={Review1} alt="review1" className="review-img" />
                    <img src={Review2} alt="review2" className="review-img" />
                  </div>

                  <div className="review-rating">
                    <div className="stars">★★★★★</div>
                    <h4>4.8/5 Rating</h4>
                  </div>

                </div>

              </div>

            </Container>
          </div>
        </Slider>
      </div>

      {/* SECTIONS */}
      <Stats />
      <VideoSection />
      <Certificate />

      {/* HOME FLEX SECTION */}
      <div className="home-flex">

        <div className="left">
          <ImageSlider />
          <ImageSlider1 />
          <ImageSlider2 />
          <ImageSlider3 />
        </div>

        <div className="right">
          <DestinationSection />
        </div>

      </div>

      <OurServices />
      <Testimonials /><br />
      <ContactSection />
      <FeaturedSection />
      <BlogSection />
      <VenueSection />
      <VideoReview />
      <Faq />
      <TopVenueSlider />
      <Location />

    </div>
  );
}

export default Home;