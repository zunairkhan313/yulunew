'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { ImCloudUpload } from 'react-icons/im'

const ProductEdit = ({ productId }) => {
  const router = useRouter()

  const [product, setProduct] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState([])
  const [smprice, setSmPrice] = useState('')
  const [mdprice, setMdPrice] = useState('')
  const [lgprice, setLgPrice] = useState('')
  const [xlprice, setXlPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [disPrice, setDisPrice] = useState('')
  const [small, setSmall] = useState('')
  const [medium, setMedium] = useState('')
  const [large, setLarge] = useState('')
  const [xlarge, setXlarge] = useState('')
  const [code, setCode] = useState('')
  const [video, setVideo] = useState('')
  const [stock, setStock] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?id=${productId}`)
        if (!res.ok) throw new Error('Failed to fetch product data')

        const data = await res.json()
        if (!data || !data.product)
          throw new Error('Product data is missing or invalid')

        setProduct(data.product)
        setTitle(data.product.title)
        setDescription(data.product.description)
        setImg(data.product.images)
        setSmPrice(data.product.smprice)
        setMdPrice(data.product.mdprice)
        setLgPrice(data.product.lgprice)
        setXlPrice(data.product.xlprice)
        setDiscount(data.product.discount)
        setDisPrice(data.product.disPrice)
        setSmall(data.product.small)
        setMedium(data.product.medium)
        setLarge(data.product.large)
        setXlarge(data.product.xlarge)
        setCode(data.product.code)
        setVideo(data.product.video)
        setStock(data.product.stock)
        setCategoryId(data.product.category_id)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [productId])

  useEffect(() => {
    if (smprice && discount && !isNaN(smprice) && !isNaN(discount)) {
      const percentage = discount / 100
      const discountedPrice = smprice / (1 - percentage)
      setDisPrice(Math.round(discountedPrice.toFixed(2))) // Set to 2 decimal points
    } else {
      setDisPrice(null) // Reset discounted price to null if discount is blank or invalid
    }
  }, [smprice, discount])
  const handleUploadImage = e => {
    const files = Array.from(e.target.files) // Convert FileList to an array
    const urls = []

    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = event => {
        urls.push(event.target.result) // Push the image URL in the same order
        if (urls.length === files.length) {
          setImg(urls) // Update state once all files are processed
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (!title || !description || !categoryId || !img) {
        alert('Please fill all required fields')
        setSubmitting(false)
        return
      }

      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          img,
          smprice: Math.floor(smprice),
          mdprice: Math.floor(mdprice),
          lgprice: Math.floor(lgprice),
          xlprice: Math.floor(xlprice),
          small,
          medium,
          large,
          xlarge,
          discount,
          disPrice,
          code,
          video,
          stock
          // categoryId,
        })
      })

      if (res.ok) {
        alert('Product updated successfully')
        router.push('/category')
      } else {
        throw new Error('Failed to update the product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <>
      <div className='container mt-3'>
        {/* Add Product */}
        <div className='flex justify-around'>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='container mt-5 p-4 rounded bg-slate-100'>
                <h1 className='text-3xl font-extrabold text-start mb-1 font-text'>
                  Add New Product
                </h1>
                <hr />
                <br />
                <label className='font-text'>Title</label>
                <br />
                <input
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                  type='text'
                  placeholder='Title'
                />
                <br />
                <br />
                <label>Description</label>
                <textarea
                  rows='4'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                  type='text'
                  placeholder='Description'
                />
                {/* <br />
                            <br /> */}
                {/* <label>Category</label>
                            <select
                              className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                              onChange={e => setCategoryId(e.target.value)}
                            >
                              {allCategories?.length > 0 ? (
                                <>
                                  <option disabled selected>
                                    Select category
                                  </option>
                                  {allCategories.map(item => (
                                    <>
                                      <option value={item?._id}>{item?.title1}</option>
                                    </>
                                  ))}
                                </>
                              ) : (
                                <option>No categories found</option>
                              )}
                            </select> */}

                <div>
                  {/* <label>Select Stock</label> */}
                  <select
                    className='mt-1 w-[100%] border border-gray-200 py-2 px-2 rounded bg-slate-200'
                    onChange={e => setStock(e.target.value)}
                  >
                    <option disabled selected>
                      Select Stock
                    </option>
                    <option>In Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>

                <div className='flex gap-2 mt-4'>
                  <div className='flex-1'>
                    <label>Size</label>
                    <input
                      value={small}
                      onChange={e => setSmall(e.target.value)}
                      className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                      type='text'
                      placeholder='Size'
                    />
                  </div>
                  <div className='flex-1'>
                    <label>Code</label>
                    <input
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                      type='text'
                      placeholder='Code'
                    />
                  </div>
                </div>
                <div className='flex gap-2 mt-4'>
                  <div className='flex-1'>
                    <label>Price</label>
                    <input
                      value={smprice}
                      onChange={e => setSmPrice(e.target.value)}
                      className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                      type='text'
                      placeholder='Price'
                    />
                  </div>
                  <div className='flex-1'>
                    <label>Discount</label>
                    <input
                      value={discount}
                      onChange={e => setDiscount(e.target.value)}
                      className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                      type='text'
                      placeholder='Discount'
                    />
                  </div>
                </div>
                <div className='row  mt-4'>
                  <div className='col-lg-4'>
                    <label>Discounted Price</label>
                    <br />
                    <input
                      type='text'
                      value={disPrice !== null ? disPrice : ''}
                      readOnly
                      className='mt-1 border border-gray-200 py-2 px-6 rounded bg-slate-200 col-lg-12'
                    />
                  </div>
                  <div className='col-lg-8'>
                    <label>Video Link</label>
                    <br />
                    <input
                      value={video}
                      onChange={e => setVideo(e.target.value)}
                      className='mt-1 col-lg-12 border border-gray-200 py-2 px-6 rounded bg-slate-200'
                      type='text'
                      placeholder='Video Link'
                    />
                  </div>
                </div>

                {/* <br />
                                  <br />
                                  <label>Size 2</label>
                                  <input
                                    value={medium}
                                    onChange={e => setMedium(e.target.value)}
                                    className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                                    type='text'
                                    placeholder='size 2'
                                  />
                                  <br />
                                  <br /> */}
                {/* <label>Size 3</label>
                                  <input
                                    value={large}
                                    onChange={e => setLarge(e.target.value)}
                                    className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                                    type='text'
                                    placeholder='size 3'
                                  />
                                  <br />
                                  <br />
                                  <label>Size 4</label>
                                  <input
                                    value={xlarge}
                                    onChange={e => setXlarge(e.target.value)}
                                    className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                                    type='text'
                                    placeholder='size 4'
                                  />
                                  <br />
                                  <br /> */}

                {/* <br />
                                  <br />
                                  <label>Price 2</label>
                                  <input
                                    value={mdprice}
                                    onChange={e => setMdPrice(e.target.value)}
                                    className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                                    type='text'
                                    placeholder='Price 2'
                                  />
                                  <br />
                                  <br />
                                  <label>Price 3</label>
                                  <input
                                    value={lgprice}
                                    onChange={e => setLgPrice(e.target.value)}
                                    className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                                    type='text'
                                    placeholder='Price 3'
                                  />
                                  <br />
                                  <br />
                                  <label>Price 4</label>
                                  <input
                                    value={xlprice}
                                    onChange={e => setXlPrice(e.target.value)}
                                    className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                                    type='text'
                                    placeholder='Price 4'
                                  /> */}
                {/* <br />
                            <br /> */}
                {/* <label>Discount</label>
                            <input
                              value={discount}
                              onChange={e => setDiscount(e.target.value)}
                              className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                              type='text'
                              placeholder='Discount'
                            /> */}
                {/* <br />
                            <br /> */}

                {/* <label>Discounted Price: </label>
                            <input
                              type='text'
                              value={disPrice !== null ? disPrice : ''}
                              readOnly
                              className='border border-gray-200 py-2 px-6 rounded bg-slate-200 ml-2'
                            /> */}
                {/* <br />
                            <br /> */}
                {/* <label>Code</label>
                            <input
                              value={code}
                              onChange={e => setCode(e.target.value)}
                              className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                              type='text'
                              placeholder='Code'
                            /> */}
                {/* <br />
                            <br /> */}
                {/* <label>Video Link</label>
                            <input
                              value={video}
                              onChange={e => setVideo(e.target.value)}
                              className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                              type='text'
                              placeholder='Video Link'
                            /> */}
                {/* <br />
                            <br /> */}
                {/* <select
                              className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                              onChange={e => setStock(e.target.value)}
                            >
                              <option disabled selected>
                                Select Stock
                              </option>
                              <option>In Stock</option>
                              <option>Out of Stock</option>
                            </select> */}
                {/* <br />
                            <br /> */}
                <div className='flex flex-wrap gap-2 justify-center mt-4'>
                  {img?.length > 0 &&
                    img.map((item, index) => (
                      <img
                        src={item}
                        key={index}
                        // height={100}
                        style={{ height: '120px' }}
                        width={170}
                        className=' border border-black rounded-lg '
                      />
                    ))}
                </div>

                {/* <label
                              htmlFor='file-upload-product'
                              className='custom-file-upload1  w-[100%]'
                            >
                              <div className=' flex justify-between'>
                                <div>Image Upload</div>
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
                            /> */}
                <br />
                <center>
                  <label htmlFor='file-upload' className='cursor-pointer'>
                    <div className='flex justify-around'>
                      <i>
                        <ImCloudUpload size={150} />
                      </i>
                    </div>
                    <div className='flex justify-around'>
                      <p className='font-text'>Browse file to upload</p>
                    </div>
                    <input
                      id='file-upload'
                      type='file'
                      className='hidden'
                      onChange={handleUploadImage}
                      accept='image/*' // Restrict to image files only
                      multiple
                    />
                  </label>
                </center>

                <div className='container px-10 mx-0 min-w-full flex flex-col items-center'>
                  <button
                    type='submit'
                    className='mt-3 bg-[#248ccb] text-white hover:bg-black font-bold py-2 px-4 rounded'
                  >
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductEdit
