// client/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Prompt from './Prompt';
import Image from './Image';

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    // Update the route when the browser's URL changes
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (path) => {
    // Change the browser's URL without reloading the page
    window.history.pushState({}, '', path);
    setRoute(path);
  };

  // Render components conditionally based on the current route
  return (
    <div className="App">
      {/* <header>
          <img className='headerImg' src={`${process.env.PUBLIC_URL}/images/header.jpeg`} alt="Header"/>
      </header> */}


      {/* Header Section */}
      <header className="hero-banner">
        <div className='logos'>
          <img className="irc-logo" src={`${process.env.PUBLIC_URL}/images/islamic-relief-canada-logo.webp`} alt="Islamic Relief Canada" />
          <img className="sol-logo" src={`${process.env.PUBLIC_URL}/images/seeds-of-leadership-logo.png`} alt="Seeds of Leadership" />
        </div>
        <hr />
        <img src={`${process.env.PUBLIC_URL}/images/header.jpeg`} alt="Seeds of Leadership" className="hero-image" />
        <h1>On The Fly</h1>
        <h4>Tell a story based off the random prompt and image below!</h4>
        <nav className="nav-buttons">
          <button onClick={() => navigate('/image')} className='nav-btn'>Image Generator</button>
          <button onClick={() => navigate('/prompt')} className='nav-btn'>Prompt & Topic Generator</button>
        </nav>
      </header>

      {route === '/image' && <Image />}
      {route === '/prompt' && <Prompt />}
      {route === '/' && <h1>Welcome! Select a page from the navigation above.</h1>}
    </div>
  );
}

export default App;
