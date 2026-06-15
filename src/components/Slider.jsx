import { useEffect, useState } from "react";
import "./Slider.css";

const images = [
  "https://eventsmanagementkerala.com/wp-content/uploads/2022/09/WhatsApp-Image-2022-08-26-at-7.53.33-PM.webp",
  "https://eventsmanagementkerala.com/wp-content/uploads/2023/05/rose-petals-cover-green-garden-ready-traditional-hindu-weddi.webp",
  "https://eventsmanagementkerala.com/wp-content/uploads/2023/05/blue-white-wedding-aisle-beach-surrounded-by-palms-with-sea-background.webp",
  "https://eventsmanagementkerala.com/wp-content/uploads/2023/05/front-view-rich-arch-decorated-with-adorable-fresh-roses-flowers.webp"
];

function Slider({ children }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      {images.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}



      <div className="slider-overlay">
        {children}
      </div>

      <div className="progress-bar">
        <div key={current} className="progress"></div>
      </div>
    </div>
  );
}

export default Slider;