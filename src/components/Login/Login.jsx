import { useState } from "react";

import {
  Offcanvas,
  Button,
  Form,
} from "react-bootstrap";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

import "./Login.css";

function Login({ showSidebar, setShowSidebar }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ EMAIL VALIDATION
  const isValidEmail =
    /^[a-zA-Z0-9._%+-]{5,}@gmail\.com$/.test(email);

  // ✅ PASSWORD VALIDATION
  const isValidPassword =
    password.length >= 6;

  // ✅ LOGIN FUNCTION
  const handleLogin = (e) => {

    e.preventDefault();

    if (isValidEmail && isValidPassword) {

      alert("Successfully Logged In ✅");

      // sidebar close
      setShowSidebar(false);

      // clear fields
      setEmail("");
      setPassword("");

    } else {

      alert("Please enter valid details ❌");

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

        {/* HEADER */}
        <Offcanvas.Header closeButton>

          <Offcanvas.Title>
            Welcome Back 
          </Offcanvas.Title>

        </Offcanvas.Header>

        {/* BODY */}
        <Offcanvas.Body>

          <div className="login-top">

            <h2>
              Login Account
            </h2>

            <p>
              Access your wedding & event dashboard.
            </p>

          </div>

          <Form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="input-box position-relative mb-4">

              <label>
                Email Address
              </label>

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

                {/* STATUS ICON */}
                {email && (
                  isValidEmail ? (
                    <FaCheckCircle className="status-icon success" />
                  ) : (
                    <FaTimesCircle className="status-icon error" />
                  )
                )}

              </div>

              {/* MESSAGE */}
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
                    : "Enter minimum 5 letters + @gmail.com"}
                </small>
              )}

            </div>

            {/* PASSWORD */}
            <div className="input-box position-relative mb-3">

              <label>
                Password
              </label>

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

                {/* STATUS ICON */}
                {password && (
                  isValidPassword ? (
                    <FaCheckCircle className="status-icon success" />
                  ) : (
                    <FaTimesCircle className="status-icon error" />
                  )
                )}

              </div>

              {/* MESSAGE */}
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

            {/* FORGOT PASSWORD */}
            <div className="forgot-box mb-4">

              <a href="#">
                Forgot Password?
              </a>

            </div>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              className="login-btn w-100 mb-3"
            >
              Login
            </Button>

            {/* GOOGLE BUTTON */}
            <Button className="google-btn w-100">

              <FaGoogle className="me-2" />

              Continue with Google

            </Button>

          </Form>

          {/* SIGNUP */}
          <div className="signup-box mt-4">

            <p>

              New User?

              <span>
                {" "}Create Account
              </span>

            </p>

          </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Login;