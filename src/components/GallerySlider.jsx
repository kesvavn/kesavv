import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Image1 from "../images/wedding-planner-melodia-blog-image-qxcf1o553spfu4yhuljcvq1vtq5bucgw3xpq12vulo.webp";
import Image2 from "../images/whatsapp-image-latest-qxcfke3f80c12jrjj6uv1hzdqzvi5bsfolgv4h4koc.webp";
import Image3 from "../images/image-blog-qxci15yoopuxkqtd5kaej3ilh2bh487t7zjqt9i10s.webp";

import "swiper/css";

import "./GallerySlider.css";

function GallerySlider() {

  // IMAGE ARRAY
  const images = [
    {
      id: 1,
      src: Image1,
    },

    {
      id: 2,
      src: Image2,
    },

    {
      id: 3,
      src: Image3,
    },
  ];

  return (

    <div className="gallery-container">

      <Swiper
        className="gallery-swiper"

        modules={[Autoplay]}

        slidesPerView={1}
        slidesPerGroup={1}

        loop={true}
        loopAdditionalSlides={3}

        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}

        speed={1200}
      >

        {images.map((item) => (

          <SwiperSlide key={item.id}>

            <img
              src={item.src}
              alt={`slide-${item.id}`}
              className="gallery-image"
            />

          </SwiperSlide>

        ))}

      </Swiper>

    </div>
  );
}

export default GallerySlider;