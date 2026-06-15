import { Container, Row, Col } from "react-bootstrap";
import "./BranchOffice.css";

function BranchOffice() {
  return (

    <Container fluid className="location-section">

      <Row>

        {/* THRISSUR */}

        <Col lg={3} md={6} className="mb-4">

          <div className="location-card">

            <div className="location-top">

              <div className="icon-box">
                <i className="fa-solid fa-location-dot"></i>
              </div>

              <div>
                <h4>THRISSUR (HEAD OFFICE)</h4>

                <p>
                  Melodia Event Management, <br />
                  Flamon Complex, Kuriachira, <br />
                  Thrissur, Kerala, 680006
                </p>
              </div>

            </div>

            <iframe
              title="Thrissur Map"
              src="https://www.google.com/maps?q=Thrissur,Kerala&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

          </div>

        </Col>

        {/* KOCHI */}

        <Col lg={3} md={6} className="mb-4">

          <div className="location-card">

            <div className="location-top">

              <div className="icon-box">
                <i className="fa-solid fa-location-dot"></i>
              </div>

              <div>
                <h4>COCHIN REGIONAL HUB</h4>

                <p>
                  Melodia Event Management, <br />
                  T V Center, Kakkanad, Kochi, <br />
                  Kerala, 682037
                </p>
              </div>

            </div>

            <iframe
              title="Kochi Map"
              src="https://www.google.com/maps?q=Kochi,Kerala&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

          </div>

        </Col>

        {/* CALICUT */}

        <Col lg={3} md={6} className="mb-4">

          <div className="location-card">

            <div className="location-top">

              <div className="icon-box">
                <i className="fa-solid fa-location-dot"></i>
              </div>

              <div>
                <h4>CALICUT REGIONAL HUB</h4>

                <p>
                  Melodia Event Management, <br />
                  Door No:VP 22/152ABC, Po, <br />
                  Orkadav, Akkod, Kozhikode
                </p>
              </div>

            </div>

            <iframe
              title="Calicut Map"
              src="https://www.google.com/maps?q=Calicut,Kerala&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

          </div>

        </Col>

        {/* TRIVANDRUM */}

        <Col lg={3} md={6} className="mb-4">

          <div className="location-card">

            <div className="location-top">

              <div className="icon-box">
                <i className="fa-solid fa-location-dot"></i>
              </div>

              <div>
                <h4>TRIVANDRUM REGIONAL HUB</h4>

                <p>
                  Melodia Event Management <br />
                  Santhi Nagar, Thampanoor, <br />
                  Thiruvananthapuram, Kerala
                </p>
              </div>

            </div>

            <iframe
              title="Trivandrum Map"
              src="https://www.google.com/maps?q=Trivandrum,Kerala&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

          </div>

        </Col>

      </Row>

    </Container>
  );
}

export default BranchOffice;