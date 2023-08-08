import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./login.css";
export default function Login(props) {
    const [credentials,setcredentails] = useState({email:" ",Password:""})
    let navigate = useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST", 
            headers:{
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,Password: credentials.Password}),
        });
        const json  = await response.json();
        console.log(json);

        if(json.success){
            //save the authtoken and redirect

            localStorage.setItem('token',json.authtoken);
            
            props.showAlert("Logged in successfully","success");
            navigate("/TakeNote");
        }else{
            props.showAlert("Invalid","danger");
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
                <h1>Login</h1>
                {/* <div className="social-container thisclass">
                    <a href="/" className="social"><i className="faf fa fa-facebook "></i></a>
                    <a href="/" className="social"><i className="fab fa fa-twitter fa-2x"></i></a>
                </div> */}
                <input type="email" className="form-control my-4" value={credentials.email} id="email" onChange={onchange} name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                <input type="Password" className="form-control my-5" value={credentials.Password} id="Password" onChange={onchange} name="Password" placeholder="Password"/>
                <button type="submit"className='sub'>Submit</button>
            </form>
           
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-right myclass">
                    <h1>News App</h1>
                    <p>For taking the short notes of the latest news please login.</p>
                </div>
            </div>
        </div>
     </div>
    </div>
    </div>
  );
  
}