import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";


const Form = ({venue}) => {
  const [pricing,setPricing] = useState([]);
const [policies,setPolicies] = useState([]);
const [showReview,setShowReview] = useState(false);
const [disabledDates, setDisabledDates] = useState([]);

  const navigate = useNavigate();
const [formData, setFormData] = useState({
  fullName: "",
  phone: "",
  email: "",
venueName: venue?.title || "",

  functionDate: "",
  guests: "",

acRooms: 0,
nonAcRooms: 0,
  functionType: "",
  functionTime: "",
  // Food
foodType:"",
foodCategory:"",

  // Additional Package
  additionalPackage: "No",

  // Wedding
  makeupLevel: "",
  decorationLevel: "",
  photographyPackage: "",
  videoPackage: "",


  // Corporate
  stageSetup: "",
  soundSystem: "",
  ledScreen: "",

  // Birthday
  cakePackage: "",
  birthdayDecoration: "",

  privatePartyType: "",
  musicEntertainment: "",

  // Payment
  
  cancellationPolicy: "",

  totalPrice: 0,
});
const [available, setAvailable] = useState(null);
const [bookedDates, setBookedDates] = useState([]);

useEffect(()=>{

 if(venue){
   setFormData(prev=>({
     ...prev,
     venueName: venue.title
   }));
 }

},[venue]);

//cancel policy
useEffect(()=>{
axios.get("http://localhost:5000/api/cancellation-policies")
  .then(res=>{
    console.log(res.data);
    setPolicies(res.data);
  })
  .catch(err=>console.log(err));
},[]);


//pricing

useEffect(()=>{

axios.get(
"http://localhost:5000/api/pricing"
)
.then(res=>{

console.log("Pricing Data:",res.data);

setPricing(res.data);

})
.catch(err=>console.log(err));


},[]);


//available
  

useEffect(() => {
  if (!venue?._id) return;

  axios
    .get("http://localhost:5000/api/availability/unavailable", {
      params: { venueId: venue._id },
    })
    .then((res) => {
      const dates = res.data.map(item => item.date.substring(0, 10));
      setDisabledDates(dates);
    })
    .catch(console.error);
}, [venue]);



useEffect(() => {
  console.log("Disabled Dates:", disabledDates);
}, [disabledDates]);


useEffect(() => {
  const price = calculatePrice();

  setFormData(prev => ({
    ...prev,
    totalPrice: price,
  }));
}, [
  venue,
  pricing,
  formData.guests,
  formData.acRooms,
  formData.nonAcRooms,
  formData.functionType,
  formData.privatePartyType,
  formData.additionalPackage,
  formData.makeupLevel,
  formData.decorationLevel,
  formData.photographyPackage,
  formData.videoPackage,
  formData.foodType,
  formData.foodCategory,
  formData.stageSetup,
  formData.soundSystem,
  formData.ledScreen,
  formData.cakePackage,
  formData.musicEntertainment,
  formData.birthdayDecoration,
]);

const checkAvailability = () => {

if(!formData.functionDate){
  alert("Select Function Date");
  return;
}

const isBooked = bookedDates.includes(
  formData.functionDate
);

if(isBooked){
  setAvailable(false);
}
else{
  setAvailable(true);
}

};

const handleChange = (e) => {

  const { name, value } = e.target;

  // AC Room limit
  if (name === "acRooms") {

    const rooms = Number(value);

    if (rooms > Number(venue?.acRooms || 0)) {
      alert(`Only ${venue?.acRooms || 0} AC rooms available`);
      return;
    }
  }

  // Non AC Room limit
  if (name === "nonAcRooms") {

    const rooms = Number(value);

    if (rooms > Number(venue?.nonAcRooms || 0)) {
      alert(`Only ${venue?.nonAcRooms || 0} Non AC rooms available`);
      return;
    }
  }

  // Additional Package No
  if (name === "additionalPackage" && value === "No") {

    setFormData(prev => ({
      ...prev,
      additionalPackage: "No",
      makeupLevel: "",
      foodType: "",
      foodCategory: "",
      decorationLevel: "",
      photographyPackage: "",
      videoPackage: "",
      stageSetup: "",
      soundSystem: "",
      ledScreen: "",
      cakePackage: "",
      birthdayDecoration: "",
      privatePartyType: "",
      musicEntertainment: ""
    }));

    return;
  }

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

};

const getPrice = (category, title) => {

  console.log("Searching Price:", {
    category,
    title,
    pricing
  });

  const item = pricing.find((p) => {

    console.log("Checking:", {
      dbCategory: p.category,
      dbTitle: p.title,
      dbAmount: p.amount,
      dbStatus: p.status
    });

    return (
      p.category?.trim().toLowerCase() ===
        category?.trim().toLowerCase() &&
      p.title?.trim().toLowerCase() ===
        title?.trim().toLowerCase() &&
      p.status === true
    );
  });

  console.log("FOUND PRICE:", item);

  return item ? Number(item.amount) : 0;
};

const calculatePrice = () => {
  let price = 0;

  // =========================
  // VENUE - ALWAYS
  // =========================
  if (venue?.title) {
    price += getPrice("Venue", venue.title);
  }


// =========================
// ROOM PRICE
// =========================

const acRooms = Number(formData.acRooms || 0);
const nonAcRooms = Number(formData.nonAcRooms || 0);

if (acRooms > 0) {
  price +=
    acRooms *
    getPrice("Room", "AC Room");
}

if (nonAcRooms > 0) {
  price +=
    nonAcRooms *
    getPrice("Room", "Non AC Room");
}
  // =========================
  // ADDITIONAL PACKAGE
  // =========================
  if (formData.additionalPackage === "Yes") {

    // Food
    const guests = Number(formData.guests || 0);

    if (guests > 0 && formData.foodCategory) {
      price += guests * getPrice(
        "Food",
        formData.foodCategory
      );
    }

    // Wedding / Reception
    if (
      formData.functionType === "Wedding" ||
      formData.functionType === "Reception"
    ) {
      price += getPrice("Makeup", formData.makeupLevel);

      price += getPrice(
        "Decoration",
        formData.decorationLevel
      );

      price += getPrice(
        "Photography",
        formData.photographyPackage
      );

      price += getPrice(
        "Videography",
        formData.videoPackage
      );
    }

    // Corporate
    if (formData.functionType === "Corporate Event") {
      price += getPrice(
        "Stage Setup",
        formData.stageSetup
      );

      price += getPrice(
        "Sound System",
        formData.soundSystem
      );

      price += getPrice(
        "LED Screen",
        formData.ledScreen
      );
    }

    // Private Party
    if (formData.functionType === "Private Party") {

      if (formData.privatePartyType === "Birthday") {

        price += getPrice(
          "Cake",
          formData.cakePackage
        );

        price += getPrice(
          "Birthday Decoration",
          formData.birthdayDecoration
        );

        price += getPrice(
          "Photography",
          formData.photographyPackage
        );

        price += getPrice(
          "Music & Entertainment",
          formData.musicEntertainment
        );
      }

      if (formData.privatePartyType === "Anniversary") {

        price += getPrice(
          "Birthday Decoration",
          formData.birthdayDecoration
        );

        price += getPrice(
          "Photography",
          formData.photographyPackage
        );

        price += getPrice(
          "Cake",
          formData.cakePackage
        );
      }
    }
  }

  // =========================
  // GST
  // =========================
  const gst = getPrice("GST", "GST");

  if (gst > 0) {
    price += price * gst / 100;
  }

  // =========================
  // DISCOUNT
  // =========================
  const discount = getPrice(
    "Discount",
    "Festival Offer"
  );

  if (discount > 0) {
    price -= price * discount / 100;
  }

  return Math.round(price);
};


const handleSubmit = async(e)=>{

e.preventDefault();


const token = localStorage.getItem("token");


if(!token){
alert("Please Login First");
navigate("/login");
return;
}


const price = calculatePrice();


const submitData = {
...formData,
venueName:venue?.title,
image:venue?.image,
totalPrice:price
};


try{

await axios.post(
"http://localhost:5000/api/requests",
submitData,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


alert("Booking Request Submitted Successfully");


navigate("/my-bookings");


}
catch(err){

console.log(err.response?.data || err);

alert("Booking Failed");

}


};
  return (
    <div className="event-form-container">
      <h3>
      {venue ? venue.title : "Selected Venue"}
</h3>
      <div className="event-header">
        <h2>MELODIA EVENT MANAGEMENT</h2>
        <h3>Request Pricing</h3>

        <p>
          Fill this form and we will contact you shortly.
          <br />
          All information provided will be treated confidentially.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="event-form-grid">

          {/* Name */}

          <div>
            <label>Full Name</label>

            <input type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="Enter Full Name"
              onChange={handleChange}/>
          </div>

          {/* Phone */}

          <div>
            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </div>

          {/* Email */}

          <div>
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          {/* Date */}

          <div>
            <label>Function Date</label>

         <input
  type="date"
  name="functionDate"
  value={formData.functionDate}
  onChange={(e) => {
    const date = e.target.value;

    console.log("Selected Date:", date);
    console.log("Disabled Dates:", disabledDates);

    setFormData((prev) => ({
      ...prev,
      functionDate: date,
    }));

    const isUnavailable = disabledDates.includes(date);

    console.log("Unavailable:", isUnavailable);

    setAvailable(!isUnavailable);
  }}
/>
{available === true && (
<p style={{color:"green"}}>
✅ Date Available
</p>
)}

{available === false && (
<p style={{color:"red"}}>
❌ This date is already booked
</p>
)}
            
          </div>

          {/* Guests */}

          <div>
            <label>Guests</label>

            <input
              type="number"
              name="guests"
              value={formData.guests}
              placeholder="Number of Guests"
              onChange={handleChange}
            />
          </div>

          {/* Rooms */}
<div>
  <label>AC Rooms</label>

  <input
    type="number"
    name="acRooms"
    min="0"
    max={venue?.acRooms || 0}
    value={formData.acRooms}
    onChange={handleChange}
  />

  <small>
    Available: {venue?.acRooms || 0}
  </small>
</div>

<div>
  <label>Non AC Rooms</label>

  <input
    type="number"
    name="nonAcRooms"
    min="0"
    max={venue?.nonAcRooms || 0}
    value={formData.nonAcRooms}
    onChange={handleChange}
  />

  <small>
    Available: {venue?.nonAcRooms || 0}
  </small>
</div>


           {/* Function Type */}

           <div>

            <label>Function Type</label>

            <select
name="functionType"
value={formData.functionType}
onChange={handleChange}
>

<option value="">
Select Function Type
</option>

<option value="Wedding">
Wedding
</option>

<option value="Reception">
Reception
</option>

<option value="Private Party">
Private Party
</option>

<option value="Corporate Event">
Corporate Event
</option>


{/* Private Party Type */}

{formData.functionType === "Private Party" && (

<div>

<label>Private Party Type</label>

<select
name="privatePartyType"
value={formData.privatePartyType}
onChange={handleChange}
>

<option value="">
Select Party Type
</option>

<option value="Birthday">
Birthday
</option>

<option value="Anniversary">
Anniversary
</option>

</select>

</div>

)}

            </select>

</div>


          {/* Function Time */}

          <div>
  <label>Function Time</label>

  <select
    name="functionTime"
    value={formData.functionTime}
    onChange={handleChange}
  >
    <option value="">Select Function Time</option>
    <option value="2 Hours">2 Hours</option>
    <option value="4 Hours">4 Hours</option>
    <option value="6 Hours">6 Hours</option>
    <option value="8 Hours">8 Hours</option>
    <option value="Half Day">Half Day</option>
    <option value="Full Day">Full Day</option>
  </select>
</div>


        
        {/* Additional Package */}

<div>
  <label>Additional Packages</label>

  <div className="event-radio-group">

    <label>
      <input
        type="radio"
        name="additionalPackage"
        value="Yes"
        checked={formData.additionalPackage === "Yes"}
        onChange={handleChange}
      />
      Yes
    </label>


    <label>
      <input
        type="radio"
        name="additionalPackage"
        value="No"
        checked={formData.additionalPackage === "No"}
        onChange={handleChange}
      />
      No
    </label>

    {/* Private Party Type */}

{formData.functionType === "Private Party" && (

<div>

<label>Party Type</label>

<select
name="privatePartyType"
value={formData.privatePartyType}
onChange={handleChange}
>

<option value="">
Select Party Type
</option>

<option value="Birthday">
Birthday
</option>

<option value="Anniversary">
Anniversary
</option>

</select>

</div>

)}

{formData.functionType === "Music & Entertainment" && (

<div>

<label>Entertainment Type</label>

<select
name="musicEntertainment"
value={formData.musicEntertainment}
onChange={handleChange}
>

<option value="">
Select Entertainment
</option>

<option value="DJ">
DJ
</option>

<option value="Live Music">
Live Music
</option>

<option value="Dance Performance">
Dance Performance
</option>

<option value="Celebrity Show">
Celebrity Show
</option>

<option value="Stage Show">
Stage Show
</option>

<option value="Magic Show">
Magic Show
</option>

</select>

</div>

)}


  </div>
</div>
     
{/* Show Additional Package */}

{formData.additionalPackage === "Yes" && (

<>

{/* Wedding Package */}

{(formData.functionType === "Wedding" ||
  formData.functionType === "Reception") && (
<>

<div>
<label>Makeup Level</label>

<select name="makeupLevel"value={formData.makeupLevel}onChange={handleChange}>

<option value="">Select Makeup</option>
<option value="Basic">Basic </option>
<option value="Premium">Premium </option>
<option value="Luxury">Luxury </option>

</select>

</div>



<div>
<label>Decoration Level</label>

<select name="decorationLevel" value={formData.decorationLevel}onChange={handleChange}>

<option value="">Select Decoration</option>
<option value="Basic">Basic </option>
<option value="Premium">Premium </option>
<option value="Luxury">Luxury </option>
</select>

</div>



<div>
<label>Photography Package</label>

<select
name="photographyPackage"
value={formData.photographyPackage}
onChange={handleChange}
>

<option value="">Select Photography</option>
<option value="Basic">Basic </option>
<option value="Premium">Premium </option>
<option value="Luxury">Luxury </option>

</select>

</div>
{/* Catering */}

{(formData.functionType === "Wedding" ||
formData.functionType === "Reception") && (

<>

<div>

<label>Food Category</label>

<div className="event-radio-group">

<label>
<input
type="radio"
name="foodCategory"
value="Veg"
checked={formData.foodCategory === "Veg"}
onChange={handleChange}
/>
Veg
</label>


<label>
<input
type="radio"
name="foodCategory"
value="Non Veg"
checked={formData.foodCategory === "Non Veg"}
onChange={handleChange}
/>
Non Veg
</label>

</div>

</div>


<div>

<label>Food Type</label>

<select
name="foodType"
value={formData.foodType}
onChange={handleChange}
>

<option value="">
Select Food Type
</option>

<option value="South Indian">
South Indian
</option>

<option value="North Indian">
North Indian
</option>

<option value="Chinese">
Chinese
</option>

<option value="Mixed">
Mixed
</option>

</select>

</div>
<div>

<label>Video Package</label>

<select
name="videoPackage"
value={formData.videoPackage}
onChange={handleChange}
>

<option value="">
Select Video Package
</option>

<option value="Basic">
Basic 
</option>

<option value="Premium">
Premium 
</option>

<option value="Luxury">
Luxury 
</option>

</select>

</div>

</>


)}

</>

)}

{/* Corporate */}

{formData.functionType === "Corporate Event" && (

<>

<div>
<label>Stage Setup</label>

<select
name="stageSetup"
value={formData.stageSetup}
onChange={handleChange}
>

<option value="">Select Stage</option>
<option value="Basic">Basic </option>
<option value="Premium">Premium</option>
<option value="Luxury">Luxury </option>

</select>

</div>


<div>
<label>Sound System</label>

<select
name="soundSystem"
value={formData.soundSystem}
onChange={handleChange}
>

<option value="">Select Sound</option>
<option value="Basic">Basic </option>
<option value="Premium">Premium </option>
<option value="Luxury">Luxury </option>

</select>

</div>


<div>
<label>LED Screen</label>

<select
name="ledScreen"
value={formData.ledScreen}
onChange={handleChange}
>

<option value="">Select LED</option>
<option value="Basic">Basic </option>
<option value="Premium">Premium </option>
<option value="Luxury">Luxury </option>

</select>

</div>

</>

)}


{/* Private Party Packages */}

{formData.functionType === "Private Party" && (

<>



{/* Birthday Only Packages */}

{formData.privatePartyType === "Birthday" && (

<>

<div>
<label>Cake Package</label>

<select
name="cakePackage"
value={formData.cakePackage}
onChange={handleChange}
>

<option value="">
Select Cake
</option>

<option value="1 Kg">
1 Kg
</option>

<option value="2 Kg">
2 Kg 
</option>

<option value="3 Kg">
3 Kg 
</option>

<option value="Custom Cake">
Custom Cake 
</option>

</select>

</div>


<div>
<label>Birthday Decoration</label>

<select
name="birthdayDecoration"
value={formData.birthdayDecoration}
onChange={handleChange}
>

<option value="">
Select Decoration
</option>

<option value="Basic">
Basic 
</option>

<option value="Premium">
Premium 
</option>

<option value="Luxury">
Luxury 
</option>

</select>

</div>

<div>
<label>Photography Package</label>

<select
name="photographyPackage"
value={formData.photographyPackage}
onChange={handleChange}
>

<option value="">
Select Photography
</option>

<option value="Basic">
Basic 
</option>

<option value="Premium">
Premium 
</option>

<option value="Luxury">
Luxury 
</option>

</select>

</div>

<div>
<label>Music & Entertainment</label>

<select
name="musicEntertainment"
value={formData.musicEntertainment}
onChange={handleChange}
>

<option value="">
Select Entertainment
</option>

<option value="DJ">
DJ 
</option>

<option value="Live Music">
Live Music 
</option>

<option value="Dance Performance">
Dance Performance 
</option>

<option value="DJ + Live Music">
DJ + Live Music 
</option>

</select>

</div>

</>

)}

</>

)}

{/* Anniversary Packages */}

{formData.privatePartyType === "Anniversary" && (

<>

<div>
<label>Anniversary Decoration</label>

<select
name="birthdayDecoration"
value={formData.birthdayDecoration}
onChange={handleChange}
>

<option value="">
Select Decoration
</option>

<option value="Basic">
Basic 
</option>

<option value="Premium">
Premium
</option>

<option value="Luxury">
Luxury 
</option>

</select>

</div>


<div>
<label>Photography Package</label>

<select
name="photographyPackage"
value={formData.photographyPackage}
onChange={handleChange}
>

<option value="">
Select Photography
</option>

<option value="Basic">
Basic
</option>

<option value="Premium">
Premium 
</option>

<option value="Luxury">
Luxury 
</option>

</select>

</div>


<div>
<label>Cake Package</label>

<select
name="cakePackage"
value={formData.cakePackage}
onChange={handleChange}
>

<option value="">
Select Cake
</option>

<option value="1 Kg">
1 Kg 
</option>

<option value="2 Kg">
2 Kg 
</option>

<option value="3 Kg">
3 Kg 
</option>

<option value="Custom Cake">
Custom Cake
</option>

</select></div>
</>
)}


</>


)}


          {/* Total Price */}

          <div>
            <label>Estimated Price</label>

            <input
              type="text"
              value={`₹ ${Number(formData.totalPrice || 0).toLocaleString()}`}
              readOnly
            />
          </div>
          
          {/* Payment Method */}

        </div>

        <div className="event-cancel-box">

 <label>Cancellation Policy</label>

<select
  name="cancellationPolicy"
  value={formData.cancellationPolicy}
  onChange={handleChange}
>
  <option value="">Select Policy</option>

  {policies.map((policy) => (
    <option key={policy._id} value={policy.title}>
      {policy.title}
    </option>
  ))}

</select>
  <p>
    Cancellation charges and refund policy will be based on the selected option.
  </p>
</div>

     <div className="event-btn-group">

  <button
    type="submit"
    className="event-submit-btn"
  >
    Submit Request
  </button>


</div>

    </form>

    </div>
  );
};

export default Form;