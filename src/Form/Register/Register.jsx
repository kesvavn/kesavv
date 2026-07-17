import { useState } from "react";
import axios from "axios";
import "./Register.css";
import Login from "../../components/Login/Login";

function Register() {

  const [showLogin, setShowLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert("Register Successfully");

      setName("");
      setEmail("");
      setPassword("");

      setShowLogin(true);

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Register Failed"
      );

    }

  };


  return (
    <>

    {
      showLogin ? (
        <Login />
      ) : (

      <form onSubmit={handleRegister}>

        <input
          className="register-input"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />


        <input
          className="register-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          className="register-input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        <button
          className="register-btn"
          type="submit"
        >
          Register
        </button>


        <button
          type="button"
          className="login-btn"
          onClick={()=>setShowLogin(true)}
        >
          Login
        </button>


      </form>

      )

    }

    </>
  );

}

export default Register;