import { Container, Row, Col } from "react-bootstrap";
import "./event css/PrivatePartics.css";
import MyNavbar from "../../Navbar";
import { useEffect } from "react";


function PrivateParties() {

  useEffect(() => {
    window.scrollTo(0, 0);
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

    </>
  );
}

export default PrivateParties;