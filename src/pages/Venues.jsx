import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/Venues.css";
import MyNavbar from "../Navbar";
import { Container, Row, Col } from "react-bootstrap";
import Img from "../src/../images/1.webp";
import Img1 from "../components/venues/unnamed-1-1-1-rj8b7w1vo1m42q21rl8j4u8gwl8fmj9lewoijxy9iq.webp";
import Img2 from "../components/venues/2257_img3-rhvyl7p0694tnf39sawygjq9dlla96s83gdib4iz02.webp";
import Img3 from "../components/venues/2023-05-09-2-rez9yswvqakifvxjp0sa1i4n4bry1unp59ojb8eape.webp";
import Footer from "./Footer"
import Form from "../Form/Form";

function Venues() {

  const [selectedLocation, setSelectedLocation] = useState("");
const [showForm, setShowForm] = useState(false);

 const venues = [
  {
    id: 1,
    name: "Kakkatu Mana",
    location: "Palakkad",
    type: "Heritage property venues",
    image: Img1,
    link: "/kakkattu-mana",
  },
  {
    id: 2,
    name: "Kadavu Villas",
    location: "Thrissur",
    type: "Beach wedding",
    image: Img2,
    link: "/kadavu-villas",
  },
  {
    id: 3,
    name: "Kalappura Farm House",
    location: "Kochi",
    type: "Outdoor wedding",
    image: Img3,
    link: "/kalappura-farm-house",
  },
];

  const filteredVenues = selectedLocation
    ? venues.filter(
        (venue) =>
          venue.location.toLowerCase() ===
          selectedLocation.toLowerCase()
      )
    : venues;

  return (
    <div>

      {/* HERO SECTION */}
      <div className="venues-bg">
        <MyNavbar />

        <Container className="h-100">
          <Row className=" h-100 align-items-center">
            <Col md={6}>
              <h1 className="venue-head">
                Best Event & Wedding <br />
                Venues in Kerala
              </h1>

              <p className="venue-txt">
                Looking for a perfect venue in Kerala? Our updated list
                features the most stunning locations and venue types,
                from backwater and beach resorts to banquet halls and
                traditional local mandapas.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CONTENT SECTION */}
      <Container className="mt-5">
        <Row className="venue-row align-items-center">

          <Col md={6} className="venue-col">
            <h2>
              Venues in Kerala: A Fairytale Setting for Events
            </h2>

            <p className="mt-3">
              Melodia Event Management introduces Kerala’s venues, offering lush greenery, breathtaking beauty, and world-class amenities. These venues provide modern facilities and luxurious settings, making Kerala the perfect location for events
            </p>
          </Col>

          <Col md={6} className="venue-img-box">
            <img
              src={Img}
              alt="Venue"
              className="venue-img"
            />
          </Col>

          <Col md={12} className="venue-col mt-4">
            <p>
              Find the best event and wedding venues in Kerala with Melodia Event Management. We offer expert event management services for luxurious, traditional, and modern weddings, as well as corporate and private parties. Discover 300+ event venues with stunning locations. Use the smart filters below to explore and book your dream event and wedding venues in Kerala by location and venue type now!
            </p>
          </Col>

        </Row>
      </Container>

      {/* FILTER SECTION */}
      <Container className="venue-filter-section">

        <div className="filter-bar">

          <div className="filter-title">
            Filter Venue List
          </div>

          {/* LOCATION FILTER */}
          <select
            value={selectedLocation}zz
            onChange={(e) =>
              setSelectedLocation(e.target.value)
            }
          >
            <option value="">
              Select Venue Location
            </option>

            <option value="palakkad">
              Palakkad
            </option>

            <option value="thrissur">
              Thrissur
            </option>

            <option value="kochi">
              Kochi
            </option>
          </select>

          {/* TYPE FILTER */}
          <select>
            <option value="">
              Select Venue Type
            </option>

            <option value="heritage">
              AC Marriage Halls
            </option>

            <option value="beach">
              Beach Wedding
            </option>

            <option value="outdoor">
              Outdoor Wedding
            </option>
          </select>

          <input
            type="text"
            placeholder="Search Venue/Location..."
          />

        </div>

        {/* VENUE CARDS */}
        <Row className="g-4 mt-4">

          {filteredVenues.map((venue) => (
            <Col lg={4} md={6} key={venue.id}>

              <div className="venue-card">

                <img
                  src={venue.image}
                  alt={venue.name}
                />

                <div className="venue-card-body">

                  <div className="rating">
                    ★★★★★
                  </div>

                  <h4>
  <Link to={venue.link} className="venue-link">
    {venue.name}
  </Link>
</h4>

                  <p className="location">
                    📍 {venue.location}
                  </p>

                  <div className="btn-group-custom">

                  <button className="price-btn" onClick={() => setShowForm(true)}> Request Pricing</button>

                    <button className="whatsapp-btn">
                      Whatsapp Enquiry
                    </button>

                  </div>

                </div>

              </div>

            </Col>
          ))}

        </Row>

      </Container>

       {showForm && (
       <div className="form-overlay">
       <div className="form-modal">

      <button
        className="close-form"
        onClick={() => setShowForm(false)}  >
        ×
      </button>

      <Form />

    </div>
  </div>
)}

<Footer />
      
    </div>
  );
}

export default Venues;