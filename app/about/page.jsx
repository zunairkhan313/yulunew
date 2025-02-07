import React from 'react'
import '../components/hr.css'
import about1 from '../../public/images/t1.jpg'
import about2 from '../../public/images/t2.jpg'
import about3 from '../../public/images/t3.jpg'
import about4 from '../../public/images/t4.jpg'
import about5 from '../../public/images/t5.jpg'
import Image from 'next/image'

export const metadata = {
  title: 'About'
}

const About = () => {
  return (
    <>
      <style>{`
                body {
                    background-color: white;
                }
            `}</style>
      <div className='bg-white mb-5'>
        <div className='bg-white mt-5 container p-3'>
         
            <div className='text-5xl font-extrabold tracking-wider bgVideoText '>
              <h1 className='heading text-black font-extrabold text-center font-text italic'>About Us</h1>
            </div>
     
          
        </div>
        <div className='container mt-4'>
          {/* first */}
          <div className='row'>
            <div className='col-lg-6 mb-2'>
              <h1
                style={{ color: '#248ccb' }}
                className='text-lg font-bold text-green-800 tracking-widest mt-4 font-text'
              >
                COMPANY PROFILE
              </h1>
              <h3 className='text-4xl font-extrabold text-black font-text'>WHO WE ARE</h3>
              <br />
              <p className='text-[16px] text-justify font-text'>
                Yulu Supply Chain is a leading provider of comprehensive OEM
                services and custom tooling solutions. We specialize in
                partnering with manufacturers to streamline production
                processes, enhance efficiency, and improve overall product
                quality. Our expertise spans a wide range of industries,
                including automotive, aerospace, medical, and consumer goods.{' '}
                <br />
                <br /> We offer a complete suite of services, from initial
                design and prototyping to full-scale production and ongoing
                maintenance. Our team of skilled engineers and technicians
                utilizes the latest technologies and advanced manufacturing
                techniques to deliver innovative and cost-effective solutions
                that meet the unique needs of each client. <br />
                <br /> We are committed to exceeding customer expectations
                through exceptional quality, on-time delivery, and unparalleled
                customer support. Whether you require precision-engineered
                components, specialized tooling for complex manufacturing
                operations, or a complete turnkey solution for your production
                line, Yulu Supply Chain has the expertise and resources to help
                you achieve your business goals.
              </p>
            </div>
            <div className='col-lg-6 mt-2'>
              <Image
                src={about1}
                className='object-cover img-fluid'
                width={'100px'}
                style={{ height: '550px' }}
                alt='about'
              />
            </div>
          </div>
        </div> <br />
        <div className='container mt-5'>
          {/* first */}
          <div className='row'>
            <div className='col-lg-8 mb-2 mt-3'>
              <h3 className='text-4xl font-extrabold text-black mt-4 font-text'>
                CUSTOMER FOCUS
              </h3>
              <br />
              <p className='text-[16px] text-justify font-text'>
                We prioritize building strong, long-term relationships with our
                clients. Our commitment to understanding their unique needs and
                challenges drives us to provide customized solutions that align
                with their specific requirements. We believe in open
                communication, active collaboration, and exceeding expectations
                at every stage of the project.
              </p>
            </div>
            <div className='col-lg-4 mt-2'>
              <Image
                src={about2}
                className='object-cover img-fluid'
                width={'100%'}
                style={{ height: '250px' }}
                alt='about'
              />
            </div>
          </div>
        </div><br />
        <div className='container mt-5'>
          {/* first */}
          <div className='row'>
            <div className='col-lg-8 mb-2 mt-3'>
              <h3 className='text-4xl font-extrabold text-black mt-3 font-text'>OUR VISION</h3>
              <br />
              <p className='text-[16px] text-justify'>
              To be the leading provider of comprehensive manufacturing solutions, recognized for our expertise, innovation, and commitment to customer satisfaction. We envision a future where Yulu Supply Chain is synonymous with excellence in OEM services and custom tooling, driving advancements in manufacturing across diverse industries.
              </p>
            </div>
            <div className='col-lg-4 mt-2'>
              <Image
                src={about3}
                className='object-cover img-fluid'
                width={'100%'}
                style={{ height: '250px' }}
                alt='about'
              />
            </div>
          </div>
        </div><br />
        <div className='container mt-5'>
          {/* first */}
          <div className='row'>
            <div className='col-lg-8 mb-2 mt-3'>
              <h3 className='text-4xl font-extrabold text-black mt-4 font-text'>
                OUR MISSION
              </h3>
              <br />
              <p className='text-[16px] text-justify font-text'>
                We is dedicated to empowering our clients through innovative OEM
                services and precision-engineered custom tooling solutions. We
                strive to exceed expectations by delivering exceptional quality,
                on-time delivery, and unparalleled customer support, fostering
                long-term partnerships built on trust and mutual success.
              </p>
            </div>
            <div className='col-lg-4 mt-2'>
              <Image
                src={about4}
                className='object-cover img-fluid'
                width={'100%'}
                style={{ height: '250px' }}
                alt='about'
              />
            </div>
          </div>
        </div>
        <div className='container mt-4'>
          {/* first */}
          <div className='row'>
            <div className='col-lg-8 mb-2 mt-3'>
              <h3 className='text-4xl font-extrabold text-black mt-4 font-text'>
                QUALITY AND RELIABILITY
              </h3>
              <br />
              <p className='text-[16px] text-justify font-text'>
                We is dedicated to empowering our clients through innovative OEM
                services and precision-engineered custom tooling solutions. We
                strive to exceed expectations by delivering exceptional quality,
                on-time delivery, and unparalleled customer support, fostering
                long-term partnerships built on trust and mutual success.
              </p>
            </div>
            <div className='col-lg-4 mt-2'>
              <Image
                src={about5}
                className='object-cover img-fluid'
                width={'100%'}
                style={{ height: '250px' }}
                alt='about'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
