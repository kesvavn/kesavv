import { Container, Row, Col } from "react-bootstrap";
import "./Wedding.css";
import MyNavbar from "../../Navbar";
import { useEffect } from "react";
import Image from "../../images/pexels-krishna-studio-5200435_15_185637-162346933677604.webp";
import Image1 from "../events/wedding-dance-111-1536x1023.webp";
function Wedding() {
   useEffect(() => {
    window.scrollTo(0, 0);   // 🔥 always top
  }, []);

  return (
      <>
    <div className="wedding-bg">
      <MyNavbar/>
      <Container>
        <Row className=" align-items-center justify-content-center min-vh-100">
          <Col>
            <h1 className="wedding-title">Wedding Planners in Kerala</h1>
            <p className="text-para ">This is where a professional wedding planner in Kerala comes in! Melodia Event Management makes <br/>
                your dream wedding ceremony, whether a regional or destination wedding in Kerala, stress-free and 
                <br/>magical..</p>
                  
          </Col>
          
        </Row>
      </Container>
        </div><br /><br />
      <Container>
        <Row>
          <Col>
            <h1 className="wedding-heading">Enchanting Weddings with Melodia: Your Premier Traditional and Destination Wedding Planners in Kerala</h1>
            <p className="text-para1">
              Melodia Event Management is a leading wedding planning company in Kochi, dedicated to creating unforgettable wedding experiences. Our team of experts will handle every detail, from the initial planning stages to the final execution, ensuring your special day is perfect.
            </p><br />
            <p className="text-para1">Melodia Event Management’s wedding planner services are professional wedding services provided to help couples plan, organise, and execute their wedding day. We work closely with couples to understand their vision, preferences, and budget to create a personalised plan for the wedding event day.</p>

          </Col>
          <Col>
  <img
    src={Image}
    alt="Wedding Planning in Kerala"
    className="wedding-img"
  />
</Col></Row> </Container>
<Container fluid className="container1">
  <Row>

    <Col lg={6} md={12}>
      <img
        src={Image1}
        alt="Wedding Planning in Kerala"
        className="wedding-img1"
      />
    </Col>

    <Col lg={6} md={7}>
      <p className="text-para2">
        In India, think of wedding planners in Kerala as superheroes,
        swooping in to save the day and taking care of everything from
        venue selection to vendor management, budget management to design
        and décor, timeline management to coordination, and post-wedding
        ceremony to honeymoon packages on the big day and occasions.
        We ensure every detail is accounted for and every moment perfectly
        orchestrated.
      </p>
      <p className="text-para2">
        Whether you are dreaming of a grand traditional wedding, a rustic barn destination wedding, or something in between, Melodia‘s traditional and destination wedding planners in Kerala, India, are here to make it happen. We work tirelessly behind the scenes to create a wedding day that is unique only to you, a day that you and your guests will remember for years to come.


      </p>
         <p className="text-para2">
    So if you are feeling overwhelmed by the endless details and decisions that go into planning a wedding, call us—the fairy godmothers and superheroes of weddings—to make your dream wedding a reality!

      </p>
    </Col>

  </Row>
</Container><br /><br />
 <Container>
  <Row>
    <Col>
    <p className="text-para1">Mayjohn P. J., the owner of Melodia Event Management Company, strives to create a truly memorable experience for everyone on their special day. Mr. P J endeavors to spread happiness throughout Southern India on wedding days.  <br /><br /> 

Nowadays, entertainment has become a crucial aspect of Southern Indian weddings, especially in Kerala. Various forms of entertainment, such as live music bands, Punjabi dances, flamenco dances, Sufi dances, DJs, live water drummers, and traditional Indian dances like oppana dances, bharatanatyam,  mohiniyattom and kathakali are incorporated into every part of the wedding events. This entertainment is embraced by all communities, including Hindus, Christians, and Muslims. Even the Kerala Muslim community, including the Orthodox Muslim community, incorporates entertainment in their unique way. <br /><br />

Here at Melodia Event Management Company, the owner, Mr. Mayjohn P J, also known as Mayjohn Pindiyan, takes great pride in recalling a memorable wedding day organized by Melodia Event Management Company. The esteemed American newspaper, The New York Times, covered all aspects of the wedding event ceremony event days, including the full wedding event planning, parties, and functions. This exceptional event took place in the aftermath of the COVID-19 pandemic. <br /> <br />

This particular event was for Dr. Pfizer, a client of Melodia Events, who is associated with the World Health Organization (WHO). Dr. Pfizer’s daughter, Dr. Sheha Pfizer’s wedding planning and ceremony in Kerala, arranged by Melodia Events, proves that even during a pandemic, Melodia Events strives to provide exceptional services for their client satisfaction. This wedding planning strictly adhered to the COVID-19 protocols and legal regulations set by the Indian government. Dr. Pfizer received special care and the full support of Melodia Events wedding planners and security teams.

</p>
    </Col>
  </Row>
   
 </Container>
<Container>
  <Row className="justify-content-center">
    <Col lg={10}>
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/_8UqAZ5CwIA"
          title="YouTube video"
          allowFullScreen
        ></iframe>
      </div>
    </Col>
  </Row>
</Container><br /><br />
      
  
    </>
  );
}

export default Wedding;