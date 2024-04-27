import React from 'react'
import { CartBagde } from './CartBagde'
import '../css/Header.css'

const Header = () => {

  return (
    <div className='header'>
    <img className="logo-header" src="https://i.ibb.co/YbGmTxx/posters-removebg.png"  alt=""  />
    <span className='title'>Rick & Morty </span>
    <span className='cartBadge' ><CartBagde style={{fontSize:'2rem'}} /></span>
    </div>
  )
}

export default Header
