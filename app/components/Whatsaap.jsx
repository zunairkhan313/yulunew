"use client"
import React from 'react'
import whatsapp from "../../public/images/WhatsApp.png"
import Image from 'next/image'
import { motion } from "framer-motion";
import  { createContext } from 'react';

export default function Whatsaap() {
  return (
    <>
    <motion.div style={{ position: 'fixed', bottom: '25px', right: '14px' }}
       initial={{ opacity: 0, y:-400 }}
       transition={{ duration: 0.8, delay: 0.7 }}
       animate={{ opacity: 1, y:0 }}
    >
        <a href="https://wa.me/923369533510?text=Give me details about Songchuan" target='_blank'>
        <Image src={whatsapp} width='70' alt="whatsaap" />
        
        </a>
    </motion.div>
</>
  )
}
