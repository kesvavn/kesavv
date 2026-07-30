import React, { useEffect, useState } from "react";
import axios from "axios";

import {
Container,
Row,
Col,
Card,
Button,
Table,
Modal,
Form,
Badge
} from "react-bootstrap";


function Pricing(){

const categories=[
"Venue",
"Food",
"Room",
"Decoration",
"Makeup",
"Photography",
"Videography",
"DJ & Music",

// Corporate
"Stage Setup",
"Sound System",
"LED Screen",

// Birthday / Party
"Cake",
"Birthday Decoration",

"GST",
"Discount"
];

const [pricing,setPricing]=useState([]);

const [show,setShow]=useState(false);

const [editId,setEditId]=useState(null);


const [search,setSearch]=useState("");

const [filter,setFilter]=useState("All");



const [form,setForm]=useState({

category:"",
title:"",
amount:"",
unit:"Fixed",
description:"",
status:true

});




// =======================
// GET ALL PRICING
// =======================

const getPricing=async()=>{

try{

const res=await axios.get(
"http://localhost:5000/api/pricing"
);

setPricing(res.data);


}catch(err){

console.log(err);

}

};



useEffect(()=>{

getPricing();

},[]);




// =======================
// INPUT CHANGE
// =======================

const handleChange=(e)=>{


const {name,value}=e.target;


setForm({

...form,

[name]:value

});


};





// =======================
// SAVE / UPDATE
// =======================


const savePricing=async()=>{

if(
!form.category ||
!form.title ||
!form.amount
){
alert("Please fill all required fields");
return;
}
try{


if(editId){


await axios.put(
`http://localhost:5000/api/pricing/${editId}`,
form
);


}else{


await axios.post(
"http://localhost:5000/api/pricing",
form
);


}


setShow(false);

setEditId(null);


setForm({

category:"",
title:"",
amount:"",
unit:"Fixed",
description:"",
status:true

});


getPricing();



}catch(err){

console.log(err);

}


};




// =======================
// EDIT
// =======================

const editPricing=(item)=>{


setEditId(item._id);


setForm({

category:item.category,
title:item.title,
amount:item.amount,
unit:item.unit,
description:item.description,
status:item.status

});


setShow(true);


};




// =======================
// DELETE
// =======================


const deletePricing=async(id)=>{


if(window.confirm("Delete this pricing?")){


await axios.delete(
`http://localhost:5000/api/pricing/${id}`
);


getPricing();


}


};




// =======================
// STATUS TOGGLE
// =======================


const toggleStatus=async(item)=>{


await axios.put(

`http://localhost:5000/api/pricing/${item._id}`,

{

...item,

status:!item.status

}

);


getPricing();


};





// SEARCH FILTER

const filteredPricing=pricing.filter((item)=>{


return(

(item.title
.toLowerCase()
.includes(search.toLowerCase()))

&&

(filter==="All" || item.category===filter)

);


});




return(


<Container fluid className="mt-4">


<Card className="shadow">


<Card.Header className="bg-dark text-white d-flex justify-content-between">


<h4>
Pricing Master
</h4>

<Button
variant="warning"
onClick={()=>{

setEditId(null);

setForm({
category:"",
title:"",
amount:"",
unit:"Fixed",
description:"",
status:true
});

setShow(true);

}}
>
+ Add New Price
</Button>


</Card.Header>




<Card.Body>



<Row className="mb-3">


<Col md={5}>

<Form.Control

placeholder="Search Pricing..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</Col>



<Col md={4}>


<Form.Select

onChange={(e)=>setFilter(e.target.value)}

>


<option>
All Categories
</option>


{
categories.map((cat)=>(

<option key={cat}>
{cat}
</option>

))
}


</Form.Select>


</Col>



</Row>





<Table bordered hover responsive>


<thead className="table-light">


<tr>

<th>
Category
</th>

<th>
Title
</th>

<th>
Amount
</th>


<th>
Unit
</th>


<th>
Status
</th>


<th>
Action
</th>


</tr>


</thead>



<tbody>


{

filteredPricing.map((item)=>(


<tr key={item._id}>


<td>
{item.category}
</td>


<td>
{item.title}
</td>


<td>

₹{item.amount}

</td>



<td>

{item.unit}

</td>



<td>


<Badge

bg={
item.status?
"success":
"danger"
}

style={{
cursor:"pointer"
}}

onClick={()=>toggleStatus(item)}

>

{
item.status?
"Active":
"Inactive"
}


</Badge>


</td>




<td>


<Button

size="sm"

variant="primary"

className="me-2"

onClick={()=>editPricing(item)}

>

Edit

</Button>



<Button

size="sm"

variant="danger"

onClick={()=>deletePricing(item._id)}

>

Delete

</Button>


</td>



</tr>


))


}


</tbody>


</Table>




</Card.Body>


</Card>






{/* ADD EDIT MODAL */}



<Modal
show={show}
onHide={()=>setShow(false)}
>


<Modal.Header closeButton>


<Modal.Title>

{
editId?
"Edit Pricing":
"Add Pricing"

}

</Modal.Title>


</Modal.Header>




<Modal.Body>



<Form>



<Form.Group className="mb-3">


<Form.Label>
Category
</Form.Label>


<Form.Select

name="category"

value={form.category}

onChange={handleChange}

>


<option>
Select Category
</option>


{

categories.map((cat)=>(

<option key={cat}>
{cat}
</option>

))

}


</Form.Select>



</Form.Group>





<Form.Group className="mb-3">


<Form.Label>
Title
</Form.Label>


<Form.Control

name="title"

value={form.title}

onChange={handleChange}

/>


</Form.Group>





<Form.Group className="mb-3">


<Form.Label>
Amount
</Form.Label>


<Form.Control

type="number"

name="amount"

value={form.amount}

onChange={handleChange}

/>


</Form.Group>





<Form.Group className="mb-3">


<Form.Label>
Unit
</Form.Label>


<Form.Select

name="unit"

value={form.unit}

onChange={handleChange}

>


<option>
Fixed
</option>


<option>
Per Plate
</option>


<option>
Percentage
</option>


<option>
Package
</option>


</Form.Select>


</Form.Group>






<Form.Group className="mb-3">


<Form.Label>
Description
</Form.Label>


<Form.Control

as="textarea"

rows={3}

name="description"

value={form.description}

onChange={handleChange}

/>


</Form.Group>




</Form>


</Modal.Body>




<Modal.Footer>


<Button
variant="secondary"
onClick={()=>setShow(false)}
>

Close

</Button>


<Button
variant="success"
onClick={savePricing}
>

Save

</Button>


</Modal.Footer>


</Modal>



</Container>


);


}


export default Pricing;