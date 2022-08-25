import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../nav/Nav'


import "./order.css"



function Order() {
    function delit(e) {
        axios.post("http://localhost:8000/orders/delete", { "name": e })
            .then((d) => {
                window.location.reload(false)
                console.log(d)
            })
            .catch(ep => console.log(e))
    }

    const fixEffect = useRef(true)
    const [datas, datasChanger] = useState()
    const loginSubmit = (e) => {

        e.preventDefault()

        axios.post("http://localhost:8000/orders/add", {
            "image": e.target[2].value,
            "quantity": e.target[4].value,
            "category": e.target[3].value,
            "price": e.target[5].value,
            "description": e.target[1].value,
            "name": e.target[0].value
        })
            .then(d => { alert("Order has been added"); console.log(d) })
            .catch(error => { alert("user Already exists"); console.log(error) })
    };

    useEffect(() => {
        if (fixEffect.current) {
            axios.get("http://localhost:8000/orders/getall")
                .then(d => {
                    // console.log(d.data.data)
                    let temp = d.data.data.map((m) => {
                        return (

                            <div className='adminCard'>
                                <p className='li'>Category : {
                                    m.category.substring(0, 21) + (m.category.length > 21 ? "..." : "")
                                }</p>
                                <p className='li'>Image : {m.image.substring(0, 21) + (m.image.length > 21 ? "..." : "")}</p>
                                <p className='li'>Name : {m.name.substring(0, 21) + (m.name.length > 21 ? "..." : "")}</p>
                                <button onClick={() => { delit(m.name) }} className='buttonToAdd buttonToAdd1 '>Delete</button>
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
                    <form style={{
                        width: "100%", height: "100%", display: "flex",
                        justifyContent: "space-around", flexDirection: "column"
                    }} onSubmit={(e) => loginSubmit(e)}>
                        <p className='li'>Name : <input style={{ background: "transparent", border: "2px solid #038FA0", borderRadius: "8px", outline: "none",color:"#04ADBF",textAlign:"center" }} required></input></p>
                        <p className='li'>Description : <input style={{ background: "transparent", border: "2px solid #038FA0", borderRadius: "8px", outline: "none",color:"#04ADBF",textAlign:"center" }} required></input></p>
                        <p className='li'>Image : <input style={{ background: "transparent", border: "2px solid #038FA0", borderRadius: "8px", outline: "none",color:"#04ADBF",textAlign:"center" }} required></input></p>
                        <p className='li'>Category : <input style={{ background: "transparent", border: "2px solid #038FA0", borderRadius: "8px", outline: "none",color:"#04ADBF",textAlign:"center" }} required></input></p>
                        <p className='li'>Quantity : <input style={{ background: "transparent", border: "2px solid #038FA0", borderRadius: "8px", outline: "none",color:"#04ADBF",textAlign:"center" }} required></input></p>
                        <p className='li'>Price : <input style={{ background: "transparent", border: "2px solid #038FA0", borderRadius: "8px", outline: "none",color:"#04ADBF",textAlign:"center" }} required></input></p>
                        <button style={{ marginTop: "-1vh", marginLeft: "4.5vw", color: "#04ADBF", border: "2px solid #04ADBF" }} className='buttonToAdd buttonToAdd1 '>Add</button>
                    </form>
                </div>
                {datas}
            </div>

        </div>
    )
}

export default Order