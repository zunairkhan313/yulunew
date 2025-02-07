'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import OrderNumber from './OrderNumber'

const getAllCheckouts = async () => {
  try {
    const res = await fetch('api/checkout', {
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

const UserAddress = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCheckouts()
      console.log('checkouts', result?.Checkouts)

      setData(result?.Checkouts?.filter(item => item?.email)?.reverse()[0])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Error loading no information available.</div>
  }

  return (
    <>
      {
        <div key={data?._id}>
          <p>
            <OrderNumber />
          </p>
          <p>Email : {data?.email}</p>
          <br />
          <p>Phone Number : {data?.num}</p>
          <br />
          <p>Name : {data?.name}</p>
          <br />
          <p>Country : {data?.country}</p>
          <br />
          <p>City : {data?.city}</p>
          <br />
          <p>Address : {data?.address}</p>
          <br />
          <p>Payment Method : {data?.paymentMethod}</p>
          <br />
          {/* <img
            src={data?.slipimg || ''}
            height={200}
            width={200}
            className='my-1'
            alt='Payment Slip'
            style={{ display: data?.slipimg ? 'block' : 'none' }}
          /> */}
        </div>
      }
    </>
  )
}

export default UserAddress
