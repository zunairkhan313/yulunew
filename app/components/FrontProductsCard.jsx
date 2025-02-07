import { addCart } from '@/redux/slices/cartSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import RemoveBtn from '../components/RemoveBtn'
import Link from 'next/link'
import { FaRegEdit } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { IoVideocamOutline } from 'react-icons/io5'

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export default function FrontProductsCard ({ item, onReload }) {
  const { data: session } = useSession()
  const [hovered, setHovered] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()
  const { cart } = useSelector(state => state.cart)

  const [selectedSize, setSelectedSize] = useState(item.small)

  const getPriceBySize = () => {
    switch (selectedSize) {
      case item.small:
        return item.smprice || null
      case item.medium:
        return item.mdprice || null
      case item.large:
        return item.lgprice || null
      case item.xlarge:
        return item.xlprice || null
      default:
        return item.smprice || null
    }
  }

  const isOutOfStock = item?.stock === 'Out of Stock'

  const addToCart = () => {
    const priceBySize = getPriceBySize()
    const tempArr = [...cart]
    const itemWithSelectedSize = {
      ...item,
      selectedSize,
      price: priceBySize,
      quantity: 1
    }
    tempArr.push(itemWithSelectedSize)
    dispatch(addCart(tempArr))
  }

  const removeFromCart = id => {
    router.push('/cart')
  }

  const isInCart = id => {
    return cart.some(cartItem => cartItem._id === id)
  }
  let Discount
  if (item?.discount && !isOutOfStock) {
    Discount = (
      <div className='absolute top-2 right-2 bg-[#248ccb] px-2 py-1 rounded'>
        <p className='text-white text-xs font-bold'>-{item?.discount}%</p>
      </div>
    )
  }

  let changePrice
  if (item?.disPrice && !isOutOfStock) {
    changePrice = (
      <h4 className='text-[12px] me-2 font-light font-text'>
        <del>{item?.disPrice}/- PKR</del>
      </h4>
    )
  }
  let addButton

  if (session?.user?.email === 'songchuan@gmail.com') {
    addButton = (
      <Link href={`/edit-product?id=${item._id}`}>
        <div className='ml-1'>
          <FaRegEdit size={20} className='text-[#248ccb]' />
        </div>
      </Link>
    )
  }

  return (
    <div className='border border-[#f0f0f0] mt-3 bg-body-tertiary rounded min-h-[200px]'>
      <div className='relative'>
        <Link href={`/product/details?id=${item?._id}`}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className='relative'
          >
            {item?.images?.length > 0 && (
              <img
                style={{ height: '250px', width: '100%' }}
                className='rounded object-cover transition-all duration-300 ease-in-out'
                // width={300}
                src={
                  hovered
                    ? item?.images[1]
                    : item?.images[item.images.length - 1]
                } // Image toggle on hover
                alt={item?.title || 'product'}
              />
            )}
            {Discount}
            {isOutOfStock && (
              <>
                <div className='absolute top-0 left-0 p-2 bg-[#248ccb]'>
                  <h3 className='text-white font-bold text-md font-text'>Sold Out</h3>
                </div>
              </>
            )}
          </div>
        </Link>
        {/* <a href={item?.video} target='_blank'>
          <div
            className='absolute bottom-1 right-1 hover:bg-[#248ccb] hover:text-white rounded-circle border border-black'
            style={{ padding: '9px' }}
          >
            <IoVideocamOutline size={19} />
          </div>
        </a> */}
      </div>
      <div className='p-3'>
        <h4 className='text-[15px] ml-2 font-text font-extrabold uppercase mt-4'>
          {item?.title}
        </h4>
        <p className='text-[12px] ml-2 mt-1 font-text'>
          {truncateText(item?.description, 30)}
        </p>
        <div className='flex justify-between'>
          <h4 className='text-[12px] ml-2 font-bold mt-3 font-text '>
            {getPriceBySize() ? `${getPriceBySize()}/- PKR` : "Sold Out"}
            {changePrice}
            {/* {`${getPriceBySize()}/- PKR`} */}
          </h4>
          <h4 className='text-[12px] ml-2 font-bold mt-3 font-text'>{item?.code}</h4>
        </div>
        <RemoveBtn id={item?._id} onReload={onReload} />
        {addButton}
        <hr className='mt-2' />
        <div className='flex flex-wrap justify-around mt-3'>
          <button
            style={{ backgroundColor: isOutOfStock ? '#ccc' : '#248ccb' }}
            className={`text-white font-medium font-text rounded-lg text-sm px-3 py-2.5 mb-2 ${
              isOutOfStock ? 'cursor-not-allowed' : 'hover:bg-[#248ccb]'
            }`}
            onClick={() => {
              if (!isInCart(item?._id) && !isOutOfStock) {
                addToCart()
                router.push('/cart')
              }
            }}
            disabled={isOutOfStock}
          >
            {isInCart(item?._id) ? 'Buy Now' : 'Buy Now'}
          </button>
          <button
            className={`font-medium rounded-lg font-text text-sm px-3 py-2.5 mb-2 ${
              isOutOfStock
                ? 'cursor-not-allowed text-black'
                : 'hover:bg-[#248ccb] hover:text-white'
            }`}
            onClick={() => {
              if (!isOutOfStock) {
                isInCart(item._id) ? removeFromCart(item._id) : addToCart()
              }
            }}
            disabled={isOutOfStock}
          >
            {isInCart(item._id) ? 'View Cart' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
