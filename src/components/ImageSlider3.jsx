import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image1 from "../images/Mayz-24-01-18_14-15-09-683-scaled-qukn1e5nr3y3yk97q5kt0q5h6fwj9eowbl67ythjn0.webp";
import Image2 from "../images/Mayz-24-01-18_14-33-02-277-scaled-1-qvov0n6vng82o0ik6y1y53gqdtbh8x9itix3oxw52k.webp";
import Image3 from "../images/Haldi-Aditya-Swati-02-20_18-47-10-097-scaled-qmfxn1t1xjegwhzfxm00pgdds5qrus06dikzx63ang.webp";

import "swiper/css";

import "./ImageSlider.css";

function ImageSlider3() {

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

export default ImageSlider3;