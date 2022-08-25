import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Nav from '../nav/Nav'
import "./wish.css"

function Wish() {
    const headers = useRef({
        headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }

    })


    const fixEffect = useRef(true)
    const [fetchedData, updateFetchedData] = useState()

    
    const delCartItem = (e) => {
        let data = JSON.parse(e.target.name)
        axios.delete("http://localhost:8000/wishlist/delete", {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('token')}`,
                "data": JSON.stringify({ "email": data.email, "name": data.name })
            }
        })
            .then(d => {
                window.location.reload(false);
                // console.log(fetchedData)
                // let temp=fetchedData.filter((f) => JSON.parse(f.props.name).name !== data.name)
                // updateFetchedData(temp)
            }
        )
            .catch(e => console.log(e))
    }

    const quantityChange = (e) => {
        // let data = JSON.parse(e.target.name)
        // data.quantity=e.target.value
        console.log(e.target.value)
        // axios.put("http://localhost:8000/cart/update", {
        //     headers: {
        //         "authorization": `Bearer ${localStorage.getItem('token')}`,
        //         "data": JSON.stringify({ "email": data.email, "name": data.name })
        //     }

        // })
        //     .then(d => {

        //         // window.location.reload()
        //         console.log(useref.current)
        //         useref.current = useref.current.filter((f) => JSON.parse(f.props.name).name !== data.name)
        //         forceUpdate()

        //     })
    }



    function rndom(min = 1, max = 100000) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    useEffect (() => {
        if (fixEffect.current) {
            axios.post("http://localhost:8000/wishlist/getall",
                { "email": localStorage.getItem('email') }, headers.current)
                .then(d => {
                    // updateFetchedData(() =>

                    let temp = d.data.map((obj) => {
                        return (
                            <div key={rndom()} name={JSON.stringify(obj)} className="cars cars1">
                                <div className="card card1" >
                                    <div className="cardImg cardImg1" style={{
                                        backgroundImage: `url(${obj.image})`, backgroundPosition: "center", backgroundSize: "cover"
                                    }}>
                                    </div>
                                    <p className="sp spName">{obj.name.substring(0,30)+"..."}</p>
                                    <p className="sp spDescription">{obj.description.substring(0,200)+"..."}</p>
                                    <p className="sp spPrice">Rs {obj.price}</p>
                                    
                                    <button name={JSON.stringify(obj)} className='buttonToAdd' onClick={(e) => delCartItem(e)}>Delete</button>
                                </div>
                            </div>
                        )

                    })

                    updateFetchedData(temp)
                    setTimeout(()=>{
                        console.log(fetchedData)  
                    },1000)
                })
                .catch(e=>console.log(e))
        }

          fixEffect.current = false
        // // return () => { ;console.log(updateFetchedData((m)=>{console.log(m)})) }
        // if(!useref)console.log("bye")
       
        
    },[])
    // setTimeout(() => {fetchTheData();console.log("!")},1000)
    return (
        <div div style={{ backgroundColor: "#052939", height: "auto", paddingTop: '1.5vh', paddingBottom: "4vh", minHeight: "94.5vh" }}>
            <Nav />
            {fetchedData}
            
        </div>
    )
}

export default Wish