import { addCart } from '@/redux/slices/cartSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import RemoveBtn from '../RemoveBtn'
import Link from 'next/link'
import { FaRegEdit } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { IoVideocamOutline } from 'react-icons/io5'

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export default function ProductCard ({ item, onReload }) {
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

  let sizess
  if (item?.small) {
    sizess = (
      <div className='mt-[12px]'>
        <p
          name='size'
          id='size'
          value={selectedSize}
          onChange={e => setSelectedSize(e.target.value)}
          className='text-[13px] text-black'
        >
          {/* <option value={item.small}>{item.small}</option>
          <option value={item.medium}>{item.medium}</option>
          <option value={item.large}>{item.large}</option>
          <option value={item.xlarge}>{item.xlarge}</option> */}
          {item?.small}
        </p>
      </div>
    )
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

  if (session?.user?.email === 'yulu123@gmail.com') {
    addButton = (
      <Link href={`/edit-product?id=${item._id}`}>
        <div className='ml-2'>
          <FaRegEdit size={20} className='text-[#248ccb]' />
        </div>
      </Link>
    )
  }

  return (
    <div className='border border-[#f0f0f0] mb-3 bg-body-tertiary rounded min-h-[200px]'>
      <div className='relative'>
        <Link href={`/product/details?id=${item?._id}`}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className='relative'
          >
            {item?.images?.length > 0 && (
              <img
                style={{ height: '250px' }}
                className='rounded object-cover transition-all duration-300 ease-in-out'
                width={'100%'}
                src={
                  hovered
                    ? item?.images[1]
                    : item?.images[item.images.length - 1]
                } // Image toggle on hover
                alt={'tshirts'}
              />
            )}

            {Discount}
            {isOutOfStock && (
              <div
                className='absolute p-2 top-0'
                style={{ backgroundColor: '#248ccb' }}
              >
                <h3 className='text-white font-bold text-md font-text'>Sold Out</h3>
              </div>
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
        <div className='mt-4'>
          <h4 className='text-[15px] ml-2 font-extrabold uppercase font-text'>
            {item?.title}
          </h4>
        </div>
        <div className='mt-1'>
          <h4 className='text-[12px] ml-2 font-text'>
            {truncateText(item?.description, 30)}
          </h4>
        </div>
        <div className='flex justify-between'>
          <div className='mt-3'>
            <h4 className='text-[12px] ml-2 font-bold flex font-text'>
              {changePrice}
              {getPriceBySize() ? `${getPriceBySize()}/- PKR` : 'Sold Out'}
              {/* {`${getPriceBySize()}/- PKR`} */}
            </h4>
          </div>
          {sizess}
          <div className='mt-3'>
            <h4 className='text-[12px] ml-2 font-bold font-text'>{item?.code}</h4>
            <br />
          </div>
        </div>
        <div className='ml-1'>
          <RemoveBtn id={item?._id} onReload={onReload} />
        </div>
        {/* <Link href={`/edit-product?id=${item._id}`}>
          <div className='ml-2'>
            <FaRegEdit size={20} className='text-[#248ccb]' />
          </div>
        </Link> */}
        {addButton}
        <div className='mt-2'>
          <hr />
        </div>
        <div className='flex flex-wrap justify-around mt-3'>
          <div>
            <button
              style={{ backgroundColor: isOutOfStock ? '#ccc' : '#248ccb' }}
              type='button'
              className={`text-white font-medium font-text rounded-lg text-sm px-3 py-2.5 me-2 mb-2 ${
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
          </div>
          <div>
            <button
              type='button'
              className={`font-medium rounded-lg font-text text-sm px-3 py-2.5 me-2 mb-2 ${
                isOutOfStock
                  ? 'cursor-not-allowed text-[#248ccb]'
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
    </div>
  )
}
