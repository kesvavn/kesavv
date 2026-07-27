import {useEffect,useState} from "react";
import axios from "axios";

import {
Container,
Row,
Col,
Card,
Form,
Button,
Table
} from "react-bootstrap";


function AdminVenue(){


const API="http://localhost:5000";



const [venues,setVenues]=useState([]);

const [editId,setEditId]=useState(null);


const [imageFile,setImageFile]=useState(null);

const [galleryFiles,setGalleryFiles]=useState([]);





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





// GET VENUES


const fetchVenues=async()=>{


try{


const res=await axios.get(

`${API}/api/venues`

);


setVenues(res.data);



}

catch(err){

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



setVenue({

...venue,


[name]:

name==="isTop" ||

[
"wifi",
"security",
"powerBackup",
"cctv",
"catering",
"customPackage"
].includes(name)

?

checked

:

value


});


};










// PRICE CHANGE


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









// GALLERY UPLOAD


const uploadGallery=async()=>{


let images=[];



for(let file of galleryFiles){


const url=await uploadImage(file);


images.push({

url:url,

alt:"Venue Gallery"

});


}


return images;


};









// SUBMIT


const handleSubmit=async(e)=>{


e.preventDefault();


try{


let mainImage=venue.image;



if(imageFile){


mainImage=await uploadImage(imageFile);


}



let gallery=venue.gallery;



if(galleryFiles.length>0){


gallery=await uploadGallery();


}




const data={


...venue,


image:mainImage,


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


<Container className="mt-4">


<Card>


<Card.Header>


<h3>

{

editId

?

"Update Venue"

:

"Add Venue"

}

</h3>


</Card.Header>




<Card.Body>


<Form onSubmit={handleSubmit}>


<Row>


<Col md={6}>


<Form.Group className="mb-3">


<Form.Label>
Venue Name
</Form.Label>


<Form.Control

name="title"

value={venue.title}

onChange={handleChange}

/>


</Form.Group>





<Form.Group className="mb-3">

<Form.Label>
Slug
</Form.Label>


<Form.Control

name="slug"

placeholder="kakkattu-mana"

value={venue.slug}

onChange={handleChange}

/>


</Form.Group>






<Form.Group className="mb-3">

<Form.Label>
Location
</Form.Label>


<Form.Control

name="location"

value={venue.location}

onChange={handleChange}

/>


</Form.Group>







<Form.Group className="mb-3">

<Form.Label>
Type
</Form.Label>


<Form.Control

name="type"

value={venue.type}

onChange={handleChange}

/>


</Form.Group>







<Form.Group className="mb-3">

<Form.Label>
Category
</Form.Label>


<Form.Control

name="category"

value={venue.category}

onChange={handleChange}

/>


</Form.Group>







<Form.Group>

<Form.Label>
Main Image
</Form.Label>


<Form.Control

type="file"

onChange={(e)=>

setImageFile(e.target.files[0])

}

/>


</Form.Group>


</Col>









<Col md={6}>


<Form.Group>

<Form.Label>
Description
</Form.Label>


<Form.Control

as="textarea"

rows={4}

name="description"

value={venue.description}

onChange={handleChange}

/>


</Form.Group>





<Form.Group className="mt-3">

<Form.Label>
Capacity
</Form.Label>


<Form.Control

name="capacity"

value={venue.capacity}

onChange={handleChange}

/>


</Form.Group>





<Form.Group className="mt-3">

<Form.Label>
Parking Capacity
</Form.Label>


<Form.Control

name="parkingCapacity"

value={venue.parkingCapacity}

onChange={handleChange}

/>


</Form.Group>






<Form.Group className="mt-3">

<Form.Label>
Gallery Images
</Form.Label>


<Form.Control

type="file"

multiple

onChange={(e)=>

setGalleryFiles([...e.target.files])

}

/>


</Form.Group>


</Col>


</Row>










<hr/>


<h5>
Facilities
</h5>



<Row>


<Col>


<Form.Control

className="mb-2"

placeholder="Indoor Space"

name="indoorSpace"

value={venue.indoorSpace}

onChange={handleChange}

/>


</Col>



<Col>


<Form.Control

placeholder="Outdoor Space"

name="outdoorSpace"

value={venue.outdoorSpace}

onChange={handleChange}

/>


</Col>


</Row>





<Row className="mt-3">


<Col>

<Form.Control

placeholder="AC Rooms"

name="acRooms"

value={venue.acRooms}

onChange={handleChange}

/>

</Col>



<Col>

<Form.Control

placeholder="Non AC Rooms"

name="nonAcRooms"

value={venue.nonAcRooms}

onChange={handleChange}

/>

</Col>


</Row>









<hr/>


<h5>
Amenities
</h5>


<Row>


{
[
"wifi",
"security",
"powerBackup",
"cctv",
"catering",
"customPackage"
].map(item=>(


<Col md={4} key={item}>


<Form.Check

label={item}

name={item}

checked={venue[item]}

onChange={handleChange}

/>


</Col>


))
}



</Row>









<hr/>


<h5>
Price
</h5>



<Row>


<Col>


<Form.Control

type="number"

name="min"

placeholder="Minimum"

value={venue.price.min}

onChange={handlePrice}

/>


</Col>



<Col>


<Form.Control

type="number"

name="max"

placeholder="Maximum"

value={venue.price.max}

onChange={handlePrice}

/>


</Col>



</Row>









<Form.Group className="mt-3">


<Form.Control

placeholder="Google Map Link"

name="map"

value={venue.map}

onChange={handleChange}

/>


</Form.Group>







<Form.Check

className="mt-3"

label="Top Venue"

name="isTop"

checked={venue.isTop}

onChange={handleChange}

/>







<Button

className="mt-3"

type="submit"

>


{

editId

?

"Update"

:

"Save"

}


</Button>



</Form>


</Card.Body>


</Card>









<Table striped bordered className="mt-5">


<thead>

<tr>

<th>
Image
</th>

<th>
Name
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

<img

src={`${API}/${item.image}`}

width="80"

/>


</td>


<td>

{item.title}

</td>


<td>

{item.location}

</td>


<td>


<Button

variant="warning"

onClick={()=>editVenue(item)}

>

Edit

</Button>



<Button

variant="danger"

className="ms-2"

onClick={()=>deleteVenue(item._id)}

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


export default AdminVenue;