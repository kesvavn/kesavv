import React, { useEffect, useState } from "react";
import axios from "axios";

import "../Dashboard.css";


function Customers(){


const [customers,setCustomers]=useState([]);



const getCustomers = async()=>{


try{


const res = await axios.get(

"http://localhost:5000/api/requests"

);


// Remove duplicate customers

const uniqueCustomers = [];


res.data.forEach(item=>{


const exist = uniqueCustomers.find(

(customer)=>

customer.phone === item.phone

);



if(!exist){

uniqueCustomers.push(item);

}


});


setCustomers(uniqueCustomers);


}

catch(error){

console.log(error);

}


};



useEffect(()=>{

getCustomers();

},[]);





return(

<div>


<h2 className="page-title">
Customers
</h2>



<div className="table-box">


<table className="table table-bordered">


<thead>

<tr>

<th>Name</th>

<th>Phone</th>

<th>Email</th>

<th>Total Bookings</th>

<th>Last Event</th>

<th>Status</th>

</tr>

</thead>



<tbody>


{

customers.length > 0 ?

customers.map((customer)=>(


<tr key={customer._id}>


<td>
{customer.fullName}
</td>


<td>
{customer.phone}
</td>


<td>
{customer.email}
</td>


<td>

{
customer.status==="Confirmed"
?
"1"
:
"0"
}

</td>


<td>
{customer.functionType}
</td>


<td>


<span

className={
customer.status==="Confirmed"
?
"confirmed"
:
"pending"
}

>

{customer.status}

</span>


</td>



</tr>


))


:

<tr>

<td colSpan="6" className="text-center">

No Customers Found

</td>

</tr>


}



</tbody>


</table>


</div>


</div>

)

}


export default Customers;