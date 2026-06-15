import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image1 from "../images/wedding-planner-blog-main-qxcb1khvd5fxy89uat5d4l4xc6eksteamp8yeyjmi4.webp";
import Image2 from "../images/stage-wedding-planner-scaled-qxarrlcgizbchotpd4qcv90yugqtxabu18dj733pgs.webp";
import Image3 from "../images/Vlinton-Greeshma4-04-09_15-21-09-910-scaled-qukm85ef4nwyraqehiing3t7uw1fseliyuiegwuh7w.webp";

import "swiper/css";

import "./ImageSlider.css";

function ImageSlider2() {

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

export default ImageSlider2;