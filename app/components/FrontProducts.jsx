'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSearchParams } from 'next/navigation'
import FrontProductsCard from './FrontProductsCard'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'

const FrontProducts = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [allProducts, setAllProducts] = useState([])

  const params = useSearchParams()
  let id = params.get('id')

  const handleGetProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/products`)
      const data = await response.json()
      setAllProducts(data.Products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetProducts()
  }, [id])

  return (
    <>
      <style jsx>{`
        body {
          background-color: white;
        }
      `}</style>

      <div className='container mt-5'>
        {loading ? (
          <div
            className='p-5 flex justify-center items-center'
            style={{ height: '100vh' }}
          >
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div className='md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 mb-4'>
              {allProducts?.length > 0 ? (
                allProducts
                  .slice(0, 8)
                  .map((item, i) => (
                    <FrontProductsCard
                      key={i}
                      item={item}
                      onReload={handleGetProducts}
                    />
                  ))
              ) : (
                <div className='py-5 my-5'>No products found</div>
              )}
            </div>
            {/* Learn More button */}
            {allProducts.length > 8 && (
              <div className='flex justify-center mt-5'>
                <Link href={"/category"}>
                  <button className='text-white flex font-bold text-[15px] bg-[#248ccb] py-2 mb-5 hover:bg-black px-3 rounded-3xl'>
                    View more
                    <MdOutlineKeyboardDoubleArrowRight
                      size={24}
                      style={{ marginLeft: '5px' }}
                    />
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default FrontProducts
