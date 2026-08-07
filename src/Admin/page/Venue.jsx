import React, {useEffect, useState} from "react";
import axios from "axios";

import {
Container,
Row,
Col,
Card,
Form,
Button,
Table,
Image
} from "react-bootstrap";


const API = "http://localhost:5000";


function AdminVenue(){


const initialState={

title:"",
slug:"",
location:"",
type:"",
category:"Wedding Venue",
rating:"★★★★★",

image:"",

description:"",

capacity:"",
indoorSpace:"",
outdoorSpace:"",
parkingCapacity:"",
acRooms:"",
nonAcRooms:"",


wifi:false,
security:false,
powerBackup:false,
cctv:false,
catering:false,
customPackage:false,


gallery:[],


map:"",


price:{
min:0,
max:0
},


isTop:false


};



const [venue,setVenue]=useState(initialState);

const [venues,setVenues]=useState([]);

const [imageFile,setImageFile]=useState(null);

const [galleryFiles,setGalleryFiles]=useState([]);

const [editId,setEditId]=useState(null);




// GET ALL

const fetchVenues=async()=>{

try{

const res=await axios.get(
`${API}/api/venues`
);

setVenues(res.data);


}catch(err){

console.log(err);

}

};



useEffect(()=>{

fetchVenues();

},[]);




// INPUT CHANGE


const handleChange=(e)=>{


const {
name,
value,
checked
}=e.target;


if(
[
"wifi",
"security",
"powerBackup",
"cctv",
"catering",
"customPackage",
"isTop"
].includes(name)
){

setVenue({

...venue,

[name]:checked

});


}

else{


setVenue({

...venue,

[name]:value

});


}

};

// PRICE


const handlePrice=(e)=>{


setVenue({

...venue,

price:{

...venue.price,

[e.target.name]:

Number(e.target.value)

}

});


};





// IMAGE UPLOAD


const uploadImage=async(file)=>{


const formData=new FormData();

formData.append(
"image",
file
);



const res=await axios.post(

`${API}/api/upload`,

formData

);



return res.data.image;


};




// GALLERY


const uploadGallery = async()=>{


const formData = new FormData();


galleryFiles.forEach(file=>{

formData.append(
"images",
file
);

});



const res = await axios.post(

`${API}/api/upload/multiple`,

formData

);



return res.data.images;


};





// SUBMIT


const handleSubmit=async(e)=>{

e.preventDefault();


try{

let image = venue.image;


if(imageFile){

image = await uploadImage(imageFile);

}



let gallery = venue.gallery || [];


if(galleryFiles.length > 0){

gallery = await uploadGallery();

}



const data = {

...venue,

image,

gallery

};




if(editId){


await axios.put(

`${API}/api/venues/${editId}`,

data

);


alert("Venue Updated");


}

else{


await axios.post(

`${API}/api/venues`,

data

);


alert("Venue Added");


}




setVenue(initialState);

setImageFile(null);

setGalleryFiles([]);

setEditId(null);


fetchVenues();



}

catch(err){

console.log(err);

}



};





// EDIT


const editVenue=(item)=>{


setVenue(item);

setEditId(item._id);


window.scrollTo({

top:0,

behavior:"smooth"

});


};





// DELETE


const deleteVenue=async(id)=>{


if(!window.confirm(
"Delete Venue?"
))
return;



await axios.delete(

`${API}/api/venues/${id}`

);


fetchVenues();


};





return(


<Container fluid className="mt-4">


<Row>



{/* FORM */}

<Col lg={5}>


<Card>


<Card.Header>

{

editId ?

"Update Venue"

:

"Add Venue"

}

</Card.Header>



<Card.Body>



<Form onSubmit={handleSubmit}>



<Form.Control

className="mb-3"

placeholder="Venue Name"

name="title"

value={venue.title}

onChange={handleChange}

/>



<Form.Control

className="mb-3"

placeholder="Slug"

name="slug"

value={venue.slug}

onChange={handleChange}

/>



<Form.Control

className="mb-3"

placeholder="Location"

name="location"

value={venue.location}

onChange={handleChange}

/>



<Form.Control

className="mb-3"

placeholder="Type"

name="type"

value={venue.type}

onChange={handleChange}

/>



<Form.Control

className="mb-3"

placeholder="Description"

as="textarea"

rows={3}

name="description"

value={venue.description}

onChange={handleChange}

/>




<Form.Label>
Main Image
</Form.Label>


<Form.Control

type="file"

onChange={(e)=>
setImageFile(e.target.files[0])
}

/>




<Form.Label className="mt-3">
Gallery
</Form.Label>


<Form.Control

type="file"

multiple

onChange={(e)=>
setGalleryFiles(
[...e.target.files]
)
}

/>





<hr/>


<h5>
Facilities
</h5>



{

[
"wifi",
"security",
"powerBackup",
"cctv",
"catering",
"customPackage"

].map(item=>(


<Form.Check

key={item}

label={item}

name={item}

checked={venue[item]}

onChange={handleChange}

/>


))

}



<hr/>


<Form.Control

className="mb-2"

placeholder="Capacity"

name="capacity"

value={venue.capacity}

onChange={handleChange}

/>



<Form.Control

className="mb-2"

placeholder="Parking Capacity"

name="parkingCapacity"

value={venue.parkingCapacity}

onChange={handleChange}

/>





<Form.Control

className="mb-2"

placeholder="Indoor Space"

name="indoorSpace"

value={venue.indoorSpace}

onChange={handleChange}

/>



<Form.Control

className="mb-2"

placeholder="Outdoor Space"

name="outdoorSpace"

value={venue.outdoorSpace}

onChange={handleChange}

/>

<Form.Control
  className="mb-2"
  placeholder="AC Rooms"
  name="acRooms"
  value={venue.acRooms}
  onChange={handleChange}
/>

<Form.Control
  className="mb-2"
  placeholder="Non AC Rooms"
  name="nonAcRooms"
  value={venue.nonAcRooms}
  onChange={handleChange}
/>

<Form.Group className="mb-3">
  <Form.Label>
    Google Map Embed URL
  </Form.Label>

  <Form.Control
    as="textarea"
    rows={4}
    className="mb-2"
    placeholder="Paste Google Map Embed URL"
    name="map"
    value={venue.map || ""}
    onChange={handleChange}
  />

  <small className="text-muted">
    Google Maps → Share → Embed a map
  </small>
</Form.Group>




<Row>


<Col>

<Form.Control

type="number"

name="min"

placeholder="Min Price"

value={venue.price.min}

onChange={handlePrice}

/>

</Col>


<Col>

<Form.Control

type="number"

name="max"

placeholder="Max Price"

value={venue.price.max}

onChange={handlePrice}

/>


</Col>


</Row>




<Form.Check

className="mt-3"

label="Top Venue"

name="isTop"

checked={venue.isTop}

onChange={handleChange}

/>





<Button

className="mt-4 w-100"

type="submit"

>


{

editId ?

"Update Venue"

:

"Save Venue"

}


</Button>



</Form>



</Card.Body>


</Card>



</Col>






{/* TABLE */}



<Col lg={7}>


<Card>


<Card.Header>

All Venues

</Card.Header>



<Card.Body>



<Table responsive bordered>



<thead>

<tr>

<th>
Image
</th>

<th>
Name
</th>

<th>
AC Rooms
</th>

<th>
Non AC Rooms
</th>

<th>
Location
</th>

<th>
Action
</th>


</tr>

</thead>




<tbody>


{

venues.map(item=>(


<tr key={item._id}>


<td>

<Image

src={
item.image.startsWith("/uploads")
?
`${API}${item.image}`
:
`${API}/uploads/${item.image}`
}

width="80"

height="60"

/>


</td>



<td>

{item.title}

</td>

<td>{item.acRooms}</td>
<td>{item.nonAcRooms}</td>

<td>

{item.location}

</td>



<td>


<Button

size="sm"

variant="warning"

onClick={()=>
editVenue(item)
}

>

Edit

</Button>




<Button

size="sm"

variant="danger"

className="ms-2"

onClick={()=>
deleteVenue(item._id)
}

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


</Col>


</Row>


</Container>


);


}


export default AdminVenue;