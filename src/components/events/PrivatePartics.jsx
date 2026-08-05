import { Container, Row, Col } from "react-bootstrap";
import "./event css/PrivatePartics.css";
import MyNavbar from "../../Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function PrivateParties() {

  const [parties, setParties] = useState([]);

useEffect(() => {
  window.scrollTo(0, 0);

  axios
    .get("http://localhost:5000/api/private-parties")
    .then((res) => setParties(res.data))
    .catch((err) => console.log(err));
}, []);

  return (
    <>
      {/* Hero Section */}
      <div className="private-parties-bg">

        <MyNavbar />

        <Container>
          <Row className="align-items-center justify-content-center min-vh-100">

            <Col xs={12} md={10} lg={8} className="text-center">

              <h1 className="text-white fw-bold">
                Private Parties Event Management
               
              </h1>

              <p className="text-white text-para mt-4">
                Experience the magic of Kerala’s top private parties event
                management companies in Kochi.
                <br />
                If you want to make a statement at your next private parties
                event, partner with Melodia Event Management Company in Kerala.
              </p>

            </Col>

          </Row>
        </Container>

      </div>


      {/* Second Section */}
      <Container>

        <Row className="align-items-center justify-content-center py-5">

          <Col xs={12} md={10} lg={8} className="text-center">

            <h1 className="text-dark fw-bold">
              Exclusive soirées amidst Kerala's breathtaking backdrops
            </h1>

           
          </Col>

        </Row>

      </Container>
      {/* Private Party Services */}
<Container className="py-5">
  <Row className="g-4">
    {parties.map((party) => (
      <Col md={6} key={party._id}>
        <div className="party-card shadow-sm h-100">
          <img
            src={`http://localhost:5000${party.image}`}
            alt={party.title}
            className="img-fluid party-img"
          />

          <div className="p-4">
            <h3 className="fw-bold mb-3">{party.title}</h3>

            <p className="text-muted">
              {party.description}
            </p>

            <button className="btn btn-warning mt-3">
              Request Pricing
            </button>
          </div>
        </div>
      </Col>
    ))}
  </Row>
</Container>
{/* Why Choose Us */}
<Container className="py-5">
  <Row className="text-center mb-5">
    <Col>
      <h2 className="fw-bold">Why Choose Melodia?</h2>
      <p className="text-muted">
        We create unforgettable private parties with creativity, elegance, and
        professional event management.
      </p>
    </Col>
  </Row>

  <Row className="g-4">

    <Col md={3} sm={6}>
      <div className="why-card text-center p-4">
        <i className="bi bi-stars why-icon"></i>
        <h5 className="mt-3">Creative Themes</h5>
        <p>Unique party concepts designed to match your style and occasion.</p>
      </div>
    </Col>

    <Col md={3} sm={6}>
      <div className="why-card text-center p-4">
        <i className="bi bi-camera-fill why-icon"></i>
        <h5 className="mt-3">Photography</h5>
        <p>Capture every memorable moment with our professional team.</p>
      </div>
    </Col>

    <Col md={3} sm={6}>
      <div className="why-card text-center p-4">
        <i className="bi bi-music-note-beamed why-icon"></i>
        <h5 className="mt-3">Entertainment</h5>
        <p>DJ, live music, games, and engaging performances for guests.</p>
      </div>
    </Col>

    <Col md={3} sm={6}>
      <div className="why-card text-center p-4">
        <i className="bi bi-cup-hot-fill why-icon"></i>
        <h5 className="mt-3">Premium Catering</h5>
        <p>Delicious menus with customized food and beverage options.</p>
      </div>
    </Col>

  </Row>
</Container>
{/* Gallery Section */}
<Container className="py-5">
  <Row className="text-center mb-4">
    <Col>
      <h2 className="fw-bold">Private Party Gallery</h2>
      <p className="text-muted">
        Take a look at some of our memorable birthday and anniversary celebrations.
      </p>
    </Col>
  </Row>

  <Row className="g-4">

    <Col md={4} sm={6}>
      <div className="gallery-card">
        <img
          src="/images/privateparty/gallery1.jpg"
          alt="Birthday Decoration"
          className="gallery-img"
        />
      </div>
    </Col>

    <Col md={4} sm={6}>
      <div className="gallery-card">
        <img
          src="/images/privateparty/gallery2.jpg"
          alt="Anniversary Celebration"
          className="gallery-img"
        />
      </div>
    </Col>

    <Col md={4} sm={6}>
      <div className="gallery-card">
        <img
          src="/images/privateparty/gallery3.jpg"
          alt="Private Party"
          className="gallery-img"
        />
      </div>
    </Col>

    <Col md={4} sm={6}>
      <div className="gallery-card">
        <img
          src="/images/privateparty/gallery4.jpg"
          alt="Birthday Event"
          className="gallery-img"
        />
      </div>
    </Col>

    <Col md={4} sm={6}>
      <div className="gallery-card">
        <img
          src="/images/privateparty/gallery5.jpg"
          alt="Anniversary Stage"
          className="gallery-img"
        />
      </div>
    </Col>

    <Col md={4} sm={6}>
      <div className="gallery-card">
        <img
          src="/images/privateparty/gallery6.jpg"
          alt="Party Decoration"
          className="gallery-img"
        />
      </div>
    </Col>

  </Row>
</Container>
{/* Testimonials */}
<Container className="py-5">
  <Row className="text-center mb-5">
    <Col>
      <h2 className="fw-bold">What Our Clients Say</h2>
      <p className="text-muted">
        Hear from our happy clients who celebrated their special moments with us.
      </p>
    </Col>
  </Row>

  <Row className="g-4">

    <Col md={4}>
      <div className="testimonial-card">
        <h5 className="fw-bold">⭐ ⭐ ⭐ ⭐ ⭐</h5>
        <p>
          "Melodia made my birthday celebration unforgettable. The decoration,
          music, and catering were simply amazing!"
        </p>
        <h6 className="fw-bold text-warning">– Akash</h6>
      </div>
    </Col>

    <Col md={4}>
      <div className="testimonial-card">
        <h5 className="fw-bold">⭐ ⭐ ⭐ ⭐ ⭐</h5>
        <p>
          "Our anniversary party was beautifully organized. Everything was
          perfect from start to finish."
        </p>
        <h6 className="fw-bold text-warning">– Priya & Rahul</h6>
      </div>
    </Col>

    <Col md={4}>
      <div className="testimonial-card">
        <h5 className="fw-bold">⭐ ⭐ ⭐ ⭐ ⭐</h5>
        <p>
          "Professional team, excellent service, and great attention to detail.
          Highly recommended!"
        </p>
        <h6 className="fw-bold text-warning">– Nithin</h6>
      </div>
    </Col>

  </Row>
</Container>
    </>
  );
}

export default PrivateParties;