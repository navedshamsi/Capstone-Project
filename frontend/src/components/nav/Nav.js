import "./nav.css"
import React from 'react'
import { Link } from "react-router-dom"

function Nav() {
  return (
    <div className="nav">
    <h1 className="navTitle">UPStore</h1>  
    <div className="navFlex">
      <div className="navItems"></div>
      <div className="navItems"><Link to={"/"}>Home</Link></div>
     
      <div className="navItems"><Link to={"/wish"}>Wishlist</Link></div>
      
      <div className="navItems"><Link to={"/Cart"}>Cart</Link></div>
     {localStorage.getItem('email')==="admin@gmail.com"?<div className="navItems"><Link to={"/admin"}>Admin</Link></div>:""}
     {localStorage.getItem('token')===""?<div className="navItems"><Link to={"/Login"}>Login</Link></div>:
      <div 
      onClick={()=>localStorage.setItem('token',"")}
      className="navItems"><Link to={"/Login"}>Logout</Link></div>
      }
    </div>
    </div>
  )
}

export default Nav