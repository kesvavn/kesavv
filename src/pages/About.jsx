import "../pages/About.css";
import MyNavbar from "../Navbar";
import { Container, Row, Col } from "react-bootstrap";

function About() {
  return (
    <div>
      <div className="hero-bg">
        <MyNavbar />

        <Container className="h-100">
          <Row className="h-100 align-items-center">
            <Col md={6}>
              <h1 className="about-heading">
                About Melodia Event <br /> Management
              </h1>

              <p className="about-text">
                From concept to execution, Kerala’s premier event management company delivers <br />
                flawless experiences tailored to your unique vision.
              </p>
            </Col>
          </Row>
        </Container>
      </div><br /> 

     <div className="about-content">
        <Container>
          <Row className="align-items-center"> 
             <Col md={4}>
        <img 
          src="https://eventsmanagementkerala.com/wp-content/uploads/2022/09/MELODIA-LOGO-03-1.webp"
          alt="Melodia"
          className=" about-image"
        />
      </Col>

            <Col md={8}>
              <h2 className="about-subheading">Welcome to Melodia Event Management Company</h2>  <br />  
              <p className="about-paragraph">
                We are an ISO 9001:2015-certified event management company based in Kerala, with over 18 years of experience serving the Kerala event management industry. <br />
                Melodia Event Management specialises in wedding event management, as well as a wide range of corporate, personal, regional, public, and private event management services—creating lasting memories for thousands of clients in the Malayalee community in Kerala and for those seeking destination weddings in Kerala from other states of India and abroad.  <br />
                We started as a small firm in 2008 in Thrissur with small weddings, birthday parties, and Holy Communion events. We initially organised small events in the Thrissur area. Since 2009–2010, we have successfully organised more than 1,500 weddings, 350 corporate events, 75 inaugurations, and over 400 other private events. Overall, we have managed more than 2,500 small- and large-scale events and 3,500 satisfied clients across Kerala.  <br />
                Additionally, the brand name Melodia Event Management is often referred to interchangeably as Melodia Events by the company and people in Kerala. Melodia Events, or simply Melodia, is primarily used as an informal or short name for the company; however, our official name remains Melodia Event Management. We mainly serve in God’s Own Country as a specialised event management company for Kerala’s event management services.<br /><br />
              </p>
            </Col>     
            
            <Col md={12}>
            <p className="about-paragraph">
              In 2008, our small venture was initiated in Thrissur city with small-scale event services for local Malayalees in Thrissur. Initially, we handled event management tasks primarily in regions close to Thrissur and its surroundings. Our hard work has enabled us to expand from the neighborhoods of Thrissur to the popular territories of Cochin. Compared to other cities, we are now providing more services in Ernakulam (Kochi) through our own production house, a trend that has continued over the last seven years. What started as a small firm in 2008 has now expanded into a multi-locality venue selection assistance and event management service across Kerala. 

We proudly serve all of Kerala, from bustling cities to serene villages, as one of the few Kerala-owned event management companies fully dedicated to the state. Deeply rooted in Kerala’s rich culture and traditions, we specialise in creating unforgettable events—whether for the Malayalam community on Kerala soil or destination weddings for guests from across India and beyond. With extensive experience in event management, we bring expertise and passion to every celebration.

Today, Melodia Event Management has a strong presence across Kerala, with front offices in Kochi, Thrissur, Calicut, and Trivandrum—the state’s most dynamic cities—supported by back offices, godowns, and production facilities in all districts, delivering professional event management services in both cities and villages across Kerala. We are proud to be a Kerala-based event management company, serving the entire state with dedication and excellence. </p><br /><br />
             </Col>
        <Col md={6}>
    <h1 className="about-subheading">
      Mayjohn P J - A Visionary's Journey
    </h1>

    <p className="about-paragraph">
    Mr Mayjohn P. J., also known as Mayjohn Pindiyan, is the CEO and founder of Melodia Event Management Company. Mr Mayjohn, after his MBA graduation, worked under several IT firms in Thrissur and Kochi. His talent lay elsewhere, though; he was a part of a ganamela and orchestra troupe as a professional singer. His vocal ability was showcased on many occasions and in wedding ceremonies. He tried to explore his passion with his own orchestra troupe, the Valence Orchestra, but it didn’t develop as expected.
    </p>
    <p className="about-paragraph">Starting in 2008, the idea of “Event Management” came to his mind. Terms such as “wedding planners,” as well as the “event management” field, were not there, and nobody had even heard the word in Kerala, but events were handled by relatives themselves, not professionally. At that time, the only popular thing was the catering industry, not the event management or wedding planning industry, and it was not familiar to the people of Kerala until 2007 or 2008. This was the inspiration that led to the founding of Melodia Event Management. Mayjohn’s interest in the performing arts brings the collective insight of an audience and spectators to Melodia Event Management, allowing them to organise occasions in a unique manner. For the first year, Melodia Event Management operated without even an office.    </p>
<p className="about-paragraph">However, at the end of 2008, the company opened a small office in Kuraichira, Thrissur, marking its transition into a fully functional organisation. As of now, the company has expanded significantly, with multiple offices across various districts and cities in Kerala.</p>
  </Col>


  <Col md={6} className="text-center">
    <img 
      src="https://eventsmanagementkerala.com/wp-content/uploads/2023/08/Mayjohn-P-J-Mayjohn-Pindiyan-Melodia-Events-Management-683x1024.webp"
      alt="mayjohn"
      className="profile-img"/>
  </Col>
  </Row>  
             </ Container>             
               </div>
    </div>
  );
}

export default About;