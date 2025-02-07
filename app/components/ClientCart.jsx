'use client'
import { MdDeliveryDining } from 'react-icons/md'
import cash from '../../public/images/cash.webp'
import online from '../../public/images/online.png'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import ProductCardCart from './products/productCardCart'
import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import '../components/hr.css'
import Image from 'next/image'
// import card1 from '../../public/Images/card1.png'
// import card2 from '../../public/Images/card2.png'
// import card3 from '../../public/Images/card3.png'
import easy from '../../public/images/easy.png'
import jazz from '../../public/images/jazz.png'
import meezan from '../../public/images/meezan.png'
import ProductCardCheckout from './products/productCardCheckout'

export default function ClientCart () {
  const { cart } = useSelector(state => state.cart)
  const [city, setCity] = useState('')
  const [num, setNum] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD') // Default value is 'cod'

  const form = useRef()
  const handlePaymentChange = e => {
    setPaymentMethod(e.target.value)
  }

  const router = useRouter()

  const [subTotal, setSubTotal] = useState(0)
  const [deliveryCharges, setDeliveryCharges] = useState(0)
  const [total, setTotal] = useState(0)
  const [slipimg, setSlipImg] = useState('')

  const handleUploadImage = e => {
    const files = e.target.files
    const urls = []

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()

      reader.onload = e => {
        urls.push(e.target.result)
        if (urls.length === files.length) {
          setSlipImg(urls)
        }
      }

      reader.readAsDataURL(files[i])
    }
  }

  useEffect(() => {
    setSubTotal(cart.reduce((acc, item) => acc + parseInt(item.price), 0))
  }, [cart])

  useEffect(() => {
    if (subTotal > 0) {
      setTotal(parseInt(subTotal) + parseInt(deliveryCharges))
    }
  }, [subTotal, deliveryCharges])

  const { data: session } = useSession()

  const capitalizeFirstLetter = text => {
    if (!text) return text
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const handleItemClick = details => {
    setModalContent(details) // Set the content for the modal
    setShowModal(true) // Show the modal
  }
  const handleCloseModal = () => {
    setShowModal(false) // Hide the modal
    setModalContent('') // Reset the modal content
  }

  const onSubmitAddress = async e => {
    e.preventDefault()

    // Validation
    if (!email) return alert('Please input email')
    if (!num) return alert('Please input number')
    if (!name) return alert('Please input name')
    if (!country) return alert('Please input country')
    if (!city) return alert('Please input city')
    if (!address) return alert('Please input address')
    if (paymentMethod === 'onlinePayment' && slipimg.length === 0) {
      return alert('Please upload an image for the online payment slip.')
    }

    const capitalizedName = capitalizeFirstLetter(name)
    const capitalizedCountry = capitalizeFirstLetter(country)
    const capitalizedCity = capitalizeFirstLetter(city)
    const capitalizedAddress = capitalizeFirstLetter(address)

    const products = cart.map((item, index) => ({
      product_id: item._id || item.product_id,
      selectedSize: item.selectedSize,
      price: item.price,
      quantity: item.quantity
    }))

    const emailProducts = cart
      .map(
        (item, index) => `Product ${index + 1}:
  - Name: ${item.title}
  - Size: ${item.selectedSize || 'N/A'}
  - Price: ${item.price}
  - Quantity: ${item.quantity}`
      )
      .join('\n')

    const message = `
Name: ${capitalizedName}
Email: ${email}
Phone: ${num}
Country: ${capitalizedCountry}
City: ${capitalizedCity}
Address: ${capitalizedAddress}
Payment Method: ${paymentMethod}
Products:\n${emailProducts}`

    try {
      // Send data to API
      const res = await fetch(`/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email,
          num,
          name: capitalizedName,
          country: capitalizedCountry,
          city: capitalizedCity,
          address: capitalizedAddress,
          products,
          paymentMethod,
          slipimg
        })
      })

      if (res.ok) {
        Swal.fire({
          title: 'Order Placed Successfully!',
          text: 'Your action was successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        router.push('/order')
      } else {
        throw new Error('Failed to submit address')
      }

      // Send email via Web3Forms
      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'f5d5e31d-c6de-47c9-8c0b-4c8904d2d57e', // Replace with your Web3Forms access key
          name: capitalizedName,
          email: email,
          phone: num,
          subject: 'New Order from ClientCart',
          message: message
        })
      })

      if (emailResponse.ok) {
        console.log('Email sent successfully')
      } else {
        console.error('Failed to send email')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  // const onSubmitAddress = async (e) => {
  //   e.preventDefault();

  //   // Form validation
  //   if (!email || !num || !name || !country || !city || !address) {
  //     alert("All fields are required. Please fill in all the details.");
  //     return;
  //   }

  //   // Capitalize fields
  //   const capitalizedName = capitalizeFirstLetter(name);
  //   const capitalizedCountry = capitalizeFirstLetter(country);
  //   const capitalizedCity = capitalizeFirstLetter(city);
  //   const capitalizedAddress = capitalizeFirstLetter(address);

  //   try {
  //     console.log("Cart Items:", cart);

  //     // Map cart items to required product structure
  //     const products = cart.map((item) => ({
  //       product_id: item._id || item.product_id,
  //       selectedSize: item.selectedSize,
  //       price: item.price,
  //       quantity: item.quantity,
  //     }));

  //     console.log("Form Data:", {
  //       email,
  //       num,
  //       name: capitalizedName,
  //       country: capitalizedCountry,
  //       city: capitalizedCity,
  //       address: capitalizedAddress,
  //       products,
  //     });

  //     // Create shipment data for PostEx
  //     const shipmentData = {
  //       sender_name: capitalizedName,
  //       sender_email: email,
  //       sender_phone: num,
  //       receiver_address: capitalizedAddress,
  //       receiver_city: capitalizedCity,
  //       receiver_country: capitalizedCountry,
  //       total_amount: total,
  //       items: products.map((product) => ({
  //         product_id: product.product_id,
  //         product_name: "Product Name", // Replace with actual product name if available
  //         quantity: product.quantity,
  //         unit_price: product.price,
  //       })),
  //     };

  //     console.log("Shipment Data:", shipmentData);

  //     // Call PostEx API
  //     const res = await fetch("/api/postEx", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer YzliM2E3NWVjNGFjNDI1OTg2YmIyZmMxMjAzZTY1ZGM6YWZmZmVkYzhhNDBlNDhkNWFiZTI1ZmVmMGJjMTg2MjI=`,
  //       },
  //       body: JSON.stringify(shipmentData),
  //     });

  //     if (res.ok) {
  //       // Success response
  //       const result = await res.json();
  //       console.log("PostEx Success Response:", result);

  //       Swal.fire({
  //         title: "Checkout Successfully!",
  //         text: "Your order has been placed and shipment created!",
  //         icon: "success",
  //         confirmButtonText: "OK",
  //       });

  //       // Navigate to the order page
  //       router.push("/order");
  //     } else {
  //       // Handle API error response
  //       const errorData = await res.json();
  //       console.error("PostEx Error Response:", errorData);
  //       throw new Error(errorData.message || "Failed to create shipment with PostEx");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting address:", error);

  //     Swal.fire({
  //       title: "Error!",
  //       text: error.message || "Failed to submit your order. Please try again.",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   }
  // };

  return (
    <>
      <div className='text-5xl font-extrabold tracking-wider bgVideoText mt-5'>
        <h1 className='heading text-black font-extrabold font-text italic text-center'>
          Cart
        </h1>
      </div>

      <div className='container mt-[30px] mb-5'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='bg-body-tertiary p-5 border border-[#f0f0f0] rounded'>
              <div className='flex gap-2'>
                <p className='flex'>
                  This is a &nbsp;
                  <span className='font-bold'>DELIVERY ORDER</span>
                </p>
                <MdDeliveryDining
                  style={{ marginTop: '-10px', color: '#248ccb' }}
                  size={33}
                />
              </div>
              <p className='mt-2'>
                Just a last step, please enter your details:
              </p>

              <label htmlFor='name' className='mt-4'>
                Full Name
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='Full Name'
                onChange={e => setName(e.target.value)}
              />

              <label htmlFor='name' className='mt-4'>
                Mobile Number
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='03xx-xxxxxxx'
                onChange={e => setNum(e.target.value)}
              />

              <label htmlFor='name' className='mt-4'>
                Email Address
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='Email Address'
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor='name' className='mt-4'>
                Country
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='Country'
                onChange={e => setCountry(e.target.value)}
              />
              <label htmlFor='name' className='mt-4'>
                City
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='City'
                onChange={e => setCity(e.target.value)}
              />

              <label htmlFor='name' className='mt-4'>
                Delivery Address
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='Enter your complete address'
                onChange={e => setAddress(e.target.value)}
              />

              {/* <label htmlFor='name' className='mt-4'>
                Nearest Landmark
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='any famouse place nearby'
                onChange={e => setLandmark(e.target.value)}
              /> */}

              <p className='font-bold mt-5'>Payment Information</p>
              <div className='flex gap-3'>
                {/* Cash on Delivery */}
                <div
                  className={`p-3 mt-4 rounded cursor-pointer ${
                    paymentMethod === 'COD'
                      ? 'border-2 border-[#ff4c1b]'
                      : 'border border-gray-300'
                  }`}
                  style={{ width: '190px' }}
                  onClick={() => setPaymentMethod('COD')}
                >
                  <center>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        id='cod'
                        value='COD'
                        className='hidden'
                        onChange={handlePaymentChange}
                        checked={paymentMethod === 'COD'}
                      />
                      <label htmlFor='cod' className='ml-3 cursor-pointer'>
                        <Image src={cash} alt='Cash On Delivery' width={70} />
                        COD
                        <p>Cash On Delivery</p>
                      </label>
                    </div>
                  </center>
                </div>

                {/* Online Payment */}
                <div
                  className={`p-3 mt-4 rounded cursor-pointer ${
                    paymentMethod === 'onlinePayment'
                      ? 'border-2 border-[#ff4c1b]'
                      : 'border border-gray-300'
                  }`}
                  style={{ width: '190px' }}
                  onClick={() => setPaymentMethod('onlinePayment')}
                >
                  <center>
                    <input
                      type='radio'
                      name='paymentMethod'
                      id='onlinePayment'
                      value='onlinePayment'
                      className='hidden'
                      onChange={handlePaymentChange}
                      checked={paymentMethod === 'onlinePayment'}
                    />
                    <label
                      htmlFor='onlinePayment'
                      className='ml-3 cursor-pointer'
                    >
                      <Image src={online} alt='Online Payment' width={230} />
                      <p>Online Payment</p>
                    </label>
                    <br />

                    {/* Conditionally Show Online Payment Details */}
                    {paymentMethod === 'onlinePayment' && (
                      <div>
                        <div className='flex justify-around mt-3'>
                          {/* Easy Payment */}
                          <div>
                            <Image
                              src={easy}
                              style={{ width: '65px', height: '60px' }}
                              alt='Easy Payment'
                              onClick={() =>
                                handleItemClick('-----------------')
                              }
                              className='cursor-pointer'
                            />
                          </div>

                          {/* Jazz Payment */}
                          <div>
                            <Image
                              src={jazz}
                              style={{ width: '65px', height: '60px' }}
                              alt='Jazz Payment'
                              onClick={() =>
                                handleItemClick('-----------------')
                              }
                              className='cursor-pointer'
                            />
                          </div>

                          {/* Meezan Payment */}
                          <div>
                            <Image
                              src={meezan}
                              style={{ width: '85px', height: '57px' }}
                              alt='Meezan Payment'
                              onClick={() =>
                                handleItemClick(
                                  <>
                                    <span className='font-bold'>
                                      Account Title:
                                    </span>
                                    SINO-PAK TRADING CO
                                    <br />
                                    <span className='font-bold'>
                                      Account Number:
                                    </span>
                                    01560110265747
                                    <br />
                                    <span className='font-bold'>IBAN:</span>
                                    PK28MEZN0001560110265747
                                  </>
                                )
                              }
                              className='cursor-pointer'
                            />
                          </div>
                        </div>
                        <br />
                        <label
                          htmlFor='file-upload-product'
                          className='custom-file-upload1 w-[100%]'
                        >
                          <div className='flex justify-between'>
                            <div>Receipt Upload</div>
                            <div>
                              <ControlPointIcon />
                            </div>
                          </div>
                        </label>
                        <input
                          id='file-upload-product'
                          type='file'
                          className='hidden'
                          onChange={handleUploadImage}
                          multiple
                        />
                      </div>
                    )}
                  </center>
                </div>

                {/* Modal */}
                {showModal && (
                  <div
                    className='modal'
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1000
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        maxWidth: '500px',
                        textAlign: 'center'
                      }}
                    >
                      <p style={{ fontSize: '16px', margin: '20px 0' }}>
                        {modalContent}
                      </p>
                      <button
                        onClick={handleCloseModal}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          cursor: 'pointer'
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='bg-body-tertiary p-4 border border-[#f0f0f0] rounded'>
              <ProductCardCart />

              <div className='container mt-5'>
                <div className='flex flex-wrap'>
                  <div
                    style={{ height: '100%', width: 600 }}
                    className='mt-2 p-3 mb-5 bg-body-tertiary'
                  >
                    <div>
                      {/* <hr /> */}
                      {/* <input
                        type='radio'
                        name='paymentMethod'
                        id='onlinePayment'
                        value='onlinePayment'
                        onChange={handlePaymentChange}
                      />
                      <label htmlFor='onlinePayment' className='ml-3'>
                        Online Payment
                      </label>
                      <br />

                    
                      {paymentMethod === 'onlinePayment' && (
                        <div>
                          <div className='flex justify-around mt-3'>
              
                            <div>
                              <Image
                                src={easy}
                                style={{ width: '65px', height: '60px' }}
                                alt='image'
                                onClick={() =>
                                  handleItemClick('-----------------')
                                }
                                className='cursor-pointer'
                              />
                            </div>

                         
                            <div>
                              <Image
                                src={jazz}
                                style={{ width: '65px', height: '60px' }}
                                alt='image'
                                onClick={() =>
                                  handleItemClick('-----------------')
                                }
                                className='cursor-pointer'
                              />
                            </div>

                            <div>
                              <Image
                                src={meezan}
                                style={{ width: '85px', height: '57px' }}
                                alt='image'
                                onClick={() =>
                                  handleItemClick(
                                    <>
                                      <span className='font-bold'>
                                        Account Title:
                                      </span>
                                      SINO-PAK TRADING CO
                                      <br />
                                      <span className='font-bold'>
                                        Account Number:
                                      </span>
                                      01560110265747
                                      <br />
                                      <span className='font-bold'>IBAN:</span>
                                      PK28MEZN0001560110265747
                                    </>
                                  )
                                }
                                className='cursor-pointer'
                              />
                            </div>

                            {showModal && (
                              <div
                                className='modal'
                                style={{
                                  position: 'fixed',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  zIndex: 1000
                                }}
                              >
                                <div
                                  style={{
                                    position: 'relative',
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    maxWidth: '500px',
                                    textAlign: 'center'
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: '16px',
                                      margin: '20px 0'
                                    }}
                                  >
                                    {modalContent}
                                  </p>
                                  <button
                                    onClick={handleCloseModal}
                                    style={{
                                      position: 'absolute',
                                      top: '10px',
                                      right: '10px',
                                      backgroundColor: 'red',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '50%',
                                      width: '30px',
                                      height: '30px',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    X
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          <br />
                          <label
                            htmlFor='file-upload-product'
                            className='custom-file-upload1  w-[100%]'
                          >
                            <div className=' flex justify-between'>
                              <div>Receipt Upload</div>
                              <div>
                                <ControlPointIcon />
                              </div>
                            </div>
                          </label>
                          <input
                            id='file-upload-product'
                            type='file'
                            className='hidden'
                            onChange={handleUploadImage}
                            multiple
                          />
                        </div>
                      )} */}

                      {/* online payment end */}

                      {/* <input
                        type='radio'
                        name='paymentMethod'
                        id='cod'
                        value='COD'
                        className='mt-3'
                        onChange={handlePaymentChange}
                        defaultChecked
                      />
                      <label htmlFor='cod' className='ml-3'>
                        Cash On Delivery (COD)
                      </label> */}
                      {/* <div className='flex items-center'>
                        <input
                          type='radio'
                          name='paymentMethod'
                          id='cod'
                          value='COD'
                          className='hidden' // Radio button ko hide karne ke liye
                          onChange={handlePaymentChange}
                          defaultChecked
                        />
                        <label htmlFor='cod' className='ml-3 cursor-pointer'>
                          <Image
                            src={cash}
                            alt='Cash On Delivery'
                            // Image ki width aur height set karein
                          />
                        </label>
                      </div> */}

                      {/* <div className='flex flex-wrap gap-1'>
                        {slipimg?.length > 0 &&
                          slipimg.map((item, index) => (
                            <img
                              src={item}
                              key={index}
                              height={200}
                              width={200}
                              className='my-1'
                            />
                          ))}
                      </div> */}
                      <hr />

                      <br />
                      <br />
                      <div className='flex flex-wrap justify-between p-2'>
                        <div>
                          <h5 className='font-text text-lg font-bold'>
                            Subtotal
                          </h5>
                        </div>
                        <div>
                          <h6 className='font-text text-lg font-bold'>
                            Rs: {subTotal}
                          </h6>
                        </div>
                      </div>
                      <hr />
                      <div className='flex flex-wrap justify-between p-2'>
                        <div>
                          <h5 className='font-text text-lg font-bold'>
                            Delivery Charges
                          </h5>
                        </div>
                        <div>
                          <h6 className='font-text text-lg font-bold'>
                            Rs: {deliveryCharges}
                          </h6>
                        </div>
                      </div>
                      <hr />
                      <div className='flex flex-wrap justify-between p-2'>
                        <div>
                          <h5 className='font-text text-lg font-bold'>Total</h5>
                        </div>
                        <div>
                          <h6 className='font-text text-lg font-bold'>
                            Rs: {total}
                          </h6>
                        </div>
                      </div>
                      <hr />

                      <div className='container px-10 mx-0 min-w-full flex flex-col items-center'>
                        <button
                          onClick={onSubmitAddress}
                          className='flex mt-4 bg-[#248ccb] text-white hover:bg-[#dab66a] font-bold py-3 px-10 rounded tracking-wider'
                        >
                          Order Place
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
