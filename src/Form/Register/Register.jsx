import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Login from "../../components/Login/Login";

function Register() {

const [showLogin, setShowLogin] = useState(false);
const navigate = useNavigate();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showSidebar, setShowSidebar] = useState(true);
const [passwordError, setPasswordError] = useState("");


const handleRegister = async (e) => {

e.preventDefault();


if(password.length < 6){

setPasswordError("Password must be minimum 6 characters");

return;

}


try {

const res = await axios.post(
"http://localhost:5000/api/auth/register",
{
name,
email,
password
}
);

alert("Register Successfully");

navigate("/venues");

}

catch(error){

console.log(error.response?.data);

alert(
error.response?.data?.message ||
"Registration Failed"
);

}

};


return (

<>
{
!showLogin ?

(

<form 
className="register-form"
onSubmit={handleRegister}
>

<input
className="register-input"
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>


<input
className="register-input"
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<input
className="register-input"
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
{
passwordError && (
<small className="text-danger">
{passwordError}
</small>
)
}

<button
className="register-btn"
type="submit"
disabled={password.length < 6}
>
Register
</button>


</form>

)

:
(
<Login 
showSidebar={true}
setShowSidebar={setShowSidebar}
/>
)

}

</>

);

}

export default Register;