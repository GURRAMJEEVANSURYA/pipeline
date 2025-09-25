import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, cartItemDetails, removeFromCart, getTotalCartAmount, setCartItem, setCartItemDetails } = useContext(StoreContext);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (Object.keys(cartItems).length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = () => {
    // Clear the cart
    setCartItem({});
    setCartItemDetails({});
    // Show success message
    toast.success('Payment successful! Your order has been placed.', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#4CAF50',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    });
    // Navigate to home page after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.keys(cartItems).length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <p>Add some delicious items to your cart!</p>
            <button onClick={() => navigate('/')}>Browse Menu</button>
          </div>
        ) : (
          Object.keys(cartItems).map((item) => {
            if (cartItems[item] > 0) {
              const itemInfo = cartItemDetails[item];
              if (itemInfo) {
                return (
                  <div key={item} className="cart-items-format">
                    <img src={itemInfo.image} alt={item} className="cart-product-icon" />
                    <p>{item}</p>
                    <p>₹{itemInfo.price}</p>
                    <p>{cartItems[item]}</p>
                    <p>₹{itemInfo.price * cartItems[item]}</p>
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </div>
                );
              }
            }
            return null;
          })
        )}
        {Object.keys(cartItems).length > 0 && (
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
                </div>
              </div>
              {!showPayment ? (
                <button onClick={handleCheckout}>PROCEED TO PAYMENT</button>
              ) : (
                <div className="payment-section">
                  <h3>Payment Details</h3>
                  <div className="payment-form">
                    <input type="text" placeholder="Card Number" />
                    <div className="card-details">
                      <input type="text" placeholder="MM/YY" />
                      <input type="text" placeholder="CVV" />
                    </div>
                    <input type="text" placeholder="Name on Card" />
                    <button onClick={handlePayment}>PAY NOW</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;