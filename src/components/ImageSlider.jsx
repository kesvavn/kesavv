import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image1 from "../images/wedding-planner-melodia-blog-image-qxcf1o553spfu4yhuljcvq1vtq5bucgw3xpq12vulo.webp";
import Image2 from "../images/whatsapp-image-latest-qxcfke3f80c12jrjj6uv1hzdqzvi5bsfolgv4h4koc.webp";
import Image3 from "../images/image-blog-qxci15yoopuxkqtd5kaej3ilh2bh487t7zjqt9i10s.webp";
import "swiper/css";

import "./ImageSlider.css";

function ImageSlider() {

  const images = [
    {
      id: 1,
      image: (
        <img
          src={Image1}
          alt="slide-1"
          className="slider-img"
        />
      ),
    },

    {
      id: 2,
      image: (
        <img
          src={Image2}
          alt="slide-2"
          className="slider-img"
        />
      ),
    },

    {
      id: 3,
      image: (
        <img
          src={Image3}
          alt="slide-3"
          className="slider-img"
        />
      ),
    },

 
  ];

  return (
    <div className="slider-box">

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        slideToClickedSlide={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
      >

        {images.map((item) => (
          <SwiperSlide key={item.id}>

            {item.image}

          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );
}

export default ImageSlider;