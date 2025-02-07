'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import StarRateIcon from '@mui/icons-material/StarRate'
import { FaTruckFast } from 'react-icons/fa6'
import { BsShieldCheck } from 'react-icons/bs'
import { useSearchParams } from 'next/navigation'
import { addCart } from '@/redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { FaFacebook, FaPhoneAlt, FaTiktok } from 'react-icons/fa'
import { MdAttachEmail } from 'react-icons/md'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import '../hr.css'
import { IoVideocamOutline } from 'react-icons/io5'

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinIcon
} from 'react-share'
// import ShareComponent from '../Share'

export default function ProductDetails () {
  const [hoveredIcon, setHoveredIcon] = useState(null)
  const params = useSearchParams()
  let id = params.get('id')
  const router = useRouter()
  const [product, setProduct] = useState([])
  const [activeImage, setActiveImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')

  const handleGetProducts = async () => {
    try {
      fetch(`/api/products/?id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data?.product) {
            setProduct(data.product)
            setSelectedSize(data.product.small) // Initialize with the smallest size
          } else {
            alert('Product not found')
          }
        })
        .catch(err => console.log(err))
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  useEffect(() => {
    handleGetProducts()
  }, [id])

  useEffect(() => {
    if (product && product?.images?.length > 0) {
      setActiveImage(product?.images[0])
    }
  }, [product])

  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)

  const getPriceBySize = () => {
    switch (selectedSize) {
      case product.medium:
        return product.mdprice || null
      case product.large:
        return product.lgprice || null
      case product.xlarge:
        return product.xlprice || null
      default:
        return product.smprice || null
    }
  }

  useEffect(() => {
    const priceBySize = getPriceBySize()
    setTotalPrice(quantity * priceBySize)
  }, [quantity, selectedSize, product])

  const newprice = totalPrice

  const isOutOfStock = product?.stock === 'Out of Stock'

  const addToCart = () => {
    const priceBySize = getPriceBySize()
    const itemWithSelectedSize = {
      ...product,
      selectedSize,
      price: newprice,
      quantity
    }

    // Check if product with the same ID and selected size exists in the cart
    const existingProductIndex = cart.findIndex(
      cartItem =>
        cartItem._id === product._id && cartItem.selectedSize === selectedSize
    )

    let updatedCart = [...cart]

    if (existingProductIndex >= 0) {
      // If the item exists, update its quantity and price
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: updatedCart[existingProductIndex].quantity + quantity,
        price: newprice
      }
    } else {
      // If the item doesn't exist, add it to the cart
      updatedCart.push(itemWithSelectedSize)
    }

    // Dispatch the updated cart
    dispatch(addCart(updatedCart))
  }

  const viewCart = () => {
    const existingProductIndex = cart.findIndex(
      cartItem =>
        cartItem._id === product._id && cartItem.selectedSize === selectedSize
    )

    let updatedCart = [...cart]
    const itemWithSelectedSize = {
      ...product,
      selectedSize,
      price: newprice,
      quantity
    }

    if (existingProductIndex >= 0) {
      const existingItem = updatedCart[existingProductIndex]

      // Check if quantity has changed; if so, update it; otherwise, keep existing quantity
      updatedCart[existingProductIndex] = {
        ...existingItem,
        quantity:
          existingItem.quantity !== quantity ? quantity : existingItem.quantity,
        price: newprice
      }
    } else {
      // If the item doesn't exist, add it to the cart with the current quantity
      updatedCart.push(itemWithSelectedSize)
    }

    // Dispatch the updated cart
    dispatch(addCart(updatedCart))
    router.push('/cart')
  }

  const isInCart = id => {
    return cart.some(product => product._id === id)
  }

  // Quantity Handlers
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  const formatDescription = (description) => {
    let isKeyFeatures = false;
  
    return description?.split('\n').map((line, index) => {
      // Check if the line contains 'Key Features'
      if (line?.toLowerCase().includes('key features')) {
        isKeyFeatures = true;
        return (
          <h3 key={index} className="font-bold text-lg mt-4 mb-3 capitalize">
            {line}
          </h3>
        );
      }
  
      // Check if the line contains 'What it is?' but don't set isKeyFeatures to true
      if (line?.toLowerCase().includes('what it is?')) {
        return (
          <h3 key={index} className="font-bold text-lg mt-4 mb-3 capitalize">
            {line}
          </h3>
        );
      }
  
      // Add extra space after a specific line
      if (line?.toLowerCase().includes('1x diagonal plier')) {
        return (
          <p key={index} className="mb-4">
            {line}
          </p>
        );
      }
  
      // If "Key Features" is found, start rendering bullet points for subsequent lines
      if (isKeyFeatures && line) {
        return <li key={index}>{line}</li>;
      }
  
      // For lines before "Key Features" or unrelated lines, render them as paragraphs
      return line && <p key={index}>{line}</p>;
    });
  };
  
  

  let sizess
  if (product?.small) {
    sizess = (
      <p
        value={selectedSize}
        onChange={e => setSelectedSize(e.target.value)}
        className='border border-gray-300 px-3 py-2 rounded text-sm'
      >
        {product?.small}
        {/* <option value={product.small}>{product.small}</option>
        <option value={product.medium}>{product.medium}</option>
        <option value={product.large}>{product.large}</option>
        <option value={product.xlarge}>{product.xlarge}</option> */}
      </p>
    )
  }

  let Discount
  if (product?.discount && !isOutOfStock) {
    Discount = (
      <div className='absolute top-2 right-2 bg-[#248ccb] px-2 py-1 rounded'>
        <p className='text-white text-xs font-bold'>-{product?.discount}%</p>
      </div>
    )
  }

  let changePrice
  if (product?.disPrice && !isOutOfStock) {
    changePrice = (
      <p className='text-lg me-2 font-light'>
        <del>{product?.disPrice}/- PKR</del>
      </p>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Image Section */}
        <div className='lg:w-1/2'>
          <div className='relative overflow-hidden w-full h-[300px] sm:h-[400px] lg:h-[520px]'>
            {activeImage && (
              <img
                src={activeImage}
                alt='Product Image'
                className='object-cover w-full h-full border border-gray-300 transition-transform duration-500 ease-in-out transform hover:scale-150'
              />
            )}
            {Discount}
            {isOutOfStock && (
              <div className='absolute top-0 left-0 p-2 bg-[#248ccb]'>
                <h3 className='text-white font-bold text-md'>Sold Out</h3>
              </div>
            )}
            <a href={product?.video} target='_blank'>
              <div
                className='absolute bottom-1 right-1 hover:bg-[#248ccb] hover:text-white rounded-circle border border-black'
                style={{ padding: '9px' }}
              >
                <IoVideocamOutline size={19} />
              </div>
            </a>
          </div>
          <div className='flex flex-wrap justify-center mt-4'>
            {product?.images?.map(item => (
              <img
                key={item}
                src={item}
                alt='Thumbnail'
                className='cursor-pointer border border-gray-300 m-2 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px]'
                onClick={() => setActiveImage(item)} // Change on click
                onMouseEnter={() => setActiveImage(item)} // Change on hover
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className='lg:w-1/2'>
          <h1 className='text-2xl font-bold font-text'>
            {product?.title} {product?.small} {product?.code}
          </h1>
          <h1 className='text-2xl mt-2 font-bold font-text'>
            Company: <span className='text-[#248ccb] font-text'>Yulu Supply Chain</span> 
            {/* <span className='text-[#248ccb]'>China</span> */}
          </h1>
          <div className='flex items-center mt-3'>
            {[...Array(5)].map((_, index) => (
              <StarRateIcon
                key={index}
                style={{ fontSize: '20px', color: '#FFE234' }}
              />
            ))}
          </div>

          {/* Size and Price */}
          <div className='flex flex-col sm:flex-row sm:items-center gap-4 mt-4'>
            {/* <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded text-sm"
            >
              <option value={product.small}>{product.small}</option>
              <option value={product.medium}>{product.medium}</option>
              <option value={product.large}>{product.large}</option>
              <option value={product.xlarge}>{product.xlarge}</option>
            </select> */}
            {sizess}
            <p className='text-lg font-semibold flex font-text'>
              {changePrice}
              {/* {getPriceBySize() ? `${totalPrice}/- PKR` : 'Sold Out'} */}
              {`${totalPrice}/- PKR`}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className='col-lg-2'>
            <div className='flex text-center mt-4'>
              <div
                className='border border-black px-2 cursor-pointer'
                onClick={decreaseQuantity}
              >
                <p>-</p>
              </div>
              <div className='border border-black px-2'>
                <p>{quantity}</p>
              </div>
              <div
                className='border border-black px-2 cursor-pointer'
                onClick={increaseQuantity}
              >
                <p>+</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <ul className='list-disc mt-4 pl-5 text-sm'>
            {formatDescription(product?.description)}
          </ul>

          <div className='flex mt-4 items-center'>
            <p className='text-md font-bold'>Share: </p>
            <div className='flex gap-3 ml-4'>
              <FacebookShareButton
                url={shareUrl}
                quote={`Check out this product: ${product?.title}`}
                image={product?.image}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={shareUrl}
                title={`Check out this product: ${product?.title}`}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={shareUrl}
                title={`Check out this product: ${product?.title}`}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <EmailShareButton
                url={shareUrl}
                subject={`Check out this product: ${product?.title}`}
                body={`I found this product interesting, check it out: ${shareUrl}`}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <LinkedinShareButton
                url={shareUrl}
                quote={`Check out this product: ${product?.title}`}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </div>
          <hr className='my-4' />

          {/* Buttons */}
          <div className='flex flex-wrap gap-4 mt-3'>
            <div>
              <button
                style={{ backgroundColor: isOutOfStock ? '#ccc' : '#248ccb' }}
                type='button'
                className={`text-white font-medium rounded-lg font-text text-sm px-3 py-2.5 me-2 mb-2 ${
                  isOutOfStock ? 'cursor-not-allowed' : 'hover:bg-[#248ccb]'
                }`}
                onClick={() => {
                  if (!isOutOfStock) {
                    isInCart(product._id) ? viewCart(product._id) : addToCart()
                    router.push('/cart')
                  }
                }}
                disabled={isOutOfStock}
              >
                {isInCart(product?._id) ? 'Buy Now' : 'Buy Now'}
              </button>
            </div>
            <div>
              <button
                type='button'
                className={`font-medium rounded-lg text-sm font-text px-3 py-2.5 me-2 mb-2 ${
                  isOutOfStock
                    ? 'cursor-not-allowed text-black'
                    : 'hover:bg-[#248ccb] hover:text-white'
                }`}
                onClick={() => {
                  if (!isOutOfStock) {
                    isInCart(product._id) ? viewCart(product._id) : addToCart()
                  }
                }}
                disabled={isOutOfStock}
              >
                {isInCart(product._id) ? 'View Cart' : 'Add to cart'}
              </button>
            </div>
          </div>
          {/* Delivery and Guarantee Info */}
          <div className='flex mt-6 gap-4 items-center'>
            <div className='flex items-center justify-center bg-[#248ccb] rounded-full w-12 h-12'>
              <FaTruckFast className='text-white' size={24} />
            </div>
            <div>
              <h1 className='font-bold text-lg font-text'>FAST DELIVERY</h1>
              <p className='text-xs font-semibold font-text'>
                Enjoy Free and Fast Delivery on Every Order!
              </p>
            </div>
          </div>
          <div className='flex mt-4 gap-4 items-center'>
            <div className='flex items-center justify-center bg-[#248ccb] rounded-full w-12 h-12'>
              <BsShieldCheck className='text-white' size={24} />
            </div>
            <div>
              <h1 className='font-bold text-lg font-text'>MONEY BACK GUARANTEE</h1>
              <p className='text-xs font-semibold font-text'>Money back within 7 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
