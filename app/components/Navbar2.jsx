"use client"

import Link from 'next/link'
import React from 'react'
import "./hr.css"
import { useSession } from "next-auth/react";
import Dropdown from './Dropdown';
// import Dropdown from './Dropdown';

const Navbar2 = () => {
    const { data: session } = useSession();
    var dash;

    if (session?.user?.email === "yulu123@gmail.com") {
        dash = (
            <>
                <Link href={"/dashboard"}>
                    <p>
                        Dashboard
                    </p>
                </Link>
            </>
        )
    }

    return (
        <>
           
            <div style={{ borderBottom: "1px solid gray" }} className='flex justify-center align-center text-center p-2 bg-[#dab66a]'>
                <ul id='uull' className='flex'>
                    <li id='dash' className='text-black font-bold'>{dash}</li>
                    <Link href={"/"}>
                        <li id='links' className='hover:cursor-pointer text-black font-bold'>Home</li>
                    </Link>
                    <Link href={"/category"}>
                        <div className="dropdown">
                            <li id='products' className="dropbtn 
                             text-black font-bold">Products</li>
                            <div className="dropdown-content">
                                {/* dropdown */}
                                <Dropdown />
                            </div>
                        </div>
                    </Link>
                    <Link href={"/about"}>
                        <li id='links' className='hover:cursor-pointer text-black font-bold'>About</li>
                    </Link>
                    <Link href={"/contact"}>

                        <li id='links' className='hover:cursor-pointer text-black font-bold'>Contact</li>
                    </Link>
                    {/* <Link href={"/news"}>

                        <li id='links' className='hover:cursor-pointer text-black font-bold'>News</li>
                    </Link>
                    <Link href={"/blog"}>

                        <li id='links' className='hover:cursor-pointer text-black font-bold'>Blog</li>
                    </Link> */}
                </ul>
            </div>
        </>
    )
}

export default Navbar2
