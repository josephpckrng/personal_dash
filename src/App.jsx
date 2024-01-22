// src/App.jsx
import React from 'react';
import Header from './components/header';
import Banner from './components/banner';
import Cards from './components/cards';
import CricketScoreboard from './components/cricket';
import Siteswiper from './components/site'
import SplineBlock from './components/spline'
import SplineLoader from '@splinetool/loader';
const App = () => {
  return (
    <div>
      <Header />
      <Banner />
      <div className="card-container">
        <Cards />
      </div>
      <div className="site-container">
      <Siteswiper />
      </div>
      <div className="cricket-container">
     <SplineBlock />
      </div>
   

      {/* Your main application content goes here */}
    </div>
  );
};

export default App;