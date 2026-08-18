import { Container, Row, Col,Image } from "react-bootstrap";
import "./event css/PrivatePartics.css";
import MyNavbar from "../../Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import privatePartyImage from "../../components/events/closeup-dj-working-blue-light-1024x589.webp";
import Aniversary from "../gallery/privatepartys/images (6).jpg"
import Birthday from "../gallery/privatepartys/images.jpg"
function PrivateParties() {

  return (
    <>
      {/* Hero Section */}
      <div className="private-parties-bg">

        <MyNavbar />

        <Container>
          <Row className="align-items-center justify-content-center min-vh-100">

            <Col xs={12} md={10} lg={8} className="text-center">

              <h1 className="text-white fw-bold">
               Private Parties Kerala
               
              </h1>

              <p className="text-white text-para mt-4">
                Melodia Event Management in Kerala holds Private Parties and crafts unforgettable moments that leave lasting memories. From intimate gatherings to lavish affairs, we curate every detail with impeccable precision, blending local charm and global sophistication. Step into a world of bespoke celebrations where dreams come to life.
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

   <Container>
    <Row className="align-items-center justify-content-center py-5">
       <Col xs={12} md={10} className="text-center">
     
     <Image
              src={privatePartyImage}
              alt="Private Party"
              fluid
              className="private-party-image"
            />
            
             <p className="private-party-text">
              Melodia Event Management provides private party organising services where we specialise in planning and executing events of various types, including private parties in Kerala.

            </p>


            <p className="private-party-text">
              The services can vary depending on the client’s specific needs and requirements of the clients. Some common services offered by us for private parties Kerala may include:

            </p>

              <p className="private-party-text">
              Planning the event: Our planners provide private party services in Kerala along with planning and coordination of the entire occasion. We help you in choosing the ideal location, contracting and managing vendors, and take care of inviting the guests and RSVPs. Developing timetables, and other specifics are also taken care of by our managers. They ensure that the event goes smoothly without a hitch and according to schedule.
            </p>
          


            {/* Theme */}

            <p className="private-party-text">
             Theme development and décor: Melodia Event Management Company, Kerala work closely with clients to develop a theme for their private party, whether it’s a formal affair, a casual get-together, or something in between. We also create a cohesive décor plan that fits with the theme, including decorations, flowers, and lighting.
            </p>

         {/* Logistics */}

            <p className="private-party-text">
          Catering and bar services: Many event management companies have partnerships with catering and bar services, and can coordinate these services for clients. This may include menu selection, food and drink service, and cleanup.
            </p>


            {/* Birthday */}

            <p className="private-party-text">
              Entertainment and music: Entertainment and music for the private party is arranged, whether it’s a DJ, live music band, or other type of performance. We set up the lighting and sound equipment to enhance the experience.
            </p>


            {/* Anniversary */}

            <p className="private-party-text">
              Logistics: We organise the private party and even take care of the transportation of guests, catering, while handling the security and parking at the venue. On the big day, our staff comes together to make sure that everything happens as planned.
            </p>
             
            <p className="private-party-text">
             Catering: An important part of any event, we also arrange international and local cuisines, snacks, and even a bar service where required. As we offer a wide range of food and beverage choices, we employ catering professionals help you design a custom menu that meets your guests’ dietary needs and preferences, and can often provide staffing and cleanup services as well.
            </p>
            
            <p className="private-party-text">
              Photos and videos: Memories are important even if you are hosting a private party. That’s what parties are for! We assist in organising videographers and photographers who will capture the right moments, which you can treasure for years to come.
            </p>
            
            <p className="private-party-text">
              Decorations: Decorations can set the tone for your event and help create a memorable atmosphere. Our private party services can help you choose the right decorations for your theme and venue, and can often provide setup and takedown services as well.
            </p>
         <p className="private-party-text">
          Rentals: If you need tables, chairs, linens, or other party supplies, our private party services offer rental options that make it easy and convenient for you to get everything you need in one place. We often deliver and set up your rentals for you, and also provide pickup and cleanup services after your event.
          </p>
         
         <p className="private-party-text">
          Transportation: We arrange transportation for your guests, whether it’s a limousine, party bus, or shuttle service. Parking is also planned and scheduled accordingly. We will ensure that the guests arrive and depart safely to and from the venue.
        </p>

          <p className="private-party-text">
            Reach out to Melodia Event Management Company, Kerala for a variety of private party services to ease your stress. We make organising simpler as we take care of delegating important tasks to the right people so that you can concentrate on having a great time at the event.
          </p>
          
          <p className="private-party-text">
           Additional Packages: Enhance your private party with our specially designed additional packages. We offer customized cake packages, beautiful birthday and anniversary decorations, professional photography services, and exciting music and entertainment options. These packages can be selected according to your event theme, personal preferences, and requirements, making your celebration more enjoyable, memorable, and special for you and your guests.
          </p>

          <p className="private-party-text">
            Cake Package:Make every birthday celebration extra special with our customized cake packages. Choose from a variety of flavors, designs, sizes, and themes that perfectly match your celebration. Our team ensures that the cake is freshly prepared and beautifully presented to make your special day even more memorable.
          </p>

          <p className="private-party-text">
            Birthday Decoration: Create a colorful and exciting atmosphere with our customized birthday decoration services. We provide balloons, themed backdrops, flowers, lighting, welcome boards, and table decorations based on your preferred theme and style.
          </p>

          <p className="private-party-text">
           Music & Entertainment: Make your private party more enjoyable with our music and entertainment services. We offer DJ, live music, sound systems, lighting, games, and engaging entertainment options to keep your guests entertained throughout the celebration.
          </p>
       </Col>
    </Row>

    <Row className="g-4 justify-content-start">

  {/* Anniversary Party */}
  <Col lg={4} md={6} sm={12}>
    <div className="party-card">

      <img
        src={Aniversary}
        alt="Anniversary Parties"
      />

      <div className="party-card-body">

        <h5>Anniversary Parties</h5>

        <div className="party-buttons">

          <button className="learn-btn">
            Learn More
          </button>

          <a
            href="https://wa.me/918590010011"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            <i className="bi bi-whatsapp"></i>
            WhatsApp Enquiry
          </a>

        </div>

      </div>
    </div>
  </Col>


  {/* Birthday Party */}
  <Col lg={4} md={6} sm={12}>
    <div className="party-card">

      <img
        src={Birthday}
        alt="Birthday Parties"
      />

      <div className="party-card-body">

        <h5>Birthday Parties</h5>

        <div className="party-buttons">

          <button className="learn-btn">
            Learn More
          </button>

          <a
            href="https://wa.me/918590010011"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            <i className="bi bi-whatsapp"></i>
            WhatsApp Enquiry
          </a>

        </div>

      </div>
    </div>
  </Col>

</Row>
   </Container>

   

    </>
  );
}

export default PrivateParties;