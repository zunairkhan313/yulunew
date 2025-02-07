'use client'

import ProductCardCheckout from '../components/products/productCardCheckout'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import UserAddress from './FetchProducts'
import { useRouter } from 'next/navigation'
import { addCart } from '@/redux/slices/cartSlice'
import jsPDF from 'jspdf'
import Swal from 'sweetalert2'
import { FaLongArrowAltLeft } from 'react-icons/fa'

const getAllCheckouts = async () => {
  try {
    const res = await fetch('/api/checkout', {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch topics')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.log('Error loading topics: ', error)
    return null // Return null in case of error
  }
}

function generateOrderNumber () {
  const date = new Date()
  const dateString = date.toISOString().slice(0, 10).replace(/-/g, '') // YYYYMMDD
  const hours = date.getHours().toString().padStart(2, '0') // HH
  const minutes = date.getMinutes().toString().padStart(2, '0') // MM
  const seconds = date.getSeconds().toString().padStart(2, '0') // SS

  const timeString = `${hours}:${minutes}:${seconds}`

  return `ORD-${dateString}-${timeString}-`
}

export default function OrderPage () {
  const [data, setData] = useState([])
  const { cart } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const router = useRouter()
  const [subTotal, setSubTotal] = useState(0)
  const [deliveryCharges, setDeliveryCharges] = useState(0)
  const [total, setTotal] = useState(0)
  const [shippingInfo, setShippingInfo] = useState(null)
  useEffect(() => {
    setSubTotal(cart.reduce((acc, item) => acc + parseInt(item.price), 0))
  }, [cart])

  useEffect(() => {
    if (subTotal > 0) {
      setTotal(parseInt(subTotal) + parseInt(deliveryCharges))
    }
  }, [subTotal, deliveryCharges])

  useEffect(() => {
    const fetchShippingInfo = async () => {
      const result = await getAllCheckouts()
      setShippingInfo(
        result?.Checkouts?.filter(item => item?.email)?.reverse()[0]
      )
    }

    fetchShippingInfo()
  }, [])

  const handleGetOrder = async () => {
    try {
      const response = await fetch(`/api/checkout`)
      const result = await response.json()
      setData(result.Checkouts || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    handleGetOrder()
  }, [])

  const lastOrderNumber = generateOrderNumber()

  const onSubmitOrder = () => {
    // Swal.fire({
    //   title: 'Order Placed Successfully!',
    //   text: 'Your order has been placed successfully!',
    //   icon: 'success',
    //   confirmButtonText: 'OK'
    // })
    dispatch(addCart([]))
    router.push('/category')

    const doc = new jsPDF()

    // Add a Title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Order Summary', 105, 20, null, null, 'center')

    // Section for Product Details
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    cart.forEach((item, index) => {
      const yPosition = 40 + index * 20

      doc.setDrawColor(0, 0, 0) // Set black color for borders
      doc.rect(10, yPosition, 190, 15) // x, y, width, height

      doc.text(`Product ${index + 1}: ${item.title}`, 15, yPosition + 5)
      doc.text(`Price: PKR${item.price}`, 120, yPosition + 5)
      doc.text(`Quantity: ${item.quantity}`, 170, yPosition + 5)
    })

    // Add Subtotal, Delivery, and Total sections
    const totalYPosition = 40 + cart.length * 20

    doc.setFont('helvetica', 'bold')
    doc.text(`Subtotal: PKR${subTotal}`, 120, totalYPosition + 10)
    doc.text(
      `Delivery Charges: PKR${deliveryCharges}`,
      120,
      totalYPosition + 20
    )
    doc.text(`Total: PKR${total}`, 120, totalYPosition + 30)

    // Draw line to separate product details from shipping info
    doc.setDrawColor(0, 0, 0)
    doc.line(10, totalYPosition + 35, 200, totalYPosition + 35)

    // Section for Shipping Information
    doc.setFontSize(14)
    doc.text('Shipping Information', 10, totalYPosition + 50)

    // Add a line with UserAddress component details if available
    if (shippingInfo) {
      const shippingYPosition = totalYPosition + 50
      doc.setFontSize(14)
      doc.text('Shipping Information', 10, shippingYPosition)

      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.text(
        `Order Number: ${lastOrderNumber}${shippingInfo?.serialnumber}`,
        10,
        shippingYPosition + 10
      )
      doc.text(`Name: ${shippingInfo.name}`, 10, shippingYPosition + 20)
      doc.text(`Email: ${shippingInfo.email}`, 10, shippingYPosition + 30)
      doc.text(`Phone: ${shippingInfo.num}`, 10, shippingYPosition + 40)
      doc.text(`Country: ${shippingInfo.country}`, 10, shippingYPosition + 50)
      doc.text(`City: ${shippingInfo.city}`, 10, shippingYPosition + 60)
      doc.text(`Address: ${shippingInfo.address}`, 10, shippingYPosition + 70)
      doc.text(
        `Payment Method: ${shippingInfo.paymentMethod}`,
        10,
        shippingYPosition + 80
      )
    } else {
      doc.text('No shipping information available', 10, totalYPosition + 50)
    }

    // Save the PDF
    doc.save('order-summary.pdf')
  }

  return (
    <>
      <style>{`
        body {
          background-color: white;
        }
      `}</style>
      <div className='container mt-5 mb-5'>
        <div className='bgVideoText'>
          <h1 className='heading text-black text-5xl font-extrabold tracking-wider font-text italic text-center'>
            Order
          </h1>
        </div>
        {/* <div className='hr-cart'></div> */}

        <Row>
          <Col sm={12} md={2}></Col>
          <Col sm={12} md={8}>
            <div className='container mt-5'>
              {/* <div className='flex flex-wrap'> */}
                <ProductCardCheckout />
              {/* </div> */}
              {/* <div className='container'> */}
              <div className='flex flex-wrap'>
                <div
                  style={{ height: '100%', width: '100%' }}
                  className=' p-3 border border-[#f0f0f0]'
                >
                  <div>
                   
             

                    <br />
                    <br />
                    <h6 className='text-2xl font-sans font-bold'>
                      Shipping information
                    </h6>
                    <br />
                    <UserAddress />
                    <br />
                    <div className='flex flex-wrap justify-between p-2'>
                      <div>
                        <h5 className='font-sans text-lg font-bold'>
                          Subtotal
                        </h5>
                      </div>
                      <div>
                        <h6 className='font-sans text-lg font-bold'>
                          {subTotal}/- PKR
                        </h6>
                      </div>
                    </div>
                    <hr />
                    <div className='flex flex-wrap justify-between p-2'>
                      <div>
                        <h5 className='font-sans text-lg font-bold'>
                          Delivery Charges
                        </h5>
                      </div>
                      <div>
                        <h6 className='font-sans text-lg font-bold'>
                          {deliveryCharges}/- PKR
                        </h6>
                      </div>
                    </div>
                    <hr />
                    <div className='flex flex-wrap justify-between p-2'>
                      <div>
                        <h5 className='font-sans text-lg font-bold'>Total</h5>
                      </div>
                      <div>
                        <h6 className='font-sans text-lg font-bold'>
                          {total}/- PKR
                        </h6>
                      </div>
                    </div>
                    <hr />
                    {/* <div className='container px-10 mx-0 min-w-full flex flex-col items-center'>
                      <button
                        onClick={onSubmitOrder}
                        className='mt-3 bg-[#ff3333] text-white hover:bg-black font-bold py-2 px-4 rounded'
                      >
                        Continue Shopping
                      </button>
                    </div> */}
                    <div className='container px-10 mx-0 min-w-full flex flex-col items-center'>
                      <button
                        onClick={onSubmitOrder}
                        className='mt-3 bg-[#248ccb] text-white hover:bg-black font-bold py-2 px-10 rounded flex items-center justify-center'
                      >
                        <FaLongArrowAltLeft
                          size={20}
                          style={{ marginRight: '8px', marginTop: '3px' }} // Adjusting margin to move it left
                        />
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* </div> */}
          </Col>
          <Col sm={12} md={2}></Col>
          {/* <Col md={5}>
           
          </Col> */}
        </Row>
      </div>
    </>
  )
}
