import React, { useState } from 'react'
import "./login.css"
import "axios"
import axios from 'axios';
function Login() {
  
const [ls,changeLs]=useState("logi");

  const loginSubmit = (e) => {

    e.preventDefault()  

    
    axios.post("http://localhost:8000/user/login",{
    "password":e.target[1].value,
      "email": e.target[0].value
  })
    .then(d=>{
      localStorage.setItem('token',d.data.token);
      localStorage.setItem('email',e.target[0].value);
      // console.log(localStorage.getItem('email'))
      // console.log(localStorage.getItem('token'))
      window.location.href = 'http://localhost:3000/'
    })
    .catch(error => {alert("invalid credentials");console.log(error)})
  };

  const signupSubmit = (e) => {

    e.preventDefault()  
   console.log({
    "password":e.target[2].value,
      "email": e.target[0].value,
      "name":e.target[1].value
  })
    axios.post("http://localhost:8000/user/register",{
      "password":e.target[2].value,
        "email": e.target[0].value,
        "name":e.target[1].value
    })
    .then(d=>{alert("user created you can now login");console.log(d)})
    .catch(error => {alert("user Already exists");console.log(error)})
  };

  return (

    <div className="loginPage">
      <div className="loginimgCover">
        {/* <p> Nykaa</p>
        <p>Shopping</p>
        <p>App</p> */}
      </div>
      <div className="loginContainer">
        <div className='loginsignup'> 
        <div className={ls==='login'?"login":"loginActive"}onClick={()=>changeLs("login")} ><h1>LOGIN</h1></div>
        <div className={ls!=='login'?"signup":"signupActive"}onClick={()=>changeLs("signup")}><h1>SIGNUP</h1></div>

        </div>
        
        <div className="loginimg">

        </div>
        
        {ls==="login"?<form onSubmit={(e)=>loginSubmit(e)}  >
          <input type="text" required placeholder="Enter EmailId" className="name" />
          <input required type="text" className="pass" placeholder="PASSWORD" />
          <button type="submit">LOGIN</button>

        </form>:<form onSubmit={(e)=>signupSubmit(e)}  >
          <input type="text" required placeholder="Enter EmailId" className="name" />
          <input required type="text" className="pass" placeholder="NAME" />
          <input required type="text" className="pass" placeholder="PASSWORD" />
          <button type="submit">SignUp</button>
        </form>}
      </div>

    </div>
  )

}

export default Login