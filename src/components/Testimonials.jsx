import "./Testimonials.css";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import VerifiedTick from "./events/ti-verified.svg";
import GoogleLogo from "./events/icon.svg";
import DividerImg from "../images/58cb37cd-b70a-4c5b-b8f9-4fc4d20bd3a0.svg";

function Testimonials() {

  const data = [
    {
      text: "This is best event management in Kerala. Our wedding event was amazing with this company. We are very happy with this group.",
      name: "Ashik Ch",
      time: "2 years ago",
      initial: "A",
    },
    {
      text: "In my point of view best event management in Thrissur and very good wedding planner in Kerala.",
      name: "PINDIYAN ANTONY",
      time: "3 years ago",
      initial: "P",
    },
    {
      text: "Very good event management company Kerala. We had a wedding last year. The wedding was wonderful in Thrissur.",
      name: "Saleena Devassy",
      time: "3 years ago",
      initial: "S",
    },
    {
      text: "Melodia Events is very good event management in Thrissur. My daughter's wedding was amazing with this company.",
      name: "Peter K P",
      time: "3 years ago",
      initial: "P",
    },
    {
      text: "Very good event management company. Good team management and coordination.",
      name: "Pushpa P L",
      time: "3 years ago",
      initial: "P",
    },
  ];

  return (
    <section className="testimonials">

      <Container>

        {/* HEADING */}

        <Row>

          <Col lg={12}>

            <p className="sub">
              CLIENT TESTIMONIALS
            </p>

            <h2 className="main">
              See What our Clients has to Say
            </h2>

            <div className="divider">

              <img
                src={DividerImg}
                alt="divider"
                className="divider-img"
              />

            </div>

          </Col>

        </Row>

        {/* SWIPER */}

        <Row>

          <Col lg={12}>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={25}
              slidesPerView={3}
              navigation={true}
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,}}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="testimonial-swiper"
            >

              {data.map((item, index) => (

                <SwiperSlide key={index}>

                  <div className="testimonial-card">

                    {/* TOP */}

                    <div className="top">

                      <div className="stars">

                        ★★★★★

                        <img
                          src={VerifiedTick}
                          alt="Verified"
                          className="review-tick-img"
                        />

                      </div>

                      <div className="google">

                        <img
                          src={GoogleLogo}
                          alt="Google"
                        />

                      </div>

                    </div>

                    {/* TEXT */}

                    <p className="text">
                      {item.text}
                    </p>

                    {/* BUTTON */}

                    <button className="read-more">
                     
                    </button>

                    {/* USER */}

                    <div className="user">

                      <div className="avatar">
                        {item.initial}
                      </div>

                      <div>

                        <h4 className="user-name">
                          {item.name}
                        </h4>

                        <span>
                          {item.time}
                        </span>

                      </div>

                    </div>

                  </div>

                </SwiperSlide>

              ))}

            </Swiper>

          </Col>

        </Row>

      </Container>

    </section>
  );
}

export default Testimonials;