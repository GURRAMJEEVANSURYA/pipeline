import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Navbar/Header/Header';
import ExploreMenu from '../../components/Navbar/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/Navbar/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <div id="top-dishes">
        <FoodDisplay category={category} />
      </div>
      <AppDownload/>
    </div>
  );
};

export default Home;