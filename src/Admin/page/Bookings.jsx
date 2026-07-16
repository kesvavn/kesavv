import React, {useEffect, useState} from "react";
import axios from "axios";

import "../Dashboard.css";


function Bookings(){


const [bookings,setBookings]=useState([]);



const getBookings = async()=>{


try{


const res = await axios.get(

"http://localhost:5000/api/requests"

);



// Only Confirmed

const confirmedBookings = res.data.filter(

(item)=>

item.status==="Confirmed"

);



setBookings(confirmedBookings);



}

catch(error){

console.log(error);

}


};




useEffect(()=>{

getBookings();

},[]);




return(

<div>


<h2 className="page-title">
Confirmed Bookings
</h2>



<div className="table-box">


<table className="table table-bordered">


<thead>

<tr>

<th>Customer</th>

<th>Phone</th>

<th>Event</th>

<th>Date</th>

<th>Guests</th>

<th>Rooms</th>

<th>Amount</th>

</tr>


</thead>



<tbody>


{

bookings.length > 0 ?

bookings.map((item)=>(


<tr key={item._id}>


<td>
{item.fullName}
</td>


<td>
{item.phone}
</td>


<td>
{item.functionType}
</td>


<td>
{item.functionDate}
</td>


<td>
{item.guests}
</td>


<td>
{item.rooms}
</td>


<td>
₹ {item.totalPrice?.toLocaleString()}
</td>


</tr>


))


:

<tr>

<td colSpan="7" className="text-center">

No Confirmed Bookings

</td>

</tr>


}



</tbody>


</table>


</div>


</div>

)


}


export default Bookings;