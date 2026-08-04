import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

import MyNavbar from "../../Navbar";
import "../gallery/gallery.css";


const API="http://localhost:5000";


function PhotoGallery() {

const [currentImages,setCurrentImages] = useState([]);
const [currentIndex,setCurrentIndex] = useState(0);
const [selectedImage,setSelectedImage] = useState(null);
const [albums, setAlbums] = useState([]);

const [galleryData,setGalleryData]=useState({});

const [activeTab,setActiveTab]=useState("wedding");

//albums
const getAlbums = async () => {
  try {
    const res = await axios.get(`${API}/api/photos/albums`);
    setAlbums(res.data);
  } catch (error) {
    console.log(error);
  }
};



//photos

useEffect(()=>{
getAlbums();

const getPhotos=async()=>{


try{


const res=await axios.get(
`${API}/api/photos`
);



const data={};


res.data.forEach((photo)=>{


// album photos exclude
if(photo.album){
    return;
}



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

<h3 className="text-center mb-4">
  Wedding Albums
</h3>

<Row className="mb-5">

  {albums.map((album) => (

    <Col lg={4} md={6} key={album._id}>

      <Link
        to={`/wedding-album/${encodeURIComponent(album._id)}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >

        <div className="gallery-card">

          <img
            src={`${API}${album.coverImage}`}
            alt={album._id}
          />

          <div className="p-3 text-center">

            <h5>{album._id}</h5>

            <p>{album.count} Photos</p>

          </div>

        </div>

      </Link>

    </Col>

  ))}

</Row>




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

onClick={()=>{

setCurrentImages(galleryData[activeTab]);

setCurrentIndex(index);

setSelectedImage(img);

}}

style={{cursor:"pointer"}}
/>


</div>



</Col>



))


}



</Row>


{
selectedImage && (

<div className="lightbox">


{/* Close Button */}

<button
className="close-btn"
onClick={()=>setSelectedImage(null)}
>
✕
</button>



{/* Previous Button */}

<button

className="arrow left"

onClick={()=>{

const newIndex =
(currentIndex - 1 + currentImages.length)
% currentImages.length;


setCurrentIndex(newIndex);

setSelectedImage(
currentImages[newIndex]
);

}}

>

❮

</button>





<img
src={selectedImage}
alt="preview"
/>





{/* Next Button */}

<button

className="arrow right"

onClick={()=>{


const newIndex =
(currentIndex + 1)
% currentImages.length;


setCurrentIndex(newIndex);


setSelectedImage(
currentImages[newIndex]
);


}}

>

❯

</button>



</div>

)
}
</Container>


</section>


</>
);


}


export default PhotoGallery;