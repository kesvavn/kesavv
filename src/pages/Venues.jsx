import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


import "../pages/Venues.css";

import MyNavbar from "../Navbar";
import { Container, Row, Col } from "react-bootstrap";

import Img from "../images/1.webp";

import Footer from "./Footer";
import Form from "../Form/Form";
import Login from "../components/Login/Login";


function Venues() {


const [showSidebar, setShowSidebar] = useState(false);
const [showForm, setShowForm] = useState(false);

const [selectedLocation,setSelectedLocation] = useState("");
const [selectedType,setSelectedType] = useState("");
const [search,setSearch] = useState("");

const [selectedVenue,setSelectedVenue] = useState(null);

const [venues,setVenues] = useState([]);

const [showAvailability, setShowAvailability] = useState(false);
const [availabilityVenue, setAvailabilityVenue] = useState(null);
const [unavailableDates, setUnavailableDates] = useState([]);

const handleCheckAvailability = async (venue) => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/availability/unavailable",
      {
        params: {
          venueId: venue._id,
        },
      }
    );

    setAvailabilityVenue(venue);
    setUnavailableDates(res.data);
    setShowAvailability(true);

  } catch (error) {
    console.log("Availability Error:", error);
  }
};


useEffect(()=>{

fetchVenues();

},[]);



const fetchVenues = async()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/venues"
);


console.table(
  res.data.map((v) => ({
    title: v.title,
    link: v.link,
  }))
);

setVenues(res.data);


}
catch(error){

console.log(error);

}

};

const openAvailability = async (venue) => {
  try {
    console.log("Selected Venue:", venue);

    const res = await axios.get(
      "http://localhost:5000/api/availability/unavailable",
      {
        params: {
          venueId: venue._id,
        },
      }
    );

    console.log("Unavailable Dates:", res.data);

    setAvailabilityVenue(venue);
    setUnavailableDates(res.data);
    setShowAvailability(true);

  } catch (error) {
    console.log("Availability Error:", error);
  }
};


const filteredVenues = venues.filter((venue)=>{


return (

selectedLocation === "" ||

venue.location
?.toLowerCase()
.includes(
selectedLocation.toLowerCase()
)

)

&&

(

selectedType === "" ||

venue.type
?.toLowerCase()
.includes(
selectedType.toLowerCase()
)

)

&&

(

search === "" ||

venue.title
?.toLowerCase()
.includes(
search.toLowerCase()
)

);


});




return (

<div>


<Login

showSidebar={showSidebar}

setShowSidebar={setShowSidebar}

onLogin={()=>{

setShowSidebar(false);

setShowForm(true);

}}

/>





{/* HERO */}

<div className="venues-bg">


<MyNavbar />


<Container className="venue-hero-content">
    <Row className="align-items-center">

        <Col lg={7}>
            <h1 className="venue-head">
                Best Event & Wedding
                <br />
                Venues in Kerala
            </h1>

            <p className="venue-txt">
               Looking for a perfect venue in Kerala? Our updated list features the most stunning locations and venue types, from backwater and beach resorts to banquet halls and traditional local mandapas. Find your dream event venue in Kerala today! 
            </p>
        </Col>

    </Row>
</Container>


</div>



{/* INTRO */}


<Container className="mt-5">

<Row>


<Col md={6}>


<h2>

Venues in Kerala

</h2>


<p className="venues-para">

Melodia Event Management introduces Kerala’s venues, offering lush greenery, breathtaking beauty, and world-class amenities. These venues provide modern facilities and luxurious settings, making Kerala the perfect location for events.

</p>


</Col>



<Col md={6}>


<img

src={Img}

className="venue-img"

alt="venue"

/>


</Col>

<Col>
<p className="venues-para">Find the best event and wedding venues in Kerala with Melodia Event Management. We offer expert event management services for luxurious, traditional, and modern weddings, as well as corporate and private parties. Discover 300+ event venues with stunning locations. Use the smart filters below to explore and book your dream event and wedding venues in Kerala by location and venue type now!</p>
</Col>
</Row>


</Container>









{/* FILTER */}


<Container className="venue-filter-section">


<div className="filter-bar">


<h4>

Filter Venue List

</h4>





<select

value={selectedLocation}

onChange={(e)=>
setSelectedLocation(e.target.value)
}

>


<option value="">

Select Location

</option>


<option value="palakkad">

Palakkad

</option>


<option value="kozhikode">

Kozhikode

</option>


<option value="kochi">

Kochi

</option>

<option value="kerala">

kerala

</option>


</select>





<select

value={selectedType}

onChange={(e)=>
setSelectedType(e.target.value)
}

>


<option value="">

Select Type

</option>


<option value="heritage">

Heritage

</option>


<option value="Ac Halls">

Ac Halls

</option>


<option value="wedding">

Wedding

</option>


</select>



<input

type="text"

placeholder="Search venue"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>

</div>
<br /><br />

<Row>


{filteredVenues.map((venue) => {

const venueSlug = venue.slug?.replace(/^\/+/, "") || "";

console.log("Venue:", venue.title);
console.log("Link:", venue.link);
console.log("Slug:", venueSlug);
  return (

    <Col lg={4} md={6} sm={12} key={venue._id}>

<div className="venue-card">


{/* IMAGE */}

<Link to={`/venue/${venueSlug}`}>

<img
src={
venue.image?.startsWith("/uploads")
?
`http://localhost:5000${venue.image}`
:
`http://localhost:5000/uploads/${venue.image}`
}
alt={venue.title}
className="venue-image"
/>

</Link>



<div className="venue-card-body">





{/* TITLE */}

<h4>

<Link
to={`/venue/${venueSlug}`}
className="venue-name-link"
>

{venue.title}

</Link>

</h4>


{/* RATING */}

<div className="rating">

{venue.rating || "★★★★★"}

</div>

{/* LOCATION */}

<p className="venue-location">

📍 {venue.location}

</p>



{/* TYPE */}

<span className="venue-type">

{venue.type}

</span>



{/* BUTTONS */}

<div className="btn-group-custom">


<a
href={`https://wa.me/919876543210?text=Hi, I need enquiry for ${venue.title}`}
target="_blank"
rel="noopener noreferrer"
className="whatsapp-btn"
>

WhatsApp

</a>
  <button
    className="availability-btn"
    onClick={() => handleCheckAvailability(venue)}
  >
    Check Availability
  </button>

<button

className="price-btn"

onClick={(e)=>{

e.stopPropagation();

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

  );

})}


</Row>



</Container>







{showForm && (
  <div className="form-overlay">

    <div className="form-modal">

      <button
        className="close-modal"
        onClick={() => setShowForm(false)}
      >
        ✕
      </button>

      <Form
        venue={selectedVenue}
        closeForm={() => setShowForm(false)}
      />

    </div>

  </div>
)}


{showAvailability && (
  <div className="availability-overlay">

    <div className="availability-modal">

      <button
        className="close-modal"
        onClick={() => setShowAvailability(false)}
      >
        ✕
      </button>

      <h3>Check Availability</h3>

      <h5>{availabilityVenue?.title}</h5>

      <p>📍 {availabilityVenue?.location}</p>

      <hr />

      <h5>Unavailable Dates</h5>

      {unavailableDates.length === 0 ? (

        <p className="available-text">
          ✅ No unavailable dates found.
        </p>

      ) : (

        <div className="availability-list">

          {unavailableDates.map((item) => (

            <div
              className="availability-item"
              key={item._id}
            >

              <strong>
                {new Date(item.date).toLocaleDateString("en-IN")}
              </strong>

              <span>
                {item.status}
              </span>

              {item.reason && (
                <small>
                  {item.reason}
                </small>
              )}

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
)}

<Footer/>


</div>

);


}


export default Venues;