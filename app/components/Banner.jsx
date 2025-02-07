"use client"

import Carousel from 'react-bootstrap/Carousel';
import Banner1 from "../../public/images/B1.jpg"
import Banner2 from "../../public/images/B2.jpg"
// import Banner3 from "../../public/images/banner2.png"
import Image from 'next/image';

export default function CarouselPage() {
 
  return (
    <Carousel>
      {/* <Carousel.Item>
        <Image src={Banner3} alt="Banner1" className='img-fluid w-full max-w-full'/>
      </Carousel.Item> */}
      <Carousel.Item>
        <Image src={Banner2} alt="Banner2" className='img-fluid w-full max-w-full'/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={Banner1} alt="Banner3" className='img-fluid w-full max-w-full'/>
      </Carousel.Item>
    </Carousel>
  );
}