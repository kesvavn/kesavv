import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image1 from "../images/DSC02433-scaled-qxkcuvmqhjuud5b53nxwas04dty8yewtqsd30gz1kc.jpg";
import Image2 from "../images/ECP01897-scaled-qxkcwg11vm01pr17ycbigdrs0y89s94pyji7t2nf70.jpg";
import Image3 from "../images/Maritus-Events-Wedding-Planner-trivandrum2-qxdtljg14byy75hv38vyehhs648qpt83ngcrn8jnos.webp";

import "swiper/css";

import "./ImageSlider.css";

function ImageSlider1() {

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

export default ImageSlider1;