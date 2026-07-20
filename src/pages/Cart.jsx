import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    return (
      <div className="container mt-5">
        <h3>Your cart is empty.</h3>
      </div>
    );
  }

  const handleConfirm = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/requests",
        cart
      );

      alert("Request Submitted Successfully!");

      localStorage.removeItem("cart");

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="cart-container">

<h2 className="cart-title">Booking Summary</h2>

<div className="cart-item">
    <b>Venue</b>
    <span>{cart.venueName}</span>
</div>

<div className="cart-item">
    <b>Name</b>
    <span>{cart.fullName}</span>
</div>

<div className="cart-item">
    <b>Function</b>
    <span>{cart.functionType}</span>
</div>

<div className="cart-item">
    <b>Date</b>
    <span>{cart.functionDate}</span>
</div>

<div className="cart-item">
    <b>Guests</b>
    <span>{cart.guests}</span>
</div>

<div className="cart-item">
    <b>Rooms</b>
    <span>{cart.rooms}</span>
</div>

<div className="cart-price">
    Total : ₹{cart.totalPrice}
</div>

<div className="cart-btns">

<button
className="back-btn"
onClick={() => navigate(-1)}
>
Back
</button>

<button
className="confirm-btn"
onClick={handleConfirm}
>
Confirm Booking
</button>

</div>

</div>
  );
}

export default Cart;