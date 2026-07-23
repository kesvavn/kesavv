import React from "react";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";

import {
  FaUsers,
  FaCar,
  FaWifi,
  FaBolt,
  FaVideo,
  FaMapMarkerAlt,
  FaCheck,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

import {
  MdMeetingRoom,
  MdOutlineBedroomChild,
} from "react-icons/md";

import { TbTrees } from "react-icons/tb";
import { BiShield } from "react-icons/bi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

import "./venuecss/KalappuraFarmHouse.css";
import MyNavbar from "../../Navbar";


import melodiaLogo from "../../images/MELODIA-LOGO-03-1.webp";


function KalappuraFarmHouse() {

return (

<>



<div className="KalappuraFarmHouse-bg">
      <MyNavbar />

<div className="KalappuraFarmHouse-hero-contant">
<h1 className="KalappuraFarmHouse-heading">

Kalappura Farm House
<br/>
- Wedding & Event Space

</h1>



<div className="KalappuraFarmHouse-location">


<span>
📍 Thalakkathur, Kozhikode
</span>


<span>
4.6 Star Rated
</span>


<span className="stars">
★★★★★
</span>


</div>

</div>
</div>
<Container>

<Row className="mt-5">


{/* LEFT SIDE */}

<Col lg={8}>


<h2 className="KalappuraFarmHouse-title">

About Kalappura Farm House in Chathanur, Pattambi, Palakkad

</h2>



<p className="KalappuraFarmHouse-description">

Kalappura Farm House is a beautiful wedding venue
with indoor and outdoor spaces. It provides a peaceful
environment for weddings, receptions and private events.
Parking facilities are available for guests.

</p>





<Card className="shadow-sm KalappuraFarmHouse-info-card mt-4">


<Card.Body>


<h4 className="KalappuraFarmHouse-section-title">

Facilities

</h4>



<Row className="KalappuraFarmHouse-feature-row mt-4">



<Col md={4}>

<FaUsers/>

Guest Capacity : 500

</Col>




<Col md={4}>

<MdMeetingRoom/>

Indoor Space : 1

</Col>




<Col md={4}>

<MdOutlineBedroomChild/>

Non AC Rooms : None

</Col>





<Col md={4} className="mt-3">

<FaCar/>

Parking : 100 Cars

</Col>




<Col md={4} className="mt-3">

<TbTrees/>

Outdoor Space : 1

</Col>




<Col md={4} className="mt-3">

<MdOutlineBedroomChild/>

AC Rooms : 1

</Col>




</Row>


</Card.Body>


</Card>







{/* Amenities */}



<Card className="shadow-sm KalappuraFarmHouse-info-card mt-4">


<Card.Body>


<h4 className="KalappuraFarmHouse-section-title">

Amenities

</h4>



<Row className="mt-4">



<Col md={4}>

<FaWifi/>

Free WiFi

</Col>




<Col md={4}>

<BiShield/>

24/7 Security

</Col>




<Col md={4}>

<HiOutlineClipboardDocumentList/>

Custom Package

</Col>





<Col md={4} className="mt-3">

<FaBolt/>

Backup Power

</Col>




<Col md={4} className="mt-3">

<FaVideo/>

CCTV Surveillance

</Col>



</Row>


</Card.Body>


</Card>



</Col>






{/* RIGHT SIDE */}


<Col lg={4}>


<Card className="shadow KalappuraFarmHouse-enquiry-card">


<Card.Body>


<Form>


<Form.Control

placeholder="Enter your Full Name"

className="mb-3"

/>




<Form.Control

placeholder="Enter your Phone Number"

className="mb-3"

/>




<Button

variant="secondary"

size="lg"

className="w-100"

>

Plan your event with us

</Button>



</Form>


</Card.Body>


</Card>





<br/>
<br/>
<br/>
<br/>
<br/>





<Card className="KalappuraFarmHouse-promo-card text-white">



<Card.Body className="KalappuraFarmHouse-overlay">





<img

src={melodiaLogo}

alt="Melodia"

className="KalappuraFarmHouse-logo mb-4"

/>





<p className="KalappuraFarmHouse-promo-text">


Melodia Event Management is a professional wedding and
event planning company in Kerala. We offer full event
support including stage decoration, lighting,
entertainment and complete event coordination.


</p>




<p>

<FaMapMarkerAlt className="me-2"/>

Serving All of Kerala

</p>





<p>

<FaCheck className="me-2"/>

Trusted by Thousands

</p>






<div className="KalappuraFarmHouse-social-icons my-4">


<a href="#">

<FaInstagram/>

</a>



<a href="#">

<FaYoutube/>

</a>



<a href="#">

<FaFacebookF/>

</a>



</div>







<h2 className="KalappuraFarmHouse-enquiry-title">

Make an Enquiry!

</h2>






<Button

href="https://wa.me/919876543210"

target="_blank"

variant="light"

className="KalappuraFarmHouse-talk-btn w-100"

>

Let's Talk

</Button>




</Card.Body>


</Card>



</Col>


</Row>


</Container>


</>

);

}


export default KalappuraFarmHouse;