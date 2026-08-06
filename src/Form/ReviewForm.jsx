import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";


function ReviewForm({ booking }) {
const [form,setForm]=useState({

name:"",
text:"",
rating:5

});


const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

});

};



const submitReview=async(e)=>{

e.preventDefault();


try{

await axios.post(
  "http://localhost:5000/api/reviews",
  {
    ...form,
    bookingId: booking._id,
    venueName: booking.venueName
  }
);


alert("Review submitted successfully");


setForm({
name:"",
text:"",
rating:5
});


}
catch(error){

console.log(error);

alert("Something went wrong");

}


};



return(

<Form onSubmit={submitReview}>


<Form.Group className="mb-3">

<Form.Label>
Name
</Form.Label>

<Form.Control

name="name"

value={form.name}

onChange={handleChange}

placeholder="Enter your name"

/>

</Form.Group>



<Form.Group className="mb-3">

<Form.Label>
Review
</Form.Label>

<Form.Control

as="textarea"

rows={4}

name="text"

value={form.text}

onChange={handleChange}

placeholder="Write your review"

/>

</Form.Group>



<Form.Group className="mb-3">

<Form.Label>
Rating
</Form.Label>


<Form.Select

name="rating"

value={form.rating}

onChange={handleChange}

>

<option value="5">
★★★★★
</option>

<option value="4">
★★★★
</option>

<option value="3">
★★★
</option>

<option value="2">
★★
</option>

<option value="1">
★
</option>


</Form.Select>


</Form.Group>



<Button type="submit">

Submit Review

</Button>


</Form>

)

}


export default ReviewForm;