import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
Container,
Row,
Col,
Button,
Badge,
Modal,
Spinner,
Form as BootstrapForm
} from "react-bootstrap";


import PricingForm from "../Form/Form";

import {
  FaMapMarkerAlt,
  FaWifi,
  FaParking,
  FaCar,
  FaBolt,
  FaUtensils,
  FaShieldAlt,
  FaCamera,
} from "react-icons/fa";
import "./VenueDetails.css";
import LoginSidebar from "../components/Login/Login";
const API = "http://localhost:5000";

function VenueDetails() {
 const { slug } = useParams();


const [venue, setVenue] = useState(null);
const [loading, setLoading] = useState(true);

const [selectedImage, setSelectedImage] = useState("");

const [showModal, setShowModal] = useState(false);


// ADD THESE

const [showForm, setShowForm] = useState(false);

const [selectedVenue, setSelectedVenue] = useState(null);

const [showSidebar, setShowSidebar] = useState(false);


const [relatedVenues, setRelatedVenues] = useState([]);
  const fetchRelatedVenues = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/venues");

    const data = res.data.filter(
      (v) =>
        v.type === venue.type &&
        v._id !== venue._id
    );

    setRelatedVenues(data.slice(0, 3));
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  if (venue) {
    fetchRelatedVenues();
  }
}, [venue]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    functionDate: "",
    guests: "",
  });

  useEffect(() => {
    fetchVenue();
  }, [slug]);

  const fetchVenue = async () => {
    try {
      const res = await axios.get(
        `${API}/api/venues/slug/${slug}`
      );

      setVenue(res.data);

      if (res.data.image) {
        if (res.data.image.startsWith("/uploads")) {
          setSelectedImage(API + res.data.image);
        } else {
          setSelectedImage(
            `${API}/uploads/${res.data.image}`
          );
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const imageURL = (img) => {
    if (!img) return "";

    if (img.startsWith("/uploads")) {
      return API + img;
    }

    return `${API}/uploads/${img}`;
  };

  if (loading) {
    return (
      <div className="loading-page">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!venue) {
    return (
      <Container className="text-center py-5">
        <h2>Venue Not Found</h2>
      </Container>
    );
  }

console.log("venue", venue);
console.log("selectedVenue", selectedVenue);
console.log("showForm", showForm);

  return (
    <Container className="py-5">

      <Row>

        {/* LEFT */}

        <Col lg={7}>

          <img
            src={selectedImage}
            className="main-image"
            alt={venue.title}
          />

          <Row className="mt-3">

            <Col xs={3}>
              <img
                src={imageURL(venue.image)}
                className="thumb"
                onClick={() =>
                  setSelectedImage(
                    imageURL(venue.image)
                  )
                }
              />
            </Col>

            {venue.gallery?.map((item, index) => (

              <Col xs={3} key={index}>

                <img
                  src={imageURL(item.url)}
                  className="thumb"
                  onClick={() =>
                    setSelectedImage(
                      imageURL(item.url)
                    )
                  }
                />

              </Col>

            ))}

          </Row>

        </Col>

        {/* RIGHT */}

        <Col lg={5}>

          <h1>{venue.title}</h1>

          <Badge bg="warning" text="dark">
            {venue.rating}
          </Badge>

          <p className="mt-3">

            <FaMapMarkerAlt />

            {" "}

            {venue.location}

          </p>

          <h5>{venue.category}</h5>

          <p>{venue.description}</p>
                    <hr />

          <h4 className="mb-3">Venue Amenities</h4>

          <div className="amenities">

            {venue.wifi && (
              <div className="amenity-box">
                <FaWifi />
                <span>Free WiFi</span>
              </div>
            )}

            {venue.parkingCapacity && (
              <div className="amenity-box">
                <FaParking />
                <span>{venue.parkingCapacity}</span>
              </div>
            )}

            {venue.security && (
              <div className="amenity-box">
                <FaShieldAlt />
                <span>24x7 Security</span>
              </div>
            )}

            {venue.powerBackup && (
              <div className="amenity-box">
                <FaBolt />
                <span>Power Backup</span>
              </div>
            )}

            {venue.catering && (
              <div className="amenity-box">
                <FaUtensils />
                <span>Catering Available</span>
              </div>
            )}

            {venue.cctv && (
              <div className="amenity-box">
                <FaCamera />
                <span>CCTV</span>
              </div>
            )}

          </div>

          <hr />

          <div className="price-card">

            <h3>Pricing</h3>

            <h2>

              ₹{venue.price?.min?.toLocaleString()}

              {" - "}

              ₹{venue.price?.max?.toLocaleString()}

            </h2>
<Button
variant="danger"
className="w-100 mt-3"
onClick={()=>{

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
</Button>

            <a
  href={`https://wa.me/919876543210?text=Hi, I am interested in ${venue.title}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-success w-100 mt-3"
>
  WhatsApp Enquiry
</a>
<Button
  className="w-100 mt-2"
  onClick={() =>
    navigator.share({
      title: venue.title,
      url: window.location.href,
    })
  }
>
  Share Venue
</Button>


          </div>

          <hr />

          <h4>Venue Information</h4>

          <table className="table table-bordered mt-3">

            <tbody>

              <tr>
                <th>Capacity</th>
                <td>{venue.capacity}</td>
              </tr>

              <tr>
                <th>Indoor Space</th>
                <td>{venue.indoorSpace}</td>
              </tr>

              <tr>
                <th>Outdoor Space</th>
                <td>{venue.outdoorSpace}</td>
              </tr>

              <tr>
                <th>AC Rooms</th>
                <td>{venue.acRooms}</td>
              </tr>

              <tr>
                <th>Non AC Rooms</th>
                <td>{venue.nonAcRooms}</td>
              </tr>

            </tbody>

          </table>

        </Col>

      </Row>

      <hr className="my-5" />

      <h2 className="mb-4">
        Location Map
      </h2>

 

{venue.map && venue.map.includes("embed") && (

<iframe
  src={venue.map}
  width="100%"
  height="450"
  style={{border:0}}
  loading="lazy"
  allowFullScreen
  title="venue-map"
/>

)}
<Modal
show={showForm}
onHide={()=>setShowForm(false)}
size="lg"
centered
>

<Modal.Header closeButton>
<Modal.Title>
Request Pricing - {selectedVenue?.title}
</Modal.Title>
</Modal.Header>


<Modal.Body>

<PricingForm

show={showForm}

handleClose={()=>setShowForm(false)}

venue={selectedVenue}

/>

</Modal.Body>


</Modal>



{showSidebar && (
<LoginSidebar

show={showSidebar}

handleClose={()=>{

setShowSidebar(false);

const token = localStorage.getItem("token");

if(token){

setSelectedVenue(venue);
setShowForm(true);

}

}}

/>
)}
    </Container>
  );
}

export default VenueDetails;