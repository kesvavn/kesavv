import {useState} from "react";
import axios from "axios";
import "./AdminAuth.css";

function AdminRegister(){

const [data,setData]=useState({
    name:"",
    email:"",
    password:""
});


const handleSubmit = async(e)=>{

e.preventDefault();

try{

await axios.post(
"http://localhost:5000/api/admin/register",
data
);

alert("Admin Registered");

}catch(err){

alert(err.response?.data?.message || "Register failed");

}

}


return(

<div className="admin-login-container">

<div className="admin-login-box">

<h2>Admin Register</h2>


<form onSubmit={handleSubmit}>


<input
placeholder="Name"
value={data.name}
onChange={(e)=>
setData({
...data,
name:e.target.value
})
}
/>


<input
type="email"
placeholder="Email"
value={data.email}
onChange={(e)=>
setData({
...data,
email:e.target.value
})
}
/>


<input
type="password"
placeholder="Password"
value={data.password}
onChange={(e)=>
setData({
...data,
password:e.target.value
})
}
/>


<button 
className="admin-login-btn"
type="submit">

Create Admin

</button>


</form>


</div>

</div>

)

}

export default AdminRegister;