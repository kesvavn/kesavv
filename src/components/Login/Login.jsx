import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Offcanvas, Button, Form, Image } from "react-bootstrap";
import {FaCheckCircle, FaTimesCircle, FaEnvelope, FaLock,} from "react-icons/fa";
import "./Login.css";
import Img from "../Login/MELODIA-LOGO-03-1.webp";

function Login({ showSidebar, setShowSidebar, redirectAfterLogin, onLogin,}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email Validation
  const isValidEmail =
    /^[a-zA-Z0-9._%+-]{5,}@gmail\.com$/.test(email);

  // Password Validation
  const isValidPassword = password.length >= 6;

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
    "http://localhost:5000/login",
   {
    email,
    password,
  }
);

localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

onLogin();

setShowSidebar(false);

if (redirectAfterLogin) {
  navigate(redirectAfterLogin);
}

  } catch (err) {
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
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className={
                    password
                      ? isValidPassword
                        ? "valid"
                        : "invalid"
                      : ""
                  }
                />

                {password &&
                  (isValidPassword ? (
                    <FaCheckCircle className="status-icon success" />
                  ) : (
                    <FaTimesCircle className="status-icon error" />
                  ))}
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
              )}
            </div>

            <div className="forgot-box mb-4">
              <a href="#">Forgot Password?</a>
            </div>

            <Button
              type="submit"
              className="login-btn w-100"
              disabled={
                !isValidEmail || !isValidPassword
              }
            >
              Login
            </Button>
          </Form>

          <div className="signup-box mt-4">
            <p>
              New User?
              <span> Create Account</span>
            </p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Login;