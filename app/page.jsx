'use client'

import Image from 'next/image'
import CarouselPage from './components/Banner'
import image1 from '../public/images/t4.jpg'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
// import map from "../public/Images/map.png"
// import CateSliders from "./components/CategorySlider";
// import SpecialOffers from "./components/SpecialOffers";
import './components/hr.css'
import VideoPlayer from './components/VideoPlayer'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
// import FrontCategories from "./components/FrontCategories";
import FrontProducts from './components/FrontProducts'
import FooterTop from './components/FooterTop'
// import img1 from "../public/Images/img1.png"
// import img2 from "../public/Images/img2.png"
// import img3 from "../public/Images/img3.png"
// import img4 from "../public/Images/img4.png"
// import img5 from "../public/Images/img5.png"
// import img6 from "../public/Images/img6.png"

export default function Home () {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
      <style>{`
                body {
                    background-color: white;
                }
            `}</style>
      <div className='bg-white'>
        <div>
          <CarouselPage />
        </div>
        <br />
        {/* <div className='container mt-5'>
          <div className='flex flex-wrap justify-around'>
            <div className='flex gap-3'>
              <div id='first' className='font-bold text-6xl'>
                <svg focusable='false' viewBox='0 0 24 22' role='presentation'>
                  <g
                    transform='translate(1 1)'
                    stroke-width='1.5'
                    fill='none'
                    fill-rule='evenodd'
                  >
                    <path
                      d='M5 10H2M5 15H4'
                      stroke='#cb1836'
                      stroke-linecap='square'
                    ></path>
                    <path
                      stroke='#222021'
                      d='M16.829 16H22v-6l-4-2-1-4H9v12h2.171'
                    ></path>
                    <path
                      d='M0 5h5'
                      stroke='#cb1836'
                      stroke-linecap='square'
                    ></path>
                    <path
                      stroke='#222021'
                      stroke-linecap='square'
                      d='M0 0h9v4'
                    ></path>
                    <circle
                      stroke='#222021'
                      stroke-linecap='square'
                      cx='14'
                      cy='17'
                      r='3'
                    ></circle>
                    <path
                      stroke='#222021'
                      stroke-linecap='square'
                      d='M13 7v2h2'
                    ></path>
                  </g>
                </svg>
              </div>
              <div id='firstpara'>
                <p className='font-bold mt-2'>SHOP WITH CONFIDENCE</p>
                <p className='text-sm mt-1'>100% original products</p>
              </div>
            </div>
            <div className='flex gap-3'>
              <div id='sec' className='font-bold text-6xl'>
                2.
              </div>
              <div>
                <p className='font-bold mt-2'>NATIONWIDE DELIVERY</p>
                <p className='text-sm mt-1'>Shipping all over Pakistan </p>
              </div>
            </div>
            <div className='flex gap-3'>
              <div id='third' className='font-bold text-6xl'>
                3.
              </div>
              <div>
                <p className='font-bold mt-2'>FRIENDLY ONLINE SUPPORT</p>
                <p className='text-sm mt-1'>Email:info@songchuantools.pk</p>
              </div>
            </div>
          </div>
        </div> */}
       
        <br />
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-lg-6'>
              <Image
                style={{ height: '570px', width: '100%' }}
                className='img-fluid object-cover'
                src={image1}
                alt='logo'
              />
            </div>
            <div id='compro' className='col-lg-6'>
              <h1
                style={{ color: '#248ccb' }}
                className='text-lg font-bold tracking-wider font-text'
              >
                COMPANY PROFILE
              </h1>
              <br />
              <h3
                style={{ color: '#248ccb' }}
                className='text-2xl font-extrabold font-text italic'
              >
                <span className='text-black'>ABOUT</span> YULU SUPPLY CHAIN
              </h3>
              <br />
              <p className='text-lg text-justify'>
                Yulu Supply Chain is a leading provider of comprehensive OEM
                services and custom tooling solutions. We specialize in
                partnering with manufacturers to streamline production
                processes, enhance efficiency, and improve overall product
                quality. Our expertise spans a wide range of industries,
                including automotive, aerospace, medical, and consumer goods.{' '}
                <br />
                <br />
                We offer a complete suite of services, from initial design and
                prototyping to full-scale production and ongoing maintenance.
                Our team of skilled engineers and technicians utilizes the
                latest technologies and advanced manufacturing techniques to
                deliver innovative and cost-effective solutions that meet the
                unique needs of each client.
              </p>
              <br />

              {/* <h3 style={{ "color": "#248ccb" }} className="text-2xl font-bold">SONGCHUAN <span className="text-black">Offers:</span></h3> <br />
              <div className="flex">
                <CheckCircleIcon style={{ "color": "#248ccb" }} />
                <p className="text-lg font-bold ml-4">Affordable Price</p>
              </div>
              <div className="flex">
                <CheckCircleIcon style={{ "color": "#248ccb" }} />
                <p className="text-lg font-bold ml-4">Promotion Support</p>
              </div>
              <div className="flex">
                <CheckCircleIcon style={{ "color": "#248ccb" }} />
                <p className="text-lg font-bold ml-4">Ready stock</p>
              </div>
              <div className="flex">
                <CheckCircleIcon style={{ "color": "#248ccb" }} />
                <p className="text-lg font-bold ml-4">Long-Testing Quality</p>
              </div> */}

              <Link href={'/about'}>
                <button
                  style={{ backgroundColor: '#248ccb' }}
                  className='text-white text-sm p-3 rounded-[5px] hover:rounded-[10px] font-text px-4 py-3'
                >
                  Learn More
                </button>
              </Link>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
        <br />
        <br />

        {/* <div className="container mt-5 mb-5">
          <div>
            <div style={{backgroundColor:"red"}}>

            </div>
            <div className="row justify-center">

              <div className="drop-shadow-2xl col-lg-8">
                {isClient && (

                  <VideoPlayer src="/Images/video2.mp4" />

                )}
              </div>
            </div>
            <div style={{backgroundColor:"black"}}>

            </div>
          </div>

        </div> */}
        {/* <div className="container mt-5 mb-5">
          <div className="video-background p-5">
            <div className="half red-background"></div>
            <div className="half black-background"></div>
            <div className="row justify-center">
              <div className="col-lg-8 video-container" >
                {isClient && (
                  <VideoPlayer src="/Images/video2.mp4" />
                )}
              </div>
            </div>
          </div>
        </div> */}
        {/* 
        <div className="container mt-5 mb-5 ">
          <div className="row">
            <div className="col-lg-6">
              {isClient && (
                <VideoPlayer src="/Images/video2.mp4" />
              )}
            </div>
            <div className="col-lg-6">
              <h1 id="multi" className="text-center font-extrabold font-sans italic text-3xl mt-4"><span className="font-extrabold text-red-600 italic font-sans">MULTIFUNCTIONAL</span> PLIER</h1>
              <center>

                <p className="text-center text-sm mt-5 mb-4">Our Precision Multifunctional Pliers engineered to perfection for power and durability in a single, compact tool. Designed with robust jaws and razor-sharp cutting edges, these pliers effortlessly handle any task, from slicing through wires to bending metal. The ergonomic handles are crafted for optimal comfort and control, making prolonged use easy and strain-free.</p>
              </center>
              <div className="row">
                <div className="col-lg-6">
                  <Image
                    style={{ "height": "100%", "width": "100%" }}
                    className="img-fluid mb-2"
                    objectFit="cover"
                    src={img1}
                    alt='logo'
                  />
                </div>
                <div id="secimage" className="col-lg-6">
                  <Image
                    style={{ "height": "100%", "width": "100%" }}
                    className="img-fluid"
                    objectFit="cover"
                    src={img2}
                    alt='logo'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-3">
              <Image
                style={{ "height": "100%", "width": "100%" }}
                className="img-fluid"
                objectFit="cover"
                src={img3}
                alt='logo'
              />
            </div>
            <div id="secimage" className="col-lg-3">
              <Image
                style={{ "height": "100%", "width": "100%" }}
                className="img-fluid"
                objectFit="cover"
                src={img4}
                alt='logo'
              />
            </div>
            <div id="secimage" className="col-lg-3">
              <Image
                style={{ "height": "100%", "width": "100%" }}
                className="img-fluid"
                objectFit="cover"
                src={img5}
                alt='logo'
              />
            </div>
            <div id="secimage" className="col-lg-3">
              <Image
                style={{ "height": "100%", "width": "100%" }}
                className="img-fluid"
                objectFit="cover"
                src={img6}
                alt='logo'
              />
            </div>
          </div>
        </div> */}

        {/* <div style={{ borderBottom: "3px solid #248ccb", width: "160px" }} className="container">
        </div> */}
        {/* <div style={{borderTop:"4px solid black",marginTop:"-2px"}} className="container">
        
      </div> */}

        <br />
        <br />
        {/* <h1 className="text-2xl text-center font-extrabold text-black mt-5 italic font-sans"><span className="text-[#248ccb]">SONGCHUAN</span> GLOBAL NETWORK</h1> */}
        {/* <div style={{ borderBottom: "3px solid #248ccb", width: "320px" }} className="container"> */}
        {/* </div> */}
        <br />
        {/* <div className="mt-5">
          <Image
            src={map}
            width={"100%"}
            height={"100%"}
            alt="map"
          />
        </div><br /><br /> */}

        {/* <h1 id="offers" className="text-2xl text-center font-bold text-black mt-5 italic font-sans">TOP CATEGORIES</h1>
        <div style={{ borderBottom: "3px solid #248ccb", width: "150px" }} className="container">
        </div> */}
        {/* <div className="container mt-3"> */}
        {/* <SpecialOffers /> */}
        {/* <FrontCategories />
        </div> */}
        <div className='container mt-3'>
          <h1 className='text-2xl text-center font-extrabold text-black mt-5 italic font-sans'>
            <span className='text-[#248ccb]'>OUR</span> PRODUCTS
          </h1>
          {/* <div style={{ borderBottom: "3px solid #248ccb", width: "160px" ,borderStyle:"dashed"}} className="container"> */}
          {/* </div> */}
          {/* <CateSliders /> */}
          <FrontProducts />
          <br />
        </div>
          <FooterTop/>
        <br />
      </div>
    </>
  )
}
