import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../pages/VenueDetails.css";


function VenueDetails() {


const { slug } = useParams();


const [venue,setVenue] = useState(null);

const [loading,setLoading] = useState(true);

const [showModal,setShowModal] = useState(false);




useEffect(()=>{

fetchVenue();

},[slug]);





const fetchVenue = async()=>{


try{


const res = await axios.get(

`http://localhost:5000/api/venues/slug/${slug}`

);


setVenue(res.data);


}

catch(error){

console.log(error);

}


finally{

setLoading(false);

}


};






if(loading){

return <h3>Loading...</h3>;

}




if(!venue){

return <h3>Venue Not Found</h3>;

}





return (


<div className="venue-details-container">



<div className="venue-main-row">





{/* LEFT IMAGE */}



<div className="venue-image-box">



<img


src={


venue.image?.startsWith("/uploads")

?

`http://localhost:5000${venue.image}`

:

`http://localhost:5000/uploads/${venue.image}`


}


className="venue-main-image"


alt={venue.title}


/>



</div>








{/* RIGHT CONTENT */}





<div className="venue-content">



<h1>

{venue.title}

</h1>





<div className="rating">

{venue.rating || "★★★★★"}

</div>





<p className="location">

📍 {venue.location}

</p>






<p className="category">

Category : {venue.type}

</p>






<h2>

Facilities

</h2>






<div className="facilities">



{

venue.parking &&

<span>

🚗 Parking

</span>

}





{

venue.wifi &&

<span>

📶 Wifi

</span>

}







{

venue.powerBackup &&

<span>

⚡ Power Backup

</span>

}







{

venue.catering &&

<span>

🍽 Catering

</span>

}



</div>








<button

className="pricing-button"

onClick={()=>setShowModal(true)}

>

Request Pricing

</button>





</div>



</div>








{/* DESCRIPTION */}





<div className="description-section">


<h2>

About Venue

</h2>


<p>

{venue.description}

</p>


</div>







{/* MAP */}




{

venue.map &&


<div className="map-section">


<h2>

Location Map

</h2>


<iframe


src={venue.map}


width="100%"


height="400"


style={{

border:0

}}


loading="lazy"


title="venue-map"


></iframe>



</div>



}









{/* MODAL */}




{

showModal &&



<div className="modal-overlay">


<div className="request-modal">


<h2>

Request Pricing

</h2>



<input

placeholder="Name"

/>



<input

placeholder="Phone"

/>



<input

placeholder="Email"

/>



<input

type="date"

/>



<input

placeholder="Guests"

/>





<button className="submit-btn">

Submit Request

</button>




<button

className="close-btn"

onClick={()=>setShowModal(false)}

>

Close

</button>



</div>



</div>



}



</div>



);


}



export default VenueDetails;