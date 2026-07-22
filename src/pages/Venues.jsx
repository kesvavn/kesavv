import React, { useState, useEffect } from "react";
import axios from "axios";
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
import Login from "../components/Login/Login";

function Venues() {
const [showSidebar, setShowSidebar] = useState(false);
const [showForm, setShowForm] = useState(false);
const [selectedLocation, setSelectedLocation] = useState("");
const [selectedType, setSelectedType] = useState("");
const [search, setSearch] = useState("");
const [selectedVenue, setSelectedVenue] = useState(null);

const handleRequest = (venue) => {
  setSelectedVenue(venue);
  setShowForm(true);
};

const [venues, setVenues] = useState([]);
useEffect(() => {
  fetchVenues();
}, []);

const fetchVenues = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/venues"
    );

    console.log("Venue API Data:", res.data);

    setVenues(res.data);

  } catch(error) {
    console.log(error);
  }
};


const filteredVenues = venues.filter((venue)=>{

return (

(selectedLocation === "" ||
venue.location?.toLowerCase() === selectedLocation.toLowerCase())

&&

(selectedType === "" ||
venue.type?.toLowerCase() === selectedType.toLowerCase())

&&

(search === "" ||
venue.title?.toLowerCase().includes(search.toLowerCase()) ||
venue.location?.toLowerCase().includes(search.toLowerCase()))

);

});

  return (
    
    <div>
<Login
  showSidebar={showSidebar}
  setShowSidebar={setShowSidebar}
  onLogin={()=>{
    console.log("Opening Form");
    setShowSidebar(false);
    setShowForm(true);
  }}
/>
      

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
            value={selectedLocation}
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
          <select
  value={selectedType}
  onChange={(e)=>setSelectedType(e.target.value)}
>

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
 value={search}
 onChange={(e)=>setSearch(e.target.value)}
 placeholder="Search Venue/Location..."
/>

        </div>

        {/* VENUE CARDS */}
<Row className="g-4 mt-4">

  {filteredVenues.map((venue) => (

    <Col lg={4} md={6} key={venue._id}>

    <div className="venue-card">

 <img
 src={
   venue.image?.startsWith("/uploads")
   ? `http://localhost:5000${venue.image}`
   : `http://localhost:5000/uploads/${venue.image}`
 }
 alt={venue.title}
/>

  <div className="venue-card-body">

    <div className="rating">
      {venue.rating || "★★★★★"}
    </div>

    <h4>
      <Link 
        to={venue.link}
        className="venue-name-link"
      >
        {venue.title}
      </Link>
    </h4>

    <p className="location">
      📍 {venue.location}
    </p>

    <p>
      {venue.type}
    </p>

    <div className="btn-group-custom">

      <a
        href={`https://wa.me/919876543210?text=Hi, I need enquiry for ${venue.title}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        WhatsApp Enquiry
      </a>

     <button
className="price-btn"
onClick={(e)=>{
  e.stopPropagation();

  console.log("CLICK VENUE:", venue);

  const token = localStorage.getItem("token");

  if(token){

    setSelectedVenue(venue);
    setShowForm(true);

  }
  else{
    setShowSidebar(true);
  }

}}
>
Request Pricing
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
        onClick={() => setShowForm(false)}
      >
        ×
      </button>
 <Form venue={selectedVenue} />
      
    </div>
  </div>
)}

      

<Footer />
      
    </div>
  );
}

export default Venues;