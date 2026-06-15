import "./Location.css";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Location() {

  const locations = {
    Kochi:
      "https://maps.google.com/maps?q=Kochi&t=&z=13&ie=UTF8&iwloc=&output=embed",

    Thrissur:
      "https://maps.google.com/maps?q=Thrissur&t=&z=13&ie=UTF8&iwloc=&output=embed",

    Calicut:
      "https://maps.google.com/maps?q=Calicut&t=&z=13&ie=UTF8&iwloc=&output=embed",

    Trivandrum:
      "https://maps.google.com/maps?q=Trivandrum&t=&z=13&ie=UTF8&iwloc=&output=embed",
  };

  const [activeCity, setActiveCity] = useState("Kochi");

  return (
    <section className="location-section">

      <Container>

        <Row>

          {/* LEFT SIDE */}

          <Col lg={6}>

            <div className="location-left">

              <div className="city-buttons">

                {Object.keys(locations).map((city) => (
                  <button
                    type="button"
                    key={city}
                    className={activeCity === city ? "active" : ""}
                    onClick={() => setActiveCity(city)}
                  >
                    {city}
                  </button>
                ))}

              </div>

              <div className="map-box">

                <iframe
                  title="Google Map"
                  src={locations[activeCity]}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                ></iframe>

              </div>

            </div>

          </Col>

          {/* RIGHT SIDE */}

          <Col lg={6}>

            <div className="location-right">

              <form className="location-form">

                <input
                  type="text"
                  placeholder="Enter your Full Name"
                />

                <input
                  type="text"
                  placeholder="Enter your Phone Number"
                />

                <input
                  type="email"
                  placeholder="Enter your Email ID"
                />

                <textarea
                  rows="5"
                  placeholder="Message"
                ></textarea>

                <button type="submit">
                  SUBMIT
                </button>

              </form>

            </div>

          </Col>

        </Row>

      </Container>

    </section>
  );
}

export default Location;