import "./OurServices.css";
import { useNavigate } from "react-router-dom";
import waitingRoom from "../images/waiting room.webp";
import Beautiful from "./events/beautiful-woman-long-red-dress-walks-around-city.webp";
import Fornt from  "./events/front-view-rich-arch-decorated-with-adorable-fresh-roses-flowers.webp";
import Beach from "./events/blue-white-wedding-aisle-beach-surrounded-by-palms-with-sea-background.webp";
import Modern from "./events/34-q5t8fsj7kjq6kjf0bbfr8rq44enp0usgmkbb8ayryw.webp";
import Parties from "./events/bithday-event-management-kerala-q748lic5phhlw318mu3dlw9vlgzhycwj19nbptnriw.webp";



function OurServices() {
  const navigate = useNavigate();

  return (
    <section className="services-section">
      <p className="subtitle">OUR SERVICES</p>

      <h2 className="title">
        Services by Melodia® Event Management
      </h2>

      <p className="description">
Melodia® Event Management is an ISO 9001:2015 certified event management company providing services exclusively throughout the entire state of Kerala, South India. We provide comprehensive event management services, including venue selection, personal event planning, corporate events and conferences, private parties, trade exhibitions, virtual event management, destination Events, and entertaining stage shows across Kerala. Feel free to contact us      </p>

      <div className="divider">
        <img
    src="./src/images/58cb37cd-b70a-4c5b-b8f9-4fc4d20bd3a0.svg"
     alt="divider"
     className="divider-img"
     />
      </div>

      <div className="services-grid">

        {/* Card 1 */}
        
        <div
          className="cardd"
          onClick={() => navigate("/details")}>
          <img src={waitingRoom} alt="waiting room" /> 
          <div className="overlay">
            <h3>CORPORATE EVENT</h3>
            <p>
              If you want to make a statement at your next corporate event, partner with Melodia Event Management Company in Kerala.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="cardd"
          onClick={() => navigate("/Wedding")}
        >
           <img src={Beautiful} alt="beautiful woman" /> 
          <div className="overlay">
            <h3>WEDDING PLANNING</h3>
            <p>
           Have you ever dreamed of planning the perfect dream event to be remembered forever?
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="cardd"
          onClick={() => navigate("/Destinationwedding")} >
          
          <img src={Fornt} alt="front view" /> 
          <div className="overlay">
            <h3>DESTINATION WEDDING</h3>
            <p>
              Celebrate your special day in paradise as you enjoy a luxurious destination event with us!
            </p>
          </div>
        </div>

        {/* Card 4 */}
      <div className="cardd" onClick={() => navigate("/Beachwedding")}>
      <img src={Beach} alt="private event" />
      <div className="overlay">
      <h3>BEACH WEDDING</h3>
      <p>Celebrate your love amidst the serene shores and palm-fringed beaches of Kerala.</p>
      </div>
      </div>

{/* Card 5 */}
     <div
  className="cardd"
  onClick={() => navigate("/Entertainment")}
>
  <img src={Modern} alt="stage show" />
  <div className="overlay">
    <h3>MUSIC & ENTERTAINMENT</h3>
    <p>From live bands and DJs to mesmerising performers, we have everything you need</p>
  </div>
</div>

{/* Card 6 */}
      <div
      className="cardd" onClick={() => navigate("/PrivateParties")}>
      <img src={Parties} alt="exhibition" />
      <div className="overlay">
    <h3>PRIVATE PARTIES</h3>
    <p>Melodia Event Management in Kerala holds Private Parties and crafts unforgettable moments that leave lasting memories.</p>
  </div>
</div>
</div>
        

     
    </section>
  );
}

export default OurServices;