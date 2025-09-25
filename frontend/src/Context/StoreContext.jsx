import React, { createContext, useState } from 'react'
import { food_list } from '../assets/assets'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({})
  const [cartItemDetails, setCartItemDetails] = useState({})

  const addToCart = (itemId, itemDetails) => {
    console.log('Adding to cart:', itemId, itemDetails); // Debug log
    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
      setCartItemDetails((prev) => ({ ...prev, [itemId]: itemDetails }))
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  }

  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItem((prev) => {
        const newItems = { ...prev };
        if (newItems[itemId] === 1) {
          delete newItems[itemId];
        } else {
          newItems[itemId] = newItems[itemId] - 1;
        }
        return newItems;
      });

      if (cartItems[itemId] === 1) {
        setCartItemDetails((prev) => {
          const newDetails = { ...prev };
          delete newDetails[itemId];
          return newDetails;
        });
      }
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = cartItemDetails[item];
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }

  const contextValue = {
    food_list,
    cartItems,
    cartItemDetails,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider