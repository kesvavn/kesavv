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


const [photos,setPhotos]=useState([]);
const [selectedImage,setSelectedImage] = useState(null);

const [form, setForm] = useState({
  category: "wedding",
  album: "",
  title: "",
  description: "",
});

const [images,setImages]=useState([]);




// GET PHOTOS

useEffect(()=>{

getPhotos();

},[]);



const getPhotos=async()=>{

try{

const res=await axios.get(
`${API}/api/photos`
);


setPhotos(res.data);


}
catch(err){

console.log(err);

}

};





const uploadPhoto = async()=>{


if(images.length===0){

alert("Select Images");

return;

}



const data = new FormData();



data.append("category", form.category);
data.append("album", form.album);
data.append("title", form.title);
data.append("description", form.description);



// multiple images
for(let i=0;i<images.length;i++){

data.append(
"images",
images[i]
);

}



try{


const res = await axios.post(

`${API}/api/photos/upload`,

data,

{
headers:{
"Content-Type":"multipart/form-data"
}
}

);



alert(
res.data.message
);



setImages([]);


getPhotos();



}
catch(err){

console.log(
err.response?.data || err.message
);

}


};







// DELETE PHOTO

const deletePhoto=async(id)=>{


try{


const res=await axios.delete(

`${API}/api/photos/${id}`

);



alert(
res.data.message
);



getPhotos();



}
catch(err){

console.log(
err.response?.data || err.message
);

}


};







return(


<div>


<h3>
Gallery Upload
</h3>





<Form.Select

className="mt-3"

value={form.category}

onChange={(e)=>

setForm({

...form,

category:e.target.value

})

}

>


<option value="wedding">
Wedding
</option>


<option value="corporate">
Corporate
</option>


<option value="music">
Music
</option>


<option value="private">
Private Party
</option>


<option value="other">
Other
</option>


</Form.Select>




<Form.Control
  className="mt-3"
  type="text"
  placeholder="Album Name (Example: Rahul & Priya Wedding)"
  value={form.album}
  onChange={(e) =>
    setForm({
      ...form,
      album: e.target.value,
    })
  }
/>


<Form.Control

className="mt-3"

type="text"

placeholder="Title"

value={form.title}

onChange={(e)=>

setForm({

...form,

title:e.target.value

})

}

/>







<Form.Control

className="mt-3"

type="text"

placeholder="Description"

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}

/>








<Form.Control

className="mt-3"

type="file"

multiple

onChange={(e)=>

setImages(e.target.files)

}

/>



<Button

className="mt-3"

onClick={uploadPhoto}

>

Upload Images

</Button>






<Row className="mt-4">


{

photos.map(photo=>(


<Col

md={3}

className="mb-4"

key={photo._id}

>



<Card>



<Card.Img

variant="top"

src={`${API}${photo.image}`}

height="180"

style={{

objectFit:"cover"

}}

/>





<Card.Body>


<h6>

{photo.title}

</h6>

<p className="text-primary fw-bold">
  {photo.album}
</p>


<p>

{photo.category}

</p>




<Button

variant="danger"

size="sm"

onClick={()=>deletePhoto(photo._id)}

>

Delete

</Button>



</Card.Body>



</Card>



</Col>



))


}



</Row>


</div>


);


}


export default Gallery;