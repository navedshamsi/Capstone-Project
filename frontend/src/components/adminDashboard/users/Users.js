import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../nav/Nav'


import "./users.css"



function Users() {


    function delit(e){
       axios.post("http://localhost:8000/user/delete",{"email":e})
        .then((d)=>{
            window.location.reload(false)
        })
       
    }
    const loginSubmit = (e) => {

        e.preventDefault()  
       
        axios.post("http://localhost:8000/user/register",{
          "password":e.target[2].value,
            "email": e.target[1].value,
            "name":e.target[0].value
        })
        .then(d=>{alert("user created you can now login");console.log(d)})
        .catch(error => {alert("user Already exists");console.log(error)})
      };

    const fixEffect = useRef(true)
    const [data,dataChanger]=useState()
    useEffect(() => {
        if (fixEffect.current) {
            axios.get("http://localhost:8000/user/getall")
                .then(d => {
                    console.log(d)
                   let temp= d.data.map((m)=>
                    {
                        return(
                            
                            <div className='adminCard'>
                            <p className='li'>Name : {
                            
                            m.name.substring(0,21)+ (m.name.length>21?"...":"")
                            
                            }</p>
                            <p className='li'>Email : {m.email.substring(0,21)+ (m.email.length>21?"...":"")}</p>
                            <p className='li'>Password : {m.password.substring(0,21)+ (m.password.length>21?"...":"")}</p>
                            
                            <button name={m.email} onClick={(e)=>{delit(e.target.name)} } className='buttonToAdd buttonToAdd1 '>Delete</button>
                            </div>   
                        )
                    })
                    dataChanger(temp)
                })
        }

        fixEffect.current = false
    }, [])

    return (
        <div div style={{ backgroundColor: "#052939", height: "auto", paddingTop: '1.5vh', paddingBottom: "4vh", minHeight: "100vh" }}>
            <Nav />

            <div className='adminCardHolder'>
                {/* <div className='adminCard'><h1>users</h1></div>
                <div className='adminCard'><h1>products</h1></div>
                <div className='adminCard'><h1>Orders</h1></div>
                <div className='adminCard'><h1>Orders</h1></div> */}
                <div className='adminCard'>
                    <form style={{width:"100%", height:"100%",display:"flex",
                   justifyContent:"space-around",flexDirection:"column"
                }} onSubmit={(e)=>loginSubmit(e)}>
                    <p className='li'>Name : <input required style={{background:"transparent",border:"2px solid #038FA0",borderRadius:"8px", outline:"none",color:"#04ADBF",textAlign:"center"}} ></input></p>
                    <p className='li'>Email : <input required style={{background:"transparent",border:"2px solid #038FA0",borderRadius:"8px", outline:"none",color:"#04ADBF",textAlign:"center"}} ></input></p>
                    <p className='li'>Password : <input required style={{background:"transparent",border:"2px solid #038FA0",borderRadius:"8px", outline:"none",color:"#04ADBF",textAlign:"center"}} ></input></p>
                    <button style={{marginLeft:"4.5vw",color:"#04ADBF",border:"2px solid #04ADBF"}}  className='buttonToAdd buttonToAdd1 '>Add</button>
                    </form>
                </div>
                {data}
            </div> 
 
                
                
                
 
            
        </div>
    )
}

export default Users