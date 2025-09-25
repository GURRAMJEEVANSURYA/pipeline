import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../../assets/assets.js'
import { StoreContext } from '../../../Context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext)
  const itemCount = cartItems[name] || 0

  const handleAddToCart = () => {
    addToCart(name, {
      name,
      price,
      image
    })
  }

  const handleRemoveFromCart = () => {
    if (itemCount > 0) {
      removeFromCart(name)
    }
  }

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-img' src={image} alt={name} />
        {!itemCount ? (
          <img 
            className='add' 
            onClick={handleAddToCart} 
            src={assets.add_icon_white} 
            alt="Add" 
          />
        ) : (
          <div className='food-item-counter'>
            <button 
              style={{ backgroundColor: 'red', color: 'white', fontSize: '12px', padding: '4px 8px' }} 
              onClick={handleRemoveFromCart}
            >
              -
            </button>
            <span>{itemCount}</span>
            <button 
              style={{ backgroundColor: 'green', color: 'white', fontSize: '12px', padding: '4px 8px' }} 
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  )
}

export default FoodItem