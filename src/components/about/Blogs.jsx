import { Container } from "react-bootstrap";
import MyNavbar from "../../Navbar";
import BlogSec from "../BLOGS & ARTICLES/BlogSec";
import "./Blogs.css"

function Blogs() {
  return (
  <>
    <div id="blogs" className="blogs-section">
      <MyNavbar />
      <Container className="blogs-content offset-lg-2 col-lg-8 col-11">

        <h2 className="blog-title">
          Our Blog: Stories by Melodia
        </h2>

        <p className="blog-text">
          Melodia Event Management offers a diverse range of blogs that cover 
          topics related to event management and planning. From destination 
          wedding planning to corporate events, each blog provides valuable 
          insights to help you plan your next event seamlessly.
        </p>

      </Container>
    </div>
    < BlogSec />
  </>
);
}

export default Blogs;