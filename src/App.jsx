// src/App.jsx
import React from 'react';
import Header from './components/header';
import Banner from './components/banner';
import Cards from './components/cards';
const App = () => {
  return (
    <div>
      <Header />
      <Banner />
      <div className="card-container">
      <Cards />
      </div>
     
      {/* Your main application content goes here */}
    </div>
  );
};

export default App;