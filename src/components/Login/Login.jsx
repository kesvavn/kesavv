import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Img from "../Login/MELODIA-LOGO-03-1.webp";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Offcanvas, Button, Form, Image } from "react-bootstrap";
import {FaCheckCircle, FaTimesCircle, FaEnvelope, FaLock,} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";


function Login({ showSidebar, setShowSidebar, redirectAfterLogin, onLogin,}) {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Email Validation
const isValidEmail =/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // Password Validation
  const isValidPassword = password.length >= 6;
 const handleLogin = async (e) => {

e.preventDefault();

try {

const res = await axios.post(
  "http://localhost:5000/api/auth/login",
  {
    email: email.trim().toLowerCase(),
    password
  }
);


localStorage.setItem(
 "token",
 res.data.token
);

localStorage.setItem(
 "user",
 JSON.stringify(res.data.user)
);


alert("Login Successfully");


if(onLogin){
  console.log("onLogin called");
  onLogin();
}


setShowSidebar(false);


}
catch(err){

alert(
 err.response?.data?.message || "Login Failed"
);

}

};
  return (
    <>
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="start"
        className="login-sidebar"
      >
        <Offcanvas.Header closeButton>
  <Offcanvas.Title>
    <Image
      src={Img}
      alt="Melodia Logo"
      className="loginlogo"
      fluid
    />
  </Offcanvas.Title>
</Offcanvas.Header>

        <Offcanvas.Body>
          <div className="login-top">
            <p className="para-logo">
              Melodia® Event Management is an ISO 9001:2015
              Certified Company based in Kochi, Thrissur,
              Kerala.
            </p>

            <h2>Login Account</h2>

            <p>Access your wedding & event dashboard.</p>
          </div>

          <Form onSubmit={handleLogin}>
            {/* EMAIL */}

            <div className="input-box mb-4">
              <label>Email Address</label>

              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />

                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className={
                    email
                      ? isValidEmail
                        ? "valid"
                        : "invalid"
                      : ""
                  }
                />

                {email &&
                  (isValidEmail ? (
                    <FaCheckCircle className="status-icon success" />
                  ) : (
                    <FaTimesCircle className="status-icon error" />
                  ))}
              </div>

              {email && (
                <small
                  className={
                    isValidEmail
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {isValidEmail
                    ? "Correct Gmail Address"
                    : "Enter valid Gmail Address"}
                </small>
              )}
            </div>

            {/* PASSWORD */}

          <div className="input-box mb-4">
  <label>Password</label>

  <div className="input-wrapper">
    <FaLock className="input-icon" />

    <Form.Control
      type={showPassword ? "text" : "password"}
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className={
        password
          ? isValidPassword
            ? "valid"
            : "invalid"
          : ""
      }
    />

    {/* Eye Icon */}
    <span
      className="eye-icon"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>

  {password && (
    <small
      className={
        isValidPassword
          ? "text-success"
          : "text-danger"
      }
    >
      {isValidPassword
        ? "Strong Password"
        : "Minimum 6 characters required"}
    </small>
  )}</div>

<Button
type="submit"
className="login-btn w-100"
>
Login
</Button>


<div className="signup-text">
  Don't have an account? 
  <span
    onClick={() => {
      setShowSidebar(false);
      navigate("/register");
    }}
  >
    Register
  </span>
</div>
</Form>

</Offcanvas.Body>
</Offcanvas>

</>
);
}

export default Login;