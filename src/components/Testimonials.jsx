import "./Testimonials.css";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import VerifiedTick from "./events/ti-verified.svg";
import GoogleLogo from "./events/icon.svg";
import DividerImg from "../images/58cb37cd-b70a-4c5b-b8f9-4fc4d20bd3a0.svg";
import axios from "axios";

function Testimonials() {
 const [expanded,setExpanded] = useState({});
const [data,setData] = useState([]);


  useEffect(()=>{

axios
.get("http://localhost:5000/api/reviews")
.then((res)=>{


const reviewData = res.data.map((item)=>({

...item,

initial:item.name.charAt(0)

}));


setData(reviewData);


})
.catch((err)=>{

console.log(err);

});


},[]);

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="testimonials">
      <Container>
        <Row>
          <Col lg={12}>
            <p className="sub">CLIENT TESTIMONIALS</p>

            <h2 className="main">
              See What our Clients has to Say
            </h2>

            <div className="divider">
              <img
                src={DividerImg}
                alt="divider"
                className="divider-img"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={25}
              slidesPerView={3}
              navigation
              loop
              centeredSlides
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="testimonial-swiper"
            >
              {data.map((item,index)=>(

<SwiperSlide key={index}>

<div className="testimonial-card">


<div className="stars">

{"★".repeat(item.rating)}

<img
src={VerifiedTick}
className="review-tick-img"
/>

</div>


<p className="text">

{
expanded[index]
?
item.text
:
item.text.length > 100
?
item.text.slice(0,100)+"..."
:
item.text
}

</p>


<button
className="read-more"
onClick={()=>toggleReadMore(index)}
>

{
expanded[index]
?
"Read Less"
:
"Read More"
}

</button>


<div className="user">

<div className="avatar">
{item.initial}
</div>


<div>

<h4>
{item.name}
</h4>

<span>
{item.time}
</span>

</div>

</div>


</div>


</SwiperSlide>

))}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Testimonials;