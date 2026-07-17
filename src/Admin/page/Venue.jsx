import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
} from "react-bootstrap";

function Venue() {

  const [venues, setVenues] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const [venue, setVenue] = useState({
    title: "",
    location: "",
    type: "",
    rating: "★★★★★",
    image: "",
    isTop: false,
  });


  // Fetch Venues
  const fetchVenues = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/venues"
      );
      setVenues(res.data);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchVenues();
  }, []);



  // Input Change
  const handleChange = (e) => {

    const { name, value, checked } = e.target;

    setVenue({
      ...venue,
      [name]: name === "isTop" ? checked : value,
    });

  };



  // Image Upload
  const uploadImage = async () => {

    if (!imageFile) return venue.image;


    const formData = new FormData();

    formData.append(
      "image",
      imageFile
    );


    try {

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );


      return res.data.image;

    } catch(error){

      console.log(error);
      return "";

    }

  };




  // Add / Update Venue
  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      let image = venue.image;


      if(imageFile){
        image = await uploadImage();
      }


      const data = {
        ...venue,
        image,
      };



      if(editId){


        await axios.put(
          `http://localhost:5000/api/venues/${editId}`,
          data
        );


        alert("Venue Updated");


      }else{


        await axios.post(
          "http://localhost:5000/api/venues",
          data
        );


        alert("Venue Added");

      }



      setVenue({
        title:"",
        location:"",
        type:"",
        rating:"★★★★★",
        image:"",
        isTop:false,
      });


      setImageFile(null);
      setEditId(null);

      fetchVenues();


    }catch(error){

      console.log(error);

    }

  };






  // Edit Venue
  const editVenue = (item)=>{


    setVenue({

      title:item.title,
      location:item.location,
      type:item.type,
      rating:item.rating,
      image:item.image,
      isTop:item.isTop,

    });


    setEditId(item._id);


    window.scrollTo({
      top:0,
      behavior:"smooth"
    });


  };





  // Delete Venue
  const deleteVenue = async(id)=>{


    const confirmDelete =
      window.confirm(
        "Delete this venue?"
      );


    if(!confirmDelete)
      return;


    try{

      await axios.delete(
        `http://localhost:5000/api/venues/${id}`
      );


      alert("Deleted");

      fetchVenues();


    }catch(error){

      console.log(error);

    }

  };





return (

<Container fluid className="p-4">


<h2 className="mb-4">
Venue Management
</h2>



<Row>


<Col md={4}>


<Card className="p-3 shadow">


<h5>
{editId ? "Edit Venue" : "Add Venue"}
</h5>


<Form onSubmit={handleSubmit}>


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
Rating
</Form.Label>


<Form.Control

name="rating"

value={venue.rating}

onChange={handleChange}

/>


</Form.Group>






<Form.Group className="mb-3">

<Form.Label>
Image
</Form.Label>


<Form.Control

type="file"

onChange={(e)=>
setImageFile(e.target.files[0])
}

/>


</Form.Group>





<Form.Check

type="checkbox"

label="Top Venue"

name="isTop"

checked={venue.isTop}

onChange={handleChange}

className="mb-3"

/>


<Button type="submit">

{
editId
?
"Update Venue"
:
"Add Venue"
}

</Button>



</Form>


</Card>


</Col>





<Col md={8}>


<Card className="p-3 shadow">


<h5>
Venue List
</h5>


<Table bordered hover responsive>


<thead>

<tr>

<th>
Image
</th>

<th>
Title
</th>

<th>
Location
</th>

<th>
Type
</th>

<th>
Rating
</th>

<th>
Action
</th>

</tr>

</thead>



<tbody>


{
venues.map((item)=>(


<tr key={item._id}>


<td>

<img

src={
`http://localhost:5000/uploads/${item.image}`
}

width="70"

height="50"

alt="venue"

/>

</td>



<td>
{item.title}
</td>


<td>
{item.location}
</td>


<td>
{item.type}
</td>


<td>
{item.rating}
</td>


<td>


<Button

variant="warning"

size="sm"

onClick={()=>
editVenue(item)
}

className="me-2"

>

Edit

</Button>




<Button

variant="danger"

size="sm"

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


</Card>


</Col>



</Row>


</Container>


);

}


export default Venue;