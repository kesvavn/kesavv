import React, { useState } from "react";
import "./Form.css";

const Form = () => { 
 const [formData, setFormData] = useState({ 

  fullName: "",
  phone: "",
  email: "",
  functionDate: "",
  guests: "",
  rooms: "",
  functionType: "",
  functionTime: "",

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
  paymentMethod: "",
  cancellationPolicy: "",

  totalPrice: 0,
});



  const handleChange = (e) => {
  const {name,value}=e.target;

if(name==="additionalPackage" && value==="No"){

setFormData({
...formData,
additionalPackage:"No",
makeupLevel:"",
foodType:"",
foodCategory:"",
decorationLevel:"",
});

return;

}

setFormData({...formData,[name]:value});};

// Price Calculation
const calculatePrice = () => {

  let price = 0;

  // Venue Cost
  price += Number(formData.guests || 0) * 500;


  // Room Cost
  price += Number(formData.rooms || 0) * 2500;


  // =========================
  // Wedding Packages
  // =========================

  // Makeup
  if (formData.makeupLevel === "Basic") price += 5000;
  if (formData.makeupLevel === "Premium") price += 15000;
  if (formData.makeupLevel === "Luxury") price += 30000;


  // Decoration
  if (formData.decorationLevel === "Basic") price += 10000;
  if (formData.decorationLevel === "Premium") price += 30000;
  if (formData.decorationLevel === "Luxury") price += 50000;


  // Photography
  if (formData.photographyPackage === "Basic") price += 20000;
  if (formData.photographyPackage === "Premium") price += 50000;
  if (formData.photographyPackage === "Luxury") price += 100000;

// Video Package

if (formData.videoPackage === "Basic")
price += 30000;

if (formData.videoPackage === "Premium")
price += 60000;

if (formData.videoPackage === "Luxury")
price += 100000;


  // =========================
  // Catering
  // =========================

  const guests = Number(formData.guests || 0);

  if (
    formData.foodCategory === "Veg" ||
    formData.foodType === "Veg"
  ) {
    price += guests * 300;
  }


  if (
    formData.foodCategory === "Non Veg" ||
    formData.foodType === "Non Veg"
  ) {
    price += guests * 500;
  }



  // =========================
  // Corporate Event
  // =========================

  // Stage Setup
  if (formData.stageSetup === "Basic") price += 15000;
  if (formData.stageSetup === "Premium") price += 30000;
  if (formData.stageSetup === "Luxury") price += 50000;


  // Sound System
  if (formData.soundSystem === "Basic") price += 10000;
  if (formData.soundSystem === "Premium") price += 20000;
  if (formData.soundSystem === "Luxury") price += 35000;


  // LED Screen
  if (formData.ledScreen === "Basic") price += 15000;
  if (formData.ledScreen === "Premium") price += 30000;
  if (formData.ledScreen === "Luxury") price += 50000;



  // =========================
  // Birthday / Private Party
  // =========================

  if (formData.cakePackage === "1 Kg") price += 1500;
  if (formData.cakePackage === "2 Kg") price += 3000;
  if (formData.cakePackage === "3 Kg") price += 4500;
  if (formData.cakePackage === "Custom Cake") price += 8000;

  // Music & Entertainment

if (formData.musicEntertainment === "DJ") 
price += 15000;

if (formData.musicEntertainment === "Live Music") 
price += 30000;

if (formData.musicEntertainment === "Dance Performance") 
price += 25000;

if (formData.musicEntertainment === "DJ + Live Music") 
price += 50000;


// Birthday Decoration

if(formData.birthdayDecoration === "Basic")
price += 10000;

if(formData.birthdayDecoration === "Premium")
price += 25000;

if(formData.birthdayDecoration === "Luxury")
price += 50000;

  // Final Price Update
  setFormData(prev => ({
    ...prev,
    totalPrice: price
  }));

};
   
const handleSubmit = (e)=>{

e.preventDefault();

calculatePrice();

console.log(formData);

alert("Pricing Request Submitted Successfully!");

};

  return (
    <div className="event-form-container">
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
              onChange={handleChange}
            />
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
            <label>Rooms</label>

            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              placeholder="Number of Rooms"
              onChange={handleChange}
            />
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
<option value="Basic">Basic - ₹5000</option>
<option value="Premium">Premium - ₹15000</option>
<option value="Luxury">Luxury - ₹30000</option>

</select>

</div>



<div>
<label>Decoration Level</label>

<select name="decorationLevel" value={formData.decorationLevel}onChange={handleChange}>

<option value="">Select Decoration</option>
<option value="Basic">Basic - ₹10000</option>
<option value="Premium">Premium - ₹30000</option>
<option value="Luxury">Luxury - ₹50000</option>
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
<option value="Basic">Basic - ₹20000</option>
<option value="Premium">Premium - ₹50000</option>
<option value="Luxury">Luxury - ₹100000</option>

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
Basic - ₹30000
</option>

<option value="Premium">
Premium - ₹60000
</option>

<option value="Luxury">
Luxury - ₹100000
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
<option value="Basic">Basic - ₹15000</option>
<option value="Premium">Premium - ₹30000</option>
<option value="Luxury">Luxury - ₹50000</option>

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
<option value="Basic">Basic - ₹10000</option>
<option value="Premium">Premium - ₹20000</option>
<option value="Luxury">Luxury - ₹35000</option>

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
<option value="Basic">Basic - ₹15000</option>
<option value="Premium">Premium - ₹30000</option>
<option value="Luxury">Luxury - ₹50000</option>

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
1 Kg - ₹1500
</option>

<option value="2 Kg">
2 Kg - ₹3000
</option>

<option value="3 Kg">
3 Kg - ₹4500
</option>

<option value="Custom Cake">
Custom Cake - ₹8000
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
Basic - ₹10000
</option>

<option value="Premium">
Premium - ₹25000
</option>

<option value="Luxury">
Luxury - ₹50000
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
Basic - ₹20000
</option>

<option value="Premium">
Premium - ₹50000
</option>

<option value="Luxury">
Luxury - ₹100000
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
DJ - ₹15000
</option>

<option value="Live Music">
Live Music - ₹30000
</option>

<option value="Dance Performance">
Dance Performance - ₹25000
</option>

<option value="DJ + Live Music">
DJ + Live Music - ₹50000
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
Basic - ₹15000
</option>

<option value="Premium">
Premium - ₹30000
</option>

<option value="Luxury">
Luxury - ₹60000
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
Basic - ₹20000
</option>

<option value="Premium">
Premium - ₹50000
</option>

<option value="Luxury">
Luxury - ₹100000
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
1 Kg - ₹1500
</option>

<option value="2 Kg">
2 Kg - ₹3000
</option>

<option value="3 Kg">
3 Kg - ₹4500
</option>

<option value="Custom Cake">
Custom Cake - ₹8000
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
              value={`₹ ${formData.totalPrice.toLocaleString()}`}
              readOnly
            />
          </div>
          
          {/* Payment Method */}

<div className="event-payment-box">
  <label>Payment Method</label>

  <select
    name="paymentMethod"
    value={formData.paymentMethod}
    onChange={handleChange}
  >
    <option value="">Select Payment Method</option>
    <option value="Cash">Cash</option>
    <option value="UPI">UPI</option>
    <option value="Credit Card">Credit Card</option>
    <option value="Debit Card">Debit Card</option>
    <option value="Net Banking">Net Banking</option>
  </select>

  {formData.paymentMethod === "Cash" && (
    <p className="payment-info">
      💵 Pay the amount directly at the venue on the event day.
    </p>
  )}

  {formData.paymentMethod === "UPI" && (
    <div className="payment-info">
      <p>
        📱 UPI ID: <strong>melodiaevents@upi</strong>
      </p>
      <p>Complete the payment after booking confirmation.</p>
    </div>
  )}

  {(formData.paymentMethod === "Credit Card" ||
    formData.paymentMethod === "Debit Card" ||
    formData.paymentMethod === "Net Banking") && (
    <p className="payment-info">
      💳 Online payment will be available after booking confirmation.
    </p>
  )}
</div>

        </div>

        {/* Cancellation */}

        <div className="event-cancel-box">
          <label>Cancellation Policy</label>

          <select
            name="cancellationPolicy"
            value={formData.cancellationPolicy}
            onChange={handleChange}
          >
            <option value="">Select Policy</option>
            <option>50% Refund Before 30 Days</option>
            <option>25% Refund Before 15 Days</option>
            <option>No Refund</option>
          </select>

          <p>
            Cancellation charges and refund policy will be based on the
            selected option.
          </p>
        </div>

       <div className="event-btn-group">
  <button
    type="button"
    className="event-price-btn"
    onClick={calculatePrice}>
    Check Availability & Prices
  </button>

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