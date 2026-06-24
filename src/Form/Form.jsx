
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
    makeupLevel: "",
    foodType: "",
    foodCategory: "",
    decorationLevel: "",
    cancellationPolicy: "",
    totalPrice: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculatePrice = () => {
    let price = Number(formData.guests || 0) * 500;

    if (formData.makeupLevel === "Basic") price += 5000;
    if (formData.makeupLevel === "Premium") price += 15000;
    if (formData.makeupLevel === "Luxury") price += 30000;

    if (formData.decorationLevel === "Basic") price += 10000;
    if (formData.decorationLevel === "Premium") price += 30000;
    if (formData.decorationLevel === "Luxury") price += 50000;

    setFormData({
      ...formData,
      totalPrice: price,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="event-pricing-form">
      <div className="event-form-header">
        <h6>MELODIA EVENT MANAGEMENT</h6>
        <h1>Request Pricing</h1>

        <p>
          Fill this form and we will contact you shortly.
          All information provided will be treated confidentially.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="event-form-grid">

          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Function Date</label>
            <input
              type="date"
              name="functionDate"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Number of Guests</label>
            <input
              type="number"
              name="guests"
              placeholder="Guests"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Number of Rooms</label>
            <input
              type="number"
              name="rooms"
              placeholder="Rooms"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Function Type</label>

            <div className="event-radio-group">
              <label>
                <input
                  type="radio"
                  name="functionType"
                  value="Wedding"
                  onChange={handleChange}
                />
                Wedding
              </label>

              <label>
                <input
                  type="radio"
                  name="functionType"
                  value="Other Events"
                  onChange={handleChange}
                />
                Other Events
              </label>
            </div>
          </div>

          <div>
            <label>Function Time</label>

            <div className="event-radio-group">
              <label>
                <input
                  type="radio"
                  name="functionTime"
                  value="Day"
                  onChange={handleChange}
                />
                Day
              </label>

              <label>
                <input
                  type="radio"
                  name="functionTime"
                  value="Evening"
                  onChange={handleChange}
                />
                Evening
              </label>
            </div>
          </div>

          <div>
            <label>Make Up Level</label>

            <select
              name="makeupLevel"
              onChange={handleChange}
            >
              <option>Select Make Up Level</option>
              <option>Basic</option>
              <option>Premium</option>
              <option>Luxury</option>
            </select>
          </div>

          <div>
            <label>Food</label>

            <select
              name="foodType"
              onChange={handleChange}
            >
              <option>Select Food Type</option>
              <option>South Indian</option>
              <option>North Indian</option>
              <option>Chinese</option>
            </select>

            <div className="event-radio-group event-mt">
              <label>
                <input
                  type="radio"
                  name="foodCategory"
                  value="Veg"
                  onChange={handleChange}
                />
                Veg
              </label>

              <label>
                <input
                  type="radio"
                  name="foodCategory"
                  value="Non Veg"
                  onChange={handleChange}
                />
                Non Veg
              </label>
            </div>
          </div>

          <div>
            <label>Decoration Level</label>

            <select
              name="decorationLevel"
              onChange={handleChange}
            >
              <option>Select Decoration Level</option>
              <option>Basic</option>
              <option>Premium</option>
              <option>Luxury</option>
            </select>
          </div>

          <div>
            <label>Total Price (Estimated)</label>

            <input
              type="text"
              value={`₹ ${formData.totalPrice}`}
              readOnly
            />
          </div>
        </div>

        <div className="event-cancel-box">
          <label>Cancellation Policy</label>

          <select
            name="cancellationPolicy"
            onChange={handleChange}
          >
            <option>Select Cancellation Policy</option>
            <option>50% Refund Before 30 Days</option>
            <option>25% Refund Before 15 Days</option>
            <option>No Refund</option>
          </select>

          <p>
            Cancellation charges and refund policy
            will be based on selected option.
          </p>
        </div>

        <button
          type="button"
          className="event-price-btn"
          onClick={calculatePrice}
        >
          Check Availability & Prices
        </button>
      </form>
    </div>
  );
};

export default Form;

