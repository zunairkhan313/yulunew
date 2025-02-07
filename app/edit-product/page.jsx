'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
// import Form from "../components/Form";
import ProductEdit from '../components/ProductEdit'

const EditProduct = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('id') // Product ID query se extract karna



  return <ProductEdit type='Edit Product' productId={productId} />
}

export default EditProduct
