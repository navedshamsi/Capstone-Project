import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Papa from "papaparse";
import { Link } from 'react-router-dom'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import Nav from '../nav/Nav'

import "./admin.css"

function AdminDash() {
    // BarChart.defaults.color = "#ff0000";
    const data = [
        {
            name: "User",

            count: 2,

        },
        {
            name: "Products",

            count: 1,

        },
        {
            name: "Orders",

            count: 9,

        },
        {
            name: "Discounts",

            count: 3,

        }
    ];
    function handleFileChange(e) {
        let t = e.target.files[0]
        
        var formData = new FormData();
        formData.append('csvupload',t);
       
        axios.post('http://localhost:8000/products/c', formData)
        .then(d=>console.log(d))
        // .catch(e=>console.log(e))
         // for(var pair of formData.entries()) {
        //     console.log(pair[0]+', '+pair[1]);
        //   }
    }
    const fixEffect = useRef(true)
    // const dateFormatter = (item) => moment(item).format("MMM YY");
    const [lengths, changeLengst] = useState({ "products": "" })
    useEffect(() => {
        if (fixEffect.current) {
            (async () => {
                let temp = {}



                await axios.get("http://localhost:8000/products/getall")
                    .then(d => {

                        temp.products = d.data.data.length

                        // ok.current = temp
                        // console.log(ok.current)
                    })


                await axios.get("http://localhost:8000/user/getall")
                    .then(d => {
                        temp.user = d.data.length

                    })


                await axios.get("http://localhost:8000/discount/getall")
                    .then(d => {
                        temp.discount = d.data.length

                    })


                await axios.get("http://localhost:8000/orders/getall")
                    .then(d => {

                        temp.order = d.data.data.length
                    })

                changeLengst(temp)
            })();
        }

        fixEffect.current = false
    }, [])
    return (
        <div div style={{ backgroundColor: "#052939", height: "auto", paddingTop: '1.5vh', paddingBottom: "4vh", minHeight: "100vh" }}>
            <Nav />

            <div className='adminCardHolder'>
                <div className='adminCard'>
                    <h1 className='li'><Link to="/users">Users : {lengths.user}</Link></h1>

                </div>

                <div className='adminCard'><h1 className='li'><Link to="/products">Products : {lengths.products}</Link></h1></div>

                <div className='adminCard'><h1 className='li'><Link to="/orders">Orders : {lengths.order}</Link></h1></div>

                <div className='adminCard'>
                    <h1 className='li'><Link to="/discount">Discounts : {lengths.discount}</Link></h1></div>

                <div className="kokoko" style={{
                    width: "93vw", height: "40vh", background: "#031923", boxShadow: "0 0 12px 1px #04ADBF",
                    borderRadius: "12px", margin: "auto", marginTop: "0", padding: "2%"
                }}>

                    <BarChart
                        width={1000}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >

                        <XAxis dataKey="name" fill="yellow" />
                        <YAxis fill="yellow" />
                        <Tooltip fill="yellow" />
                        <Legend fill="yellow" />
                        <Bar dataKey="count" fill="#04adbf" />

                    </BarChart>
                </div>
            </div>


            <input
                onChange={(e) => handleFileChange(e)}
                id="csvInput"
                name="file"
                type="File"
            />
        </div>
    )
}


export default AdminDash