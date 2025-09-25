import React, { useState, useContext } from 'react';
import './Restaurents.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Restaurents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'veg', 'nonveg'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const { addToCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    addToCart(item.name, {
      name: item.name,
      price: item.price,
      image: item.image
    });
    // Show a small notification that item was added
    alert(`${item.name} added to cart!`);
  };

  const restaurants = [
    {
      id: 1,
      name: "Spice Garden",
      image: assets.hotel1,
      rating: 4.5,
      deliveryTime: "30-35 min",
      location: "Koramangala, Bangalore",
      signatureDish: "Butter Chicken",
      type: "nonveg",
      menu: [
        { name: "Mushroom Biryani", price: 350, image: assets.h1f1 },
        { name: "Paneer Biryani", price: 300, image: assets.h2f1 },
        { name: "French Fries", price: 150, image: assets.h3f6 },
        { name: "Ice Cream", price: 120, image: assets.h4f1 },
        { name: "Gulab Jamun", price: 100, image: assets.h5f1 },
        { name: "Fresh Juice", price: 80, image: assets.h6f1 }
      ]
    },
    {
      id: 2,
      name: "Green Leaf",
      image: assets.hotel2,
      rating: 4.2,
      deliveryTime: "25-30 min",
      location: "Indiranagar, Bangalore",
      signatureDish: "Paneer Butter Masala",
      type: "veg",
      menu: [
        { name: "Paneer Biryani", price: 280, image: assets.h2f1 },
        { name: "Mushroom Biryani", price: 250, image: assets.h1f2 },
        { name: "French Fries", price: 120, image: assets.h3f6 },
        { name: "Ice Cream", price: 100, image: assets.h4f2 },
        { name: "Rasgulla", price: 80, image: assets.h5f2 },
        { name: "Fresh Juice", price: 70, image: assets.h6f2 }
      ]
    },
    {
      id: 3,
      name: "Coastal Delights",
      image: assets.hotel3,
      rating: 4.7,
      deliveryTime: "35-40 min",
      location: "Whitefield, Bangalore",
      signatureDish: "Fish Curry",
      type: "nonveg",
      menu: [
        { name: "Mushroom Biryani", price: 320, image: assets.h1f3 },
        { name: "Paneer Biryani", price: 300, image: assets.h2f2 },
        { name: "French Fries", price: 150, image: assets.h3f6 },
        { name: "Ice Cream", price: 120, image: assets.h4f3 },
        { name: "Kheer", price: 100, image: assets.h5f3 },
        { name: "Fresh Juice", price: 80, image: assets.h6f3 }
      ]
    },
    {
      id: 4,
      name: "Punjabi Dhaba",
      image: assets.hotel4,
      rating: 4.3,
      deliveryTime: "20-25 min",
      location: "HSR Layout, Bangalore",
      signatureDish: "Chole Bhature",
      type: "veg",
      menu: [
        { name: "Paneer Biryani", price: 280, image: assets.h2f3 },
        { name: "Mushroom Biryani", price: 260, image: assets.h1f4 },
        { name: "French Fries", price: 130, image: assets.h3f6 },
        { name: "Ice Cream", price: 110, image: assets.h4f4 },
        { name: "Jalebi", price: 90, image: assets.h5f4 },
        { name: "Fresh Juice", price: 75, image: assets.h6f4 }
      ]
    },
    {
      id: 5,
      name: "South Spice",
      image: assets.hotel5,
      rating: 4.4,
      deliveryTime: "30-35 min",
      location: "Jayanagar, Bangalore",
      signatureDish: "Masala Dosa",
      type: "veg",
      menu: [
        { name: "Mushroom Biryani", price: 300, image: assets.h1f5 },
        { name: "Paneer Biryani", price: 280, image: assets.h2f4 },
        { name: "French Fries", price: 140, image: assets.h3f6 },
        { name: "Ice Cream", price: 115, image: assets.h4f5 },
        { name: "Payasam", price: 95, image: assets.h5f5 },
        { name: "Fresh Juice", price: 85, image: assets.h6f5 }
      ]
    },
    {
      id: 6,
      name: "Royal Mughlai",
      image: assets.hotel6,
      rating: 4.6,
      deliveryTime: "40-45 min",
      location: "MG Road, Bangalore",
      signatureDish: "Mutton Biryani",
      type: "nonveg",
      menu: [
        { name: "Mushroom Biryani", price: 340, image: assets.h1f6 },
        { name: "Paneer Biryani", price: 320, image: assets.h2f5 },
        { name: "French Fries", price: 160, image: assets.h3f6 },
        { name: "Ice Cream", price: 130, image: assets.h4f6 },
        { name: "Kheer", price: 110, image: assets.h5f6 },
        { name: "Fresh Juice", price: 90, image: assets.h6f6 }
      ]
    },
    {
      id: 7,
      name: "Gujarat Delights",
      image: assets.hotel7,
      rating: 4.1,
      deliveryTime: "25-30 min",
      location: "BTM Layout, Bangalore",
      signatureDish: "Dhokla",
      type: "veg",
      menu: [
        { name: "Paneer Biryani", price: 290, image: assets.h2f6 },
        { name: "Mushroom Biryani", price: 270, image: assets.h1f1 },
        { name: "French Fries", price: 145, image: assets.h3f6 },
        { name: "Ice Cream", price: 125, image: assets.h4f1 },
        { name: "Shrikhand", price: 105, image: assets.h5f1 },
        { name: "Fresh Juice", price: 85, image: assets.h6f1 }
      ]
    },
    {
      id: 8,
      name: "The Clove In Wildwood",
      image: assets.hotel8,
      rating: 4.8,
      deliveryTime: "35-40 min",
      location: "Indiranagar, Bangalore",
      signatureDish: "Crab Masala",
      type: "nonveg",
      menu: [
        { name: "Mushroom Biryani", price: 360, image: assets.h1f2 },
        { name: "Paneer Biryani", price: 340, image: assets.h2f1 },
        { name: "French Fries", price: 170, image: assets.h3f6 },
        { name: "Ice Cream", price: 140, image: assets.h4f2 },
        { name: "Phirni", price: 120, image: assets.h5f2 },
        { name: "Fresh Juice", price: 100, image: assets.h6f2 }
      ]
    },
    {
      id: 9,
      name: "Chinese Wok",
      image: assets.hotel9,
      rating: 4.3,
      deliveryTime: "30-35 min",
      location: "Koramangala, Bangalore",
      signatureDish: "Hakka Noodles",
      type: "nonveg",
      menu: [
        { name: "Mushroom Biryani", price: 330, image: assets.h1f3 },
        { name: "Paneer Biryani", price: 310, image: assets.h2f2 },
        { name: "French Fries", price: 155, image: assets.h3f6 },
        { name: "Ice Cream", price: 135, image: assets.h4f3 },
        { name: "Mango Pudding", price: 115, image: assets.h5f3 },
        { name: "Fresh Juice", price: 95, image: assets.h6f3 }
      ]
    },
    {
      id: 10,
      name: "Common Wealth",
      image: assets.hotel10,
      rating: 4.4,
      deliveryTime: "25-30 min",
      location: "HSR Layout, Bangalore",
      signatureDish: "Quinoa Bowl",
      type: "veg",
      menu: [
        { name: "Paneer Biryani", price: 300, image: assets.h2f3 },
        { name: "Mushroom Biryani", price: 280, image: assets.h1f4 },
        { name: "French Fries", price: 150, image: assets.h3f6 },
        { name: "Ice Cream", price: 130, image: assets.h4f4 },
        { name: "Fruit Custard", price: 110, image: assets.h5f4 },
        { name: "Fresh Juice", price: 90, image: assets.h6f4 }
      ]
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.signatureDish.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || restaurant.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className='restaurants-container'>
      <div className="restaurants-header">
        <h1>Restaurants</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search restaurants, locations, or dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <button 
            className={filterType === 'all' ? 'active' : ''} 
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button 
            className={filterType === 'veg' ? 'active' : ''} 
            onClick={() => setFilterType('veg')}
          >
            Pure Veg
          </button>
          <button 
            className={filterType === 'nonveg' ? 'active' : ''} 
            onClick={() => setFilterType('nonveg')}
          >
            Non-Veg
          </button>
          {filterType !== 'all' && (
            <button 
              className="clear-filter"
              onClick={() => setFilterType('all')}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
      <div className="restaurants-grid">
        {filteredRestaurants.map((restaurant) => (
          <div 
            key={restaurant.id} 
            className="restaurant-card"
            onClick={() => setSelectedRestaurant(restaurant)}
          >
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <div className="restaurant-details">
                <span className="rating">⭐ {restaurant.rating}</span>
                <span className="delivery-time">🕒 {restaurant.deliveryTime}</span>
              </div>
              <div className="location">
                <span className="location-icon">📍</span>
                <span>{restaurant.location}</span>
              </div>
              <div className="signature-dish">
                <span>Signature Dish: {restaurant.signatureDish}</span>
              </div>
              <div className="type-badge">
                {restaurant.type === 'veg' ? '🟢 Pure Veg' : '🔴 Non-Veg Available'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Modal */}
      {selectedRestaurant && (
        <div className="menu-modal">
          <div className="menu-modal-content">
            <div className="menu-header">
              <h2>{selectedRestaurant.name} - Menu</h2>
              <button 
                className="close-button"
                onClick={() => setSelectedRestaurant(null)}
              >
                ✕
              </button>
            </div>
            <div className="menu-items">
              {selectedRestaurant.menu.map((item, index) => (
                <div key={index} className="menu-item">
                  <img src={item.image} alt={item.name} />
                  <div className="menu-item-details">
                    <h3>{item.name}</h3>
                    <p className="price">₹{item.price}</p>
                    <button 
                      className="add-to-cart"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurents;