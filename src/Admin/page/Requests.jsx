import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestModal from "../Component/RequestModal";

import "../Dashboard.css";


function Requests(){

const [requests,setRequests]=useState([]);

const [selectedRequest,setSelectedRequest]=useState(null);

const [showModal,setShowModal]=useState(false);



const getRequests = async()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/requests"
);


setRequests(res.data);


}
catch(error){

console.log(error);

}

};



// Load Data

useEffect(()=>{

getRequests();

},[]);





// Status Update

const updateStatus = async(id,status)=>{


try{


await axios.put(

`http://localhost:5000/api/requests/${id}`,

{
status:status
}

);


getRequests();


}
catch(error){

console.log(error);

}


};




return(

<div>


<h2 className="page-title">
Pricing Requests
</h2>



<div className="table-box">


<table className="table table-bordered">


<thead>

<tr>

<th>Name</th>

<th>Phone</th>

<th>Event</th>

<th>Venue</th>

<th>Date</th>

<th>Guests</th>

<th>Rooms</th>

<th>Price</th>

<th>Status</th>

<th>Action</th>


</tr>


</thead>



<tbody>


{
requests.map((item)=>(


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
{item.venueName}
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


<td>

<span className="status">

{item.status}

</span>

</td>



<td>


<button
className="btn btn-primary btn-sm"

onClick={()=>{

setSelectedRequest(item);

setShowModal(true);

}}

>

View

</button>



<button

className="btn btn-success btn-sm ms-2"

onClick={()=>updateStatus(item._id,"Confirmed")}

>

Approve

</button>



<button

className="btn btn-danger btn-sm ms-2"

onClick={()=>updateStatus(item._id,"Cancelled")}

>

Reject

</button>



</td>



</tr>


))

}



</tbody>


</table>


</div>



<RequestModal

show={showModal}

handleClose={()=>setShowModal(false)}

request={selectedRequest}

updateStatus={updateStatus}

/>




</div>

)


}


export default Requests;