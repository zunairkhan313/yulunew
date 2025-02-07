import React from 'react'
import truck from "../../public/images/ship.png"
import logo24 from "../../public/images/24.png"
import mastercard from "../../public/images/mastercard.png"
import delievery from "../../public/images/fast.png"
import Image from 'next/image'
import "./hr.css"

const FooterTop = () => {
    return (
        <div className='bg-white'>
            <div style={{ "backgroundColor": "#248ccb" }} className="container-fluid p-5">

                <div className="flex flex-wrap justify-around">
                    <div className="flex gap-3">
                        <div className="font-bold text-6xl">
                            <Image
                                src={truck}
                                style={{ width: "80px" }}
                                alt="truck"
                            />
                        </div>
                        <div>
                            <p className="font-bold text-white mt-1">Free Shipping.</p>
                            <p style={{ "color": "rgb(240, 240, 240)" }} className="text-sm mt-2 ">No one rejects, dislikes.</p>
                        </div>
                    </div>
                    {/* <div id='borderle' style={{ borderLeft: "1px solid rgb(240, 240, 240)" }} ></div> */}
                    <div id='main24' className="flex gap-3">
                        <div id='imag24' className="font-bold text-6xl">
                            <Image
                                src={logo24}
                                style={{ width: "50px" }}
                                alt="truck"
                            />
                        </div>
                        <div id='supp24'>
                            <p className="font-bold text-white mt-1">
                                24/7 Support.</p>
                            <p style={{ "color": "rgb(240, 240, 240)" }} className="text-sm mt-2">Friendly Online Support</p>
                        </div>
                    </div>
                    {/* <div id='borderle' style={{ borderLeft: "1px solid rgb(240, 240, 240)" }} ></div> */}
                    <div className="flex gap-3">
                        <div className="font-bold text-6xl">
                            <Image
                                src={mastercard}
                                style={{ width: "70px" }}
                                alt="truck"
                            />
                        </div>
                        <div>
                            <p className="font-bold text-white mt-1">Payment Method</p>
                            <p style={{ "color": "rgb(240, 240, 240)" }} className="text-sm mt-2 ">COD & Bank Transfer</p>
                        </div>
                    </div>
                    {/* <div id='borderle' style={{ borderLeft: "1px solid rgb(240, 240, 240)" }} ></div> */}
                    <div id='fastmain' className="flex gap-3">
                        <div id='fastimage' style={{ marginLeft: "-24px" }} className="font-bold text-6xl">
                            <Image
                                src={delievery}
                                style={{ width: "70px" }}
                                alt="truck"
                            />
                        </div>
                        <div id='fastdel'>
                            <p className="font-bold text-white mt-1">Fast Delivery.</p>
                            <p style={{ "color": "rgb(240, 240, 240)" }} className="text-sm mt-2">Under 3-5 Working Days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterTop
