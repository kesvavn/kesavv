import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Navbar as BsNavbar, Nav, Container, Button,NavDropdown,} from "react-bootstrap";

import { FaPhoneAlt, FaBars } from "react-icons/fa";
import "./Navbar.css";
import Login from "./components/Login/Login";

function MyNavbar() {
  const [redirectAfterLogin, setRedirectAfterLogin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => {
    setExpanded(false);
  };
  
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setIsLoggedIn(false);

  setShowSidebar(false);

  alert("Logout Successful");
};

  return (
    <>

       <BsNavbar
    expand="lg"
    expanded={expanded}
    className="my-navbar">

        <Container fluid>

          <BsNavbar.Brand as={Link} to="/" className="logo">
            <img
              src="https://eventsmanagementkerala.com/wp-content/uploads/2022/09/MELODIA-LOGO-03-1.webp"
              alt="logo"
              className="logo-img"
            />
          </BsNavbar.Brand>

          <BsNavbar.Toggle
            aria-controls="nav"
            onClick={() => setExpanded(!expanded)}
          />

          <BsNavbar.Collapse id="nav">

            <button
              type="button"
              className="close-menu"
              onClick={closeMenu}
            >
              ✕
            </button>

            <Nav className="nav-center">

              <Nav.Link as={Link} to="/" onClick={closeMenu}>
                HOME
              </Nav.Link>
             <NavDropdown title={<span onDoubleClick={() => navigate("/About")}> ABOUT </span>}>
  <NavDropdown.Item
    as={Link}
    to="/blogs"
    onClick={closeMenu}
  >
    BLOGS MY MELODIA
  </NavDropdown.Item>

  <NavDropdown.Item
    as={Link}
    to="/test"
    onClick={closeMenu}
  >
    TESTIMONIALS
  </NavDropdown.Item>
</NavDropdown> 

              <NavDropdown title="SERVICES">
                <NavDropdown.Item
                  as={Link}
                  to="/wedding"
                  onClick={closeMenu}
                >
                  WEDDING PLANNERS
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={Link}
                  to="/Destinationwedding"
                  onClick={closeMenu}
                >
                  DESTINATION WEDDINGS
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={Link}
                  to="/Corprate"
                  onClick={closeMenu}
                >
                  CORPORATE EVENTS MANAGEMENT
                </NavDropdown.Item>

                
                <NavDropdown.Item
                  as={Link}
                  to="/corporate"
                  onClick={closeMenu}
                >
                  WEDDING PHOTOGRAPHY & VIDEOGRAPHY
                </NavDropdown.Item>

               
                <NavDropdown.Item
                  as={Link}
                  to="/corporate"
                  onClick={closeMenu}
                >
                  CATERING SERVICES
                </NavDropdown.Item>

                
                <NavDropdown.Item
                  as={Link}
                  to="/BeachWedding"
                  onClick={closeMenu}
                >
                  BEACH WEDDINGS
                </NavDropdown.Item>

                
                <NavDropdown.Item
                  as={Link}
                  to="/Entertainment"
                  onClick={closeMenu}
                >
                  MUSIC & ENTERTAINMENT
                </NavDropdown.Item>
 
                  
                <NavDropdown.Item
                  as={Link}
                  to="/PrivatePartics"
                  onClick={closeMenu}
                >
                  PARIVETE PARTIES
                </NavDropdown.Item>

              </NavDropdown>

             <Link 
  to="/venues" 
  className="nav-link"
>
  Venues
</Link>


              <NavDropdown title="GALLERY">
                <NavDropdown.Item
                  as={Link}
                  to="/PhotoGallery"
                  onClick={closeMenu}
                >
                  PHOTO GALLERY
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={Link}
                  to="/VideoGallery"
                  onClick={closeMenu}
                >
                  VIDEO GALLERY
                </NavDropdown.Item>
              

              
                <NavDropdown.Item
                  as={Link}
                  to="/ShortsGallery"
                  onClick={closeMenu}
                >
                 SHORTS GALLERY
                </NavDropdown.Item>
                
                <NavDropdown.Item
                  as={Link}
                  to="/WeddingAlbums"
                  onClick={closeMenu}
                >
                WEDDING ALBUMS
                </NavDropdown.Item>

              </NavDropdown>

              <Nav.Link as={Link} to="/contact" onClick={closeMenu}>
                CONTACT
              </Nav.Link>
          
<Nav.Link as={Link} to="/my-bookings" onClick={closeMenu}>
  MY BOOKINGS
</Nav.Link>
              
            </Nav>
<div className="right-section">

  <Button id="phone-btn">
    <FaPhoneAlt className="me-2" />
    +91 859 001 0011
  </Button>

  {isLoggedIn ? (
    <Button
      variant="danger"
      className="menu-login-btn"
      onClick={handleLogout}
    >
      Logout
    </Button>
  ) : (
    <Button
      className="menu-login-btn"
      onClick={() => setShowSidebar(true)}
    >
      <FaBars />
    </Button>
  )}
  
</div>

          </BsNavbar.Collapse>

        </Container>
      </BsNavbar>
     <Login
  showSidebar={showSidebar}
  setShowSidebar={setShowSidebar}
  redirectAfterLogin={redirectAfterLogin}
  onLogin={() => setIsLoggedIn(true)}
/>

    </>
  );
}

export default MyNavbar;