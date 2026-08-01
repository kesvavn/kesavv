import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

import MyNavbar from "../../Navbar";
import "../gallery/gallery.css";


const API="http://localhost:5000";


function PhotoGallery() {


const [galleryData,setGalleryData]=useState({});

const [activeTab,setActiveTab]=useState("wedding");



useEffect(()=>{


const getPhotos=async()=>{


try{


const res=await axios.get(
`${API}/api/photos`
);



const data={};



res.data.forEach((photo)=>{


if(!data[photo.category]){

data[photo.category]=[];

}



data[photo.category].push(

`${API}${photo.image}`

);



});



setGalleryData(data);



}
catch(error){

console.log(error);

}


};



getPhotos();


},[]);




return (
<>


{/* Hero Section */}

<div className="photo-bg">

<MyNavbar />


<div className="photo-content text-center">

<h1>
Photo Gallery
</h1>


<p>
Beautiful wedding and event photos will appear here.
</p>


</div>

</div>





<section className="gallery-section py-5">


<Container>



<div className="gallery-top-text">

<p>
Melodia® Events always prioritizes the satisfaction of our clients in Kerala. We are particularly delighted to work with the Malayalee community, bringing joy from the heart. Here are some photos of our recent work in Kerala that we would like to share with you.
</p>


</div>





<div className="gallery-buttons">



<Button

className={
activeTab==="wedding"
?
"active-btn"
:
"gallery-btn"
}

onClick={()=>setActiveTab("wedding")}

>

Wedding Decors

</Button>




<Button

className={
activeTab==="corporate"
?
"active-btn"
:
"gallery-btn"
}

onClick={()=>setActiveTab("corporate")}

>

Corporate Event

</Button>




<Button

className={
activeTab==="music"
?
"active-btn"
:
"gallery-btn"
}

onClick={()=>setActiveTab("music")}

>

Music & Entertainment

</Button>




<Button

className={
activeTab==="private"
?
"active-btn"
:
"gallery-btn"
}

onClick={()=>setActiveTab("private")}

>

Private Parties

</Button>




<Button

className={
activeTab==="other"
?
"active-btn"
:
"gallery-btn"
}

onClick={()=>setActiveTab("other")}

>

Other Events

</Button>


</div>






<Row className="g-4 mt-2">



{

galleryData[activeTab]?.map((img,index)=>(


<Col

lg={4}

md={6}

key={index}

>


<div className="gallery-card">


<img

src={img}

alt="gallery"

/>


</div>



</Col>



))


}



</Row>




</Container>


</section>


</>
);


}


export default PhotoGallery;