import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../nav/Nav'




function Discount() {
    function delit(e){
        axios.post("http://localhost:8000/discount/delete",{"couponCode":e})
         .then((d)=>{
             window.location.reload(false)
            console.log(d)
         })
         .catch(ep=>console.log(e))
     }
     const loginSubmit = (e) => {

        e.preventDefault()  
       
        axios.post("http://localhost:8000/discount/add",{
          "minimumOrderValue":e.target[2].value,
          "discount":e.target[1].value,
          "category":e.target[3].value,
          "couponCode":e.target[0].value
        })
        .then(d=>{alert("dicount has been added");console.log(d)})
        .catch(error => {alert("discount Already exists");console.log(error)})
      };


    const fixEffect = useRef(true)
    const [datas,datasChanger]=useState()
    useEffect(() => {
        if (fixEffect.current) {
            axios.get("http://localhost:8000/discount/getall")
                .then(d => {
                    
                   let temp= d.data.map((m)=>
                    {
                        return(
                            
                            <div className='adminCard'>
                            <p className='li'>Category : {
                            m.category.substring(0,21)+ (m.category.length>21?"...":"")
                            }</p>
                            <p className='li'>Discount : {m.discount}</p>
                            <p className='li'>MinOrderValue : {m.minimumOrderValue}</p>
                            <p className='li'>CouponCode : {m.couponCode.substring(0,21)+ (m.couponCode.length>21?"...":"")}</p>
                            <button  onClick={()=>delit(m.couponCode)} className='buttonToAdd buttonToAdd1 '>Delete</button>
                            </div>   
                        )
                    })
                    datasChanger(temp)
                })
        }

        fixEffect.current = false
    }, [])

    return (
        <div div style={{ backgroundColor: "#052939", height: "auto", paddingTop: '1.5vh', paddingBottom: "4vh", minHeight: "100vh" }}>
            <Nav />

            <div className='adminCardHolder'>
            <div className='adminCard'>
                    <form style={{width:"100%", height:"100%",display:"flex",
                   justifyContent:"space-around",flexDirection:"column"
                }} onSubmit={(e)=>loginSubmit(e)}>
                    
                    <p className='li'>CouponCode : <input style={{background:"transparent",border:"2px solid #038FA0",borderRadius:"8px", outline:"none",color:"#04ADBF",textAlign:"center"}}  required></input></p>
                   
                    <p className='li'>Discount : <input style={{background:"transparent",border:"2px solid #038FA0",borderRadius:"8px", outline:"none",color:"#04ADBF",textAlign:"center"}}  required></input></p>
                    
                    <p className='li'>MinOrderValue : <input style={{background:"transparent",border:"2px solid #038FA0",borderRadius:"8px", outline:"none",color:"#04ADBF",textAlign:"center"}}  required></input></p>
                    
                    <p className='li'>Category : <input style={{background:"transparent",border:"2px solid #038FA0",borderRadius:"8px", outline:"none",color:"#04ADBF",textAlign:"center"}}  required></input></p>
                    
                    <button style={{marginTop:"-1vh", marginLeft:"4.5vw",color:"#04ADBF",textAlign:"center",border:"2px solid #04ADBF"}}  className='buttonToAdd buttonToAdd1 '>Add</button>
                    </form>
                </div>
                {datas}
            </div> 
            
        </div>
    )
}

export default Discount