// Banner.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './banner.css';
import townImage from '../assets/town.jpg'; // Adjust the path as needed

import { throttle } from 'lodash';

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);
  const bannerRef = useRef();

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    const handleScrollThrottled = throttle(handleScroll, 100);
    window.addEventListener('scroll', handleScrollThrottled);

    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
    };
  }, []);

  const bannerHeight = scrollY < 200 ? '1000px' : '500px';

  const heightSpringProps = useSpring({
    height: bannerHeight,
    config: { duration: 500 },
  });

  const imageSpringProps = useSpring({
    opacity: 1,
    transform: 'translateX(0%)',
    from: { opacity: 0, transform: 'translateX(100%)' },
    config: { duration: 500, delay: 100 },
  });

  const textSpringProps = useSpring({
    opacity: 1,
    transform: 'translateX(0%)',
    from: { opacity: 0, transform: 'translateX(-100%)' },
    config: { duration: 500, delay: 100 },
  });

  return (
    <>
      <animated.div
        ref={bannerRef}
        style={{ ...heightSpringProps }}
        className="banner-container"
      >
        <animated.div style={textSpringProps} className="text-container">
          <h1>Your Banner Text</h1>
          <p>Additional text or description goes here.</p>
        </animated.div>
        <animated.div style={imageSpringProps} className="image-container">
          <img src={townImage} alt="Banner Image" />
        </animated.div>
      </animated.div>
    </>
  );
};

export default Banner;
