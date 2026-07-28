import React,{useEffect,useState} from "react";
import axios from "axios";

import {
Row,
Col,
Card,
Button,
Form
} from "react-bootstrap";


const API="http://localhost:5000";


function Gallery(){


const [venues,setVenues]=useState([]);

const [selected,setSelected]=useState("");

const [images,setImages]=useState([]);



useEffect(()=>{

getVenues();

},[]);



const getVenues=async()=>{

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



// UPLOAD

const uploadGallery=async()=>{


if(!selected){

alert("Select Venue");
return;

}


if(images.length===0){

alert("Select Images");
return;

}


const formData=new FormData();



for(let img of images){

formData.append(
"images",
img
);

}



try{


await axios.post(
`${API}/api/gallery/${selected}`,
formData
);



alert("Gallery Uploaded");


setImages([]);


getVenues();



}
catch(err){

console.log(err);

}


};




// DELETE

const deleteImage=async(
venueId,
imageId
)=>{


console.log(
"venue",
venueId
);


console.log(
"image",
imageId
);



try{


const res=await axios.delete(
`${API}/api/gallery/${venueId}/${imageId}`
);



alert(res.data.message);



getVenues();



}
catch(err){

console.log(
err.response?.data || err.message
);

}


};




return(

<div>


<Form.Select

value={selected}

onChange={(e)=>
setSelected(e.target.value)
}

>


<option>
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





<Form.Control

type="file"

multiple

className="mt-3"

onChange={(e)=>
setImages(e.target.files)
}

/>




<Button

className="mt-3"

onClick={uploadGallery}

>

Upload Images

</Button>





<Row className="mt-4">


{

venues.map(v=>(

v.gallery?.map(img=>(


<Col md={3}

className="mb-4"

key={img._id}

>


<Card>


<Card.Img

variant="top"

src={`${API}${img.url}`}

height="180"

style={{
objectFit:"cover"
}}

/>


<Card.Body>


<Button

variant="danger"

size="sm"

onClick={()=>deleteImage(
v._id,
img._id
)}

>

Delete

</Button>


</Card.Body>


</Card>


</Col>


))

))


}


</Row>


</div>


);


}


export default Gallery;