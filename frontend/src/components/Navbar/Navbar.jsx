import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setMenu("menu");
    if (location.pathname !== '/') {
      navigate('/');
    }
    // Add a small delay to ensure the page has loaded before scrolling
    setTimeout(() => {
      const topDishesSection = document.getElementById('top-dishes');
      if (topDishesSection) {
        topDishesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          <Link to="/">home</Link>
        </li>
        <li onClick={handleMenuClick} className={menu === "menu" ? "active" : ""}>
          <a href="#top-dishes">menu</a>
        </li>
        <li onClick={() => setMenu("restaurants")} className={menu === "restaurants" ? "active" : ""}>
          <Link to="/restaurants">restaurants</Link>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className="dot"></div>
          <button onClick={() => setShowLogin(true)}>sign in</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;