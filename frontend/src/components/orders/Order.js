import axios from 'axios'
import React, { useEffect } from 'react'
import Nav from '../nav/Nav'
import "./order.css"

function Order() {

    
    var url = new URL(window.location.href);
    
    var check=url.href.replace("http://localhost:3000/order?query=","")
    check=check.replace(/%20/g," ")
    
    
    let [name,price,category,image,description,quantity]=check.split("?")
    let a=check.split("$")
    
    let obj ={name:name.replace(/%/g," "),price,category,image,description:description.replace(/~/g," "),quantity} 
   
   
   

    const cartItem = (e) => {
   let temp=obj;
   temp.email=localStorage.getItem('email')
   
        axios.post("http://localhost:8000/cart/add",
            temp,
            {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }

        )
            .then(d => {

                // // window.location.reload()
                // console.log(useref.current)
                // useref.current = useref.current.filter((f) => JSON.parse(f.props.name).name !== data.name)
                // forceUpdate()
                
                alert("added")
            }


            )
            .catch(e => console.log(e))
    }
    const wishListItem = (e) => {
        let temp=obj;
        temp.email=localStorage.getItem('email')
        delete temp.quantity
        console.log(temp)
        axios.post("http://localhost:8000/wishlist/add",
        temp,
            {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }

        )
            .then(d => {

                // // window.location.reload()
                // console.log(useref.current)
                // useref.current = useref.current.filter((f) => JSON.parse(f.props.name).name !== data.name)
                // forceUpdate()
                console.log(d)
                alert("added")
            }


            )
            .catch(e => console.log(e))
    }

   
    function odder(obj){
        axios.post("http://localhost:8000/orders/add",obj)
        .then(d=>
            {
            let dis=window.prompt("Enter Coupon if any")
            if(dis.substring(0,5)==="naved"){
                alert("Order has been discounted")
            }
            else{
                alert("Wrong code order placed without discount")
            }
                
            
            // alert("ordered")
        }
        )
        .catch(e=>console.log(e))  
    }

    function rndom(min = 1, max = 100000) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return (
        <div div style={{ backgroundColor: "#052939", height: "auto", paddingTop: '1.5vh', paddingBottom: "4vh", minHeight: "100vh" }}>
            <Nav />
            <div key={rndom()} name={JSON.stringify(obj)} className="cars ">
                <div className="card card1" >
                    <div className="cardImg cardImg1" style={{
                        backgroundImage: `url(${obj.image})`, backgroundPosition: "center", backgroundSize: "cover"
                    }}>
                    </div>
                    {/* <p className="sp spName"></p>
                    <p className="sp spDescription"></p>
                    <p className="sp spPrice">Rs </p>
                    <p className="sp spQuantity">Quantity &nbsp;&nbsp;
                    </p> */}
                    <div className='orderContainer'>

                        <h1>{obj.name}</h1>
                        <p>{obj.description}</p>
                        <h1>Price Rs {obj.price}</h1>
                        <div className='orderButtons'>

                            <button name={JSON.stringify(obj)} className='oButton' onClick={(e) => {odder(obj)}}>Buy Now</button>
                            <button name={JSON.stringify(obj)} className='oButton' onClick={(e) => wishListItem(e)}>Wishlist</button>
                            <button name={JSON.stringify(obj)} className='oButton' onClick={(e) => cartItem(e)}>Add to Cart</button>


                        </div>

                    </div>

                </div>
            </div>

        </div>

    )
}

export default Order