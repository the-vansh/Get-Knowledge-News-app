import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./signup.css";
export default function Signup(props) {
  const [credentials,setcredentails] = useState({name:"",email:" ",Password:"",cPassword:""})
  let navigate = useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault();
   const  {name,email,Password}=credentials;
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
       
        method: "POST", 
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,Password}),
    });
    const json  = await response.json();
    console.log(json);
        //save the authtoken and redirect
    if(json.success){
          localStorage.setItem('token',json.authtoken);
          navigate("/");
          props.showAlert("Account created successfully","success");
    }else{
        props.showAlert("Invalid credentials","danger");
   }
}

const onchange = (e)=>{
    setcredentails({...credentials,[e.target.name]: e.target.value});
}
  return (
    
       <div>
       <div className='login'>
       <div className="containers" id="container">
        <div className="form-container log-in-container myclass">
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>
                {/* <div className="social-container thisclass">
                    <a href="/" className="social"><i className="faf fa fa-facebook "></i></a>
                    <a href="/" className="social"><i className="fab fa fa-twitter fa-2x"></i></a>
                </div> */}
                
                 <label htmlhtmlFor="name"></label>
                 <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onchange} placeholder="Enter Name"/>
                 <label htmlhtmlFor="email"></label>
                 <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} placeholder="Enter email"/>

                 <label htmlhtmlFor="Password"></label>
                 <input type="password" className="form-control" id="Password" name="Password" onChange={onchange} placeholder="Password" minLength={5} required />
                 <button type="submit"className='sub'>Submit</button>
            </form>
           
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-right myclass">
                    <h1>News App</h1>
                    <p>If you are a new to the app first plase create your account.</p>
                </div>
            </div>
        </div>
     </div>
    </div>
    </div>
  )
}



        

         


          