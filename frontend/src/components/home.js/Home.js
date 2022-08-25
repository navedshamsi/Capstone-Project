import "./home.css"
import Nav from "../nav/Nav.js"
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import { Link } from "react-router-dom";

function Home() {
  const fixEffect = useRef(true)
  const [arr, changeArr] = useState({
    "Beds & mattresses": "",
    "Kitchen & appliances": "",
    "Home": "",
    "Furniture": "", "Outdoor": "", "Pots & Plants": "", "Lighting": "" 
  }
  )
  const [divi, divChanger] = useState([])
  let dat;



  function rndom(min = 1, max = 100000) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(() => {

    if (fixEffect.current) {

      

      axios.get("http://localhost:8000/products/getall")
        .then(d => {
          // eslint-disable-next-line
          dat = d.data;
          

          changeArr((d) => {

            let temp = d;

            for (let x in arr) {
              temp[x] = dat.data.filter((f) => {
                if (f.category === x) return f
                else return false
              })
            }
            console.log(temp)
            return temp;
          })




          let news = {}
          for (let x in arr) {
            news[x] = []
            divChanger(z => { z[x] = []; return z })
            arr[x].forEach((e, i) => {
              if (i < 6) {
                // divChanger(z => {

                news[x].push(

                  <div className="card" key={x + rndom()}>
                    <Link to={`/order?query=${e.name}?${e.price}?${e.category}?${e.image}?${e.description.replace(/\s/,"~")}?${e.quantity}`} >
                      <div className="cardImg" key={x + rndom()}

                        onClick={() => { }}
                        style={{
                          backgroundImage: `url(${e.image})`
                          , backgroundPosition: "center", backgroundSize: "cover"
                        }}
                      ></div>
                    </Link>
                    <p key={x + rndom()} className="sp">{e.name.substring(0, 20)}</p>
                    <p key={x + rndom()} className="sp">{e.description.substring(0, 22) + "..."}</p>
                    <p key={x + rndom()} className="sp">{"RS " + e.price}</p>
                  </div>)

                return news
                // })
              }

            })

          }
          divChanger(news)
        })
    }
    return () => { fixEffect.current = false }

    // eslint-disable-next-line
  }, [])

  return (
    <div div style={{ backgroundColor: "#052939", height: "auto", paddingTop: '1.5vh', paddingBottom: "4vh" }}>
      {/* <div className="categories " >
      <div className="navItems">CATEGORIES :</div>
        <div className="navItems">home</div>
        <div className="navItems">home</div>
        <div className="navItems">home</div>
        <div className="navItems">login</div>
        <div className="navItems">login</div>
      </div> */}
      <Nav />

      <div>
        <Swiper className="swiper" modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0} slidesPerView={1} autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
        >

          <SwiperSlide > <div className="iimg1" > </div></SwiperSlide >
          <SwiperSlide > <div className="iimg2" > </div></SwiperSlide >
          <SwiperSlide > <div className="iimg3" > </div></SwiperSlide >
        </Swiper>


      </div>

      {Object.keys(divi).map((x) => <div className="cars">
        <h1><u>{x}</u></h1>
        <div className="cardContainer">
          {divi[x]}
        </div>
      </div>
      )}


    </div>

  )
}

export default Home


