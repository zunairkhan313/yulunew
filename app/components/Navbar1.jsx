'use client'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Logo from '../../public/images/Logo2.png'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { MdOutlineShoppingBag } from 'react-icons/md'
import './hr.css'
import SearchIcon from '@mui/icons-material/Search'
import { useSelector } from 'react-redux'

export default function Navbar1 () {
  const [header, setHeader] = useState(false)
  const { data: session } = useSession()

    var add;

    if (session?.user?.email === "yulu123@gmail.com") {
      add = (
            <>
                <Link href={"/addproduct"}>
                    <div style={{marginTop:"-6px"}} className='bg-[#dab66a] px-3 py-2 text-white font-text text-sm'>
                        Add Product
                    </div>
                </Link>
            </>
        )
    }

  const { cart } = useSelector(item => item.cart)

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHeader)
    return () => {
      window.addEventListener('scroll', scrollHeader)
    }
  }, [])

  var menu
  var menu1
  if (session?.user) {
    menu = (
      <button
        onClick={() => signOut()}
        className='ml-5  text-white bg-[#dab66a] text-sm px-3 py-2 font-text'
        id='logout'
        // style={{marginTop:"-4px"}}
      >
        Logout
      </button>
    )
  } else {
    menu1 = (
      <>
        <Link href={'/login'}>
          <button className='ml-5 text-sm  text-white px-3 py-2 mt-[-6px] bg-[#dab66a] font-text'>
            Login
          </button>
        </Link>
      </>
    )
  }
  return (
    <Navbar
      expand='lg'
      style={{
        backgroundColor: '#248ccb',
        paddingTop: '0px',
        paddingBottom: '0px',
        marginTop: header ? 0 : '0px'
      }}
    >
      <Container fluid>
        <Link href={'/'}>
          <Image
            className='ml-10'
            style={{ width: '160px' }}
            src={Logo}
            alt='logo'
          />
        </Link>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto' navbarScroll></Nav>
          <div id='searchbar' className='flex' style={{ marginRight: '157px' }}>
            <div>
              <input
                id='search'
                style={{
                  height: '43px',
                  borderTopLeftRadius: '19px',
                  borderBottomLeftRadius: '19px'
                }}
                className='mt-1 w-[400px] border border-gray-200 py-2 px-6'
                type='text'
                placeholder='Search for products'
              />
            </div>
            <div>
              <button
                className='p-2 mt-1'
                style={{
                  border: '1px solid white',
                  borderTopRightRadius: '19px',
                  borderBottomRightRadius: '19px'
                }}
              >
                <SearchIcon className='text-white' />
              </button>
            </div>
          </div>
          <div id='loginn' className='flex list-none m-5  gap-3'>
            <div className='mt-2'>

            {add}
            </div>
            {/* <div>
              <span id='user' className='font-bold text-white'>
                {session?.user?.name}
              </span>
            </div> */}

            <div id='log' className='mt-2'>
              {menu1}
              {menu}
            </div>
            <Link href={'/cart'}>
              <div id='cartt' className='mt-2 relative'>
                <div id='cartbase' className='absolute '>
                  {cart?.length || 0}
                </div>
                <MdOutlineShoppingBag className='text-white' size={24} />
              </div>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
