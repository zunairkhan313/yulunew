'use client'

import '../components/hr.css'
import { FaFacebook, FaPhoneAlt, FaTiktok } from 'react-icons/fa'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { IoLogoWechat } from 'react-icons/io5'
import Swal from 'sweetalert2'
import { CiMail } from 'react-icons/ci'
import { CiPhone } from 'react-icons/ci'
import { motion, useAnimation } from 'framer-motion'
import { createContext } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export default function ContactUs () {
  const form = useRef()
  const iconControls = useAnimation()
  const textControls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    if (inView) {
      iconControls.start({
        opacity: 1,
        y: 0,

        transition: { duration: 0.8, delay: 0.3 }
      })
      textControls.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.8, delay: 0.3 }
      })
    }
  }, [iconControls, textControls, inView])

  const [hoveredIcon, setHoveredIcon] = useState(null)

  async function handleSubmit (e) {
    e.preventDefault()
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: '374d4650-0549-442e-b78a-251a5942dca4',
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        subject: e.target.subject.value,
        message: e.target.message.value
      })
    })
    const result = await response.json()
    if (result.success) {
      Swal.fire({
        title: 'Send Message Successfully!',
        text: 'Your action was successful!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      if (form.current) {
        form.current.reset()
      }
    }
  }

  return (
    <>
      <style>{`
                body {
                    background-color: white;
                }
            `}</style>

      <div className='bg-white mt-5 container p-3'>
        <div className=' flex'>
          <div className='text-5xl font-extrabold tracking-wider bgVideoText '>
            <motion.h1
              className='heading text-black font-extrabold font-text italic'
              initial={{ opacity: 0, x: -50 }}
              animate={textControls}
            >
              Contact Us
            </motion.h1>
          </div>
        </div>

        <form ref={form} onSubmit={handleSubmit}>
          <div className='container my-5'>
            <div className='row'>
              <div className='col-md-4 p-5 border border-[#f0f0f0]'>
                <div className='flex'>
                  <motion.div
                    className='p-2 rounded-[39px] bg-[#248ccb] '
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={iconControls}
                  >
                    <CiPhone size={25} style={{ color: 'white' }} />
                  </motion.div>
                  <div className=' ml-5'>
                    <motion.p
                      className='text-md mt-[10px] font-bold font-text'
                      initial={{ opacity: 0, y: -50 }}
                      animate={textControls}
                    >
                      Call To Us
                    </motion.p>
                  </div>
                </div>

                <motion.p
                  className='text-md text-black mt-4 font-text'
                  initial={{ opacity: 0, x: -50 }}
                  animate={textControls}
                >
                  We are available 24/7, 7 days a week.
                </motion.p>
                <motion.p
                  className='text-md text-black mt-4 font-text'
                  initial={{ opacity: 0, x: -50 }}
                  animate={textControls}
                >
                  <a href='tel:+86-539-2653587'>Phone: +86-539-2653587</a>
                </motion.p>
                <br />
                <hr />

                <div className='flex mt-4'>
                  <motion.div
                    className='p-2 rounded-[39px] bg-[#248ccb]'
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={iconControls}
                  >
                    <CiMail size={25} style={{ color: 'white' }} />
                  </motion.div>
                  <div className=' ml-5'>
                    <motion.p
                      className='text-md mt-[10px] font-bold font-text'
                      initial={{ opacity: 0, x: -50 }}
                      animate={textControls}
                    >
                      Write To Us
                    </motion.p>
                  </div>
                </div>
                <motion.p
                  className='text-md text-black mt-4 font-text'
                  initial={{ opacity: 0, x: -50 }}
                  animate={textControls}
                >
                  Fill out our form and we will contact you within 24 hours.
                </motion.p>

                <motion.p
                  className='text-md text-black mt-4 font-text'
                  initial={{ opacity: 0, x: -50 }}
                  animate={textControls}
                >
                  <a href='mailto:info@cappello.pk'>
                    Email: ylschcom@ylsch.com
                  </a>
                </motion.p>
              </div>
              <div className='col-md-8 p-5 border border-[#f0f0f0]'>
                <motion.h1
                  style={{ color: 'black' }}
                  className='text-4xl font-extrabold ml-[-5px] font-text'
                  initial={{ opacity: 0, y: -50 }}
                  animate={textControls}
                >
                  <span className='text-[#248ccb]'>Contact</span> Us
                </motion.h1>
                <div className='row mt-3'>
                  {/* <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> */}
                  <div className='col-md-4 p-2'>
                    <input
                      name='name'
                      className='form-control py-2'
                      required
                      type='text'
                      placeholder='Your Name'
                    ></input>
                  </div>
                  <div className='col-md-4 p-2'>
                    <input
                      name='email'
                      className='form-control py-2'
                      required
                      type='email'
                      placeholder='Your Email'
                    ></input>
                  </div>
                  <div className='col-md-4 p-2'>
                    <input
                      name='phone'
                      className='form-control py-2'
                      required
                      type='number'
                      placeholder='Your Phone'
                    ></input>
                  </div>

                  <div className='col-md-12 mt-4'>
                    <textarea
                      name='message'
                      className='form-control required'
                      rows='8'
                      required
                      placeholder='Your Message'
                    ></textarea>
                  </div>
                  <div className='p-2 flex items-center justify-center mt-2'>
                    <motion.button
                      style={{ backgroundColor: '#248ccb' }}
                      type='submit'
                      className='w-full p-3 focus:outline-none rounded-[5px] text-white
                                        hover:bg-black text-center ease-linear duration-150'
                      initial={{ opacity: 0, x: -150 }}
                      animate={textControls}
                    >
                      Send Message
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
