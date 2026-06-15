import { Container, Row, Col } from "react-bootstrap";
import "./VideoReview.css";
import Image1 from "../images/58cb37cd-b70a-4c5b-b8f9-4fc4d20bd3a0.svg";

function VideoReview() {

  const videos = [
    {
      id: 1,
      link: "https://www.youtube.com/embed/TM4eyrtn_0g",
    },

    {
      id: 2,
      link: "https://www.youtube.com/embed/wZVxjpIFsDY?controls=1&rel=0&modestbranding=1",
    },

    {
      id: 3,
      link: "https://www.youtube.com/embed/hJK-tz9a16w?controls=1&rel=0&modestbranding=1",
    },

    {
      id: 4,
      link: "https://www.youtube.com/embed/3ipMNX0cfmA?controls=1&rel=0&modestbranding=1",
    },
  ];

  return (
    <section className="video-review-section">

      <Container>
        <Col lg={12} className="g-4 d-flex flex-column align-items-center text-center">
  <h1 className="review-title"> OUR HAPPY CLIENT VIDEO REVIEWS </h1>

  <p className="review-text">
    Melodia Event Management is Kerala’s ISO 9001:2015-certified leader
    with 18+ years of excellence, providing high-end, cost-effective
    event planning and management across Kerala. Watch our real-time
    live client video reviews recorded directly at event venues to see
    why we are the most trusted name for authentic events in the region.
  </p>
</Col> 
     <div className="divider"> <img src={Image1} alt="Divider" /></div> <br />

        <Row className="g-4 justify-content-center">

          {videos.map((video) => (

            <Col lg={3} md={6} sm={6} xs={12} key={video.id}>

              <div className="video-card">

                <iframe
                  src={video.link}
                  title="YouTube Shorts"
                  className="shorts-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

              </div>

            </Col>

          ))}

        </Row>

      </Container>

    </section>
  );
}

export default VideoReview;