import "./TopVenueSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function TopVenueSlider() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/venues"
      );

      setVenues(response.data);
    } catch (error) {
      console.log("Error fetching venues:", error);
    }
  };

  return (
    <section className="venue-section">
      <div className="venue-heading">
        <h2>Explore Top Venue's in Kerala</h2>

        <div className="gold-line">
          <span></span>
        </div>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={25}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {venues.map((venue) => (
          <SwiperSlide key={venue._id}>
            <div
  className="venue-card"
  onClick={() => navigate(venue.link)}
>
               <img src={`http://localhost:5000/uploads/${venue.image}`}alt={venue.title}/>

              <div className="venue-content">
                <div className="rating">
                  {venue.rating}
                </div>

                <h3>{venue.title}</h3>

                <p className="location-text">
                  <FaLocationDot className="location-icon" />
                  {venue.location}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default TopVenueSlider;