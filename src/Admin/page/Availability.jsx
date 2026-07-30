import {useEffect,useState} from "react";
import axios from "axios";

import {

Container,
Row,
Col,
Form,
Button,
Table

} from "react-bootstrap";

function Availability(){

const [venues,setVenues]=useState([]);

const [list,setList]=useState([]);

const [availability,setAvailability]=useState({

venueId:"",
date:"",
status:"Available",
reason:""

});

const [editId,setEditId]=useState(null);

useEffect(()=>{

fetchVenues();

fetchAvailability();

},[]);

const fetchVenues = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/venues");
    console.log("Venues:", res.data);
    setVenues(res.data);
  } catch (err) {
    console.log("Venue Error:", err);
  }
};

const fetchAvailability = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/availability");
    console.log("Availability:", res.data);
    setList(res.data);
  } catch (err) {
    console.log("Availability Error:", err);
  }
};

const handleChange=(e)=>{

setAvailability({

...availability,

[e.target.name]:e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

if(editId){

await axios.put(

`http://localhost:5000/api/availability/${editId}`,

availability

);

}else{

await axios.post(

"http://localhost:5000/api/availability",

availability

);

}

setAvailability({

venueId:"",
date:"",
status:"Available",
reason:""

});

setEditId(null);

fetchAvailability();

};

const editData=(item)=>{

setAvailability({

venueId:item.venueId._id,

date:item.date.substring(0,10),

status:item.status,

reason:item.reason

});

setEditId(item._id);

};

const deleteData=async(id)=>{

await axios.delete(

`http://localhost:5000/api/availability/${id}`

);

fetchAvailability();

};

return(

<Container fluid>

<h2 className="mb-4">

Availability

</h2>

<Form onSubmit={handleSubmit}>

<Row>

<Col md={3}>

<Form.Select

name="venueId"

value={availability.venueId}

onChange={handleChange}

required

>

<option value="">

Select Venue

</option>

{

venues.map(v=>(

<option

key={v._id}

value={v._id}

>

{v.title}

</option>

))

}

</Form.Select>

</Col>

<Col md={2}>

<Form.Control

type="date"

name="date"

value={availability.date}

onChange={handleChange}

required

/>

</Col>

<Col md={2}>

<Form.Select

name="status"

value={availability.status}

onChange={handleChange}

>

<option>Available</option>

<option>Booked</option>

<option>Blocked</option>

<option>Holiday</option>

<option>Maintenance</option>

</Form.Select>

</Col>

<Col md={3}>

<Form.Control

placeholder="Reason"

name="reason"

value={availability.reason}

onChange={handleChange}

/>

</Col>

<Col md={2}>

<Button type="submit">

{

editId?

"Update"

:

"Save"

}

</Button>

</Col>

</Row>

</Form>

<hr/>

<Table bordered hover>

<thead>

<tr>

<th>Date</th>

<th>Venue</th>

<th>Status</th>

<th>Reason</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{

list.map(item=>(

<tr key={item._id}>

<td>

{new Date(item.date).toLocaleDateString()}

</td>

<td>

{item.venueId?.title}

</td>

<td>

{item.status}

</td>

<td>

{item.reason}

</td>

<td>

<Button

size="sm"

onClick={()=>editData(item)}

>

Edit

</Button>

{" "}

<Button

variant="danger"

size="sm"

onClick={()=>deleteData(item._id)}

>

Delete

</Button>

</td>

</tr>

))

}

</tbody>

</Table>

</Container>

);

}

export default Availability;