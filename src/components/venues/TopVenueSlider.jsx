import "./TopVenueSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function TopVenueSlider() {
  const navigate = useNavigate();

  const venues = [
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      title: "Kakkattu Mana",
      location: "Chathanur, Pattambi, Palakkad",
      rating: "★★★★☆",
      path: "/kakkattu-mana",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop",
      title: "Kakkakuni Heritage",
      location: "Thalakkathur, Kozhikode",
      rating: "★★★★★",
      path: "/kakkakuni-heritage",
    },
    {
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      title: "Kalappura Farm House",
      location: "Mulavukad, Kochi",
      rating: "★★★★☆",
      path: "/kalappura-farm-house",
    },
    {
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
      title: "Kampify Kochi",
      location: "Kumbalangi, Kochi",
      rating: "★★★★★",
      path: "/kampify-kochi",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      title: "Kadavu Villas",
      location: "Thrissur, Kerala",
      rating: "★★★★☆",
      path: "/kadavu-villas",
    },
  ];

  return (
    <section className="venue-section">
      <div className="venue-heading">
        <h2>Explore Top Venue’s in Kerala</h2>

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
        {venues.map((venue, index) => (
          <SwiperSlide key={index}>
            <div
              className="venue-card"
              onClick={() => navigate(venue.path)}
            >
              <img src={venue.image} alt={venue.title} />

              <div className="venue-content">
                <div className="rating">{venue.rating}</div>

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