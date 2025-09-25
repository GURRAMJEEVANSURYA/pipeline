import React from 'react'
import './Header.css'
import { assets } from '../../../assets/assets.js'

const Header = () => {
  return (
    <div className='header'>
      <img src={assets.header_img} alt="header" className="header-img" />
      <div className="Header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectavel array of dishes crafted with the finest ingredients and clinary expertise. is to satisfy your craving and elevate your dining experience, one delicious meal at a time</p>
        <button type="button">View Menu</button>
      </div>
    </div>
  )
}

export default Header
