'use client'
import React, { useState, useEffect } from 'react'

// Function to generate order number
function generateOrderNumber () {
  const date = new Date()
  const dateString = date.toISOString().slice(0, 10).replace(/-/g, '') // YYYYMMDD
  const hours = date.getHours().toString().padStart(2, '0'); // HH
  const minutes = date.getMinutes().toString().padStart(2, '0'); // MM
  const seconds = date.getSeconds().toString().padStart(2, '0'); // SS
  
  const timeString = `${hours}:${minutes}:${seconds}`;

  return `ORD-${dateString}-${timeString}-`
}

export default function OrderNumber () {
  const [data, setData] = useState([])

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

  // Generate last order number or default order number
  const randomNumber = data[data?.length - 1]?.serialnumber
    ? parseInt(data[data?.length - 1]?.serialnumber)
    : null
  const lastOrderNumber = generateOrderNumber()

  return (
    <>
      {lastOrderNumber && (
        <div>
          <p className='mb-4'>
            Order Number: {lastOrderNumber}
            {randomNumber}
          </p>
        </div>
      )}
    </>
  )
}
