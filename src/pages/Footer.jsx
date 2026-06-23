import { FaInstagram, FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import logo from "../images/MELODIA-LOGO-03-1.webp";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-overlay">

        {/* SOCIAL ICONS */}

        <div className="social-icons">

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaYoutube />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>

        </div>

        {/* LOGO */}
      <div className="footer-logo">
       <img src={logo} alt="Melodia Logo" />
       </div>

        {/* DESCRIPTION */}

        <div className="footer-description">

          <h4>
            Melodia® Event Management: ISO 9001:2015 Certified Kerala Event Planners
          </h4>

          <p>
            Melodia Event Management is Kerala’s premier ISO 9001:2015 certified
            company, specialising in destination weddings and corporate events
            for 18+ years. From our regional hubs in Kochi, Thrissur, Calicut,
            and Trivandrum, we provide end-to-end planning and venue selection
            exclusively within Kerala.
          </p>

        </div>

        {/* FOOTER GRID */}

        <div className="footer-grid">

          {/* QUICK LINKS */}

          <div>
            <h3>QUICK LINKS</h3>

        <ul>
      <ul>

  <li>
    <Link to="/">Home</Link>
  </li>

  <li>
    <Link to="/about">About</Link>
  </li>

  <li>
    <Link to="/venues">Venues</Link>
  </li>

  <li>
    <Link to="/photo-gallery">Photo Gallery</Link>
  </li>

  <li>
    <Link to="/video-gallery">Video Gallery</Link>
  </li>

  <li>
    <Link to="/shorts-gallery">Shorts Gallery</Link>
  </li>

  <li>
    <Link to="/wedding-albums">Wedding Albums</Link>
  </li>

  <li>
    <Link to="/contact">Contact</Link>
  </li>
  <li>
    <Link to="/Admin">Admin</Link>
  </li>

</ul>

</ul>
          </div>

          {/* SERVICES */}

          <div>
            <h3>SERVICES</h3>

            <ul>
              <li>Corporate Events</li>
              <li>Wedding Planner</li>
              <li>Music & Entertainment</li>
              <li>Private Parties</li>
              <li>Destination Wedding</li>
              <li>Wedding Photography</li>
            </ul>
          </div>

          {/* OTHER LINKS */}

          <div>
            <h3>OTHER LINKS</h3>

            <ul>
              <li>Blog</li>
              <li>Testimonials</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Cancellation and Refund Policy</li>
              <li>Terms of Service</li>
              <li>Sitemap</li>
            </ul>
          </div>

          {/* CONTACT INFO */}

         <div>
  <h3>CONTACT INFO</h3>

  {/* KOCHI */}

  <div className="contact-item">
    <FaMapMarkerAlt />

    <a
      href="https://www.google.com/maps?q=Kakkanad,Kochi,Kerala"
      target="_blank"
      rel="noreferrer"
    >
      Melodia Event Management, T V Center,
      Kakkanad, Kochi, Kerala 682037
    </a>
  </div>

  {/* THRISSUR */}

  <div className="contact-item">
    <FaMapMarkerAlt />

    <a
      href="https://www.google.com/maps?q=Kuriachira,Thrissur,Kerala"
      target="_blank"
      rel="noreferrer"
    >
      Melodia Event Management, Flamon Complex,
      Main Rd, Kuriachira, Thrissur, Kerala 680006
    </a>
  </div>

  {/* CALICUT */}

  <div className="contact-item">
    <FaMapMarkerAlt />

    <a
      href="https://www.google.com/maps?q=Oorkadavu,Kozhikode,Kerala"
      target="_blank"
      rel="noreferrer"
    >
      Melodia Event Management, Door No:VP
      22/152ABC, Oorkadavu, Kozhikode, Kerala
    </a>
  </div>

</div>

        </div>

        {/* BOTTOM */}

        <div className="footer-bottom">

          <div>
            <FaPhoneAlt /> +91 859-0010011
          </div>

          <div>
            <FaEnvelope /> melodiaeventmanagement@gmail.com
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;