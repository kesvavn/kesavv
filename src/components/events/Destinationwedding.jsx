import { Container, Row, Col } from "react-bootstrap";
import "./Events.css";
import MyNavbar from "../../Navbar";
import { useEffect } from "react";


function Destinationwedding() {

   useEffect(() => {
    window.scrollTo(0, 0);   // 🔥 always top
  }, []);

  return (
      <>
    <div className="destination-wedding-bg">
      <MyNavbar/>
      <Container>
        <Row className=" align-items-center justify-content-center min-vh-100">
          <Col>
            <h1 className="text-white">Destination Wedding Event Management<br />Companies in Kochi</h1>
            <p className="text-para ">Experience the magic of kerala’s top wedding event management companies in kochi. <br />
                  If you want to make a statement at your next wedding event, 
                  partner with melodia event management company in kerala.</p>
                  
          </Col>
          
        </Row>
      </Container>
      
    </div>

    </>
  );
}

export default Destinationwedding;