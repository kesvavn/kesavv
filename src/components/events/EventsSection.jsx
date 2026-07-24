/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EventsSection.css";


function EventsSection(){

const [events,setEvents] = useState([]);


useEffect(()=>{

getEvents();

},[]);



const getEvents = async()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/events"
);


setEvents(
res.data.filter(
(item)=>item.status==="Active"
)
);


}
catch(err){

console.log(err);

}

};



return (

<section className="events-section">


<h2>
Latest Events
</h2>


<div className="events-grid">


{
events.map((event)=>(


<div
className="event-card"
key={event._id}
>


<img

src={`http://localhost:5000${event.image}`}

alt={event.eventName}

/>



<div className="event-content">

<h3>
{event.eventName}
</h3>


<p>
{event.category}
</p>


<p>
Starting ₹ {event.startingPrice}
</p>


</div>


</div>


))
}


</div>


</section>

)

}


export default EventsSection;
*/