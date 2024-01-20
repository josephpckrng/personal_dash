// Banner.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './banner.css';
import townImage from '../assets/town.jpg';
import { throttle } from 'lodash';
import { useTheme } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
const Banner = () => {
  const theme = useTheme(); // Use the useTheme hook to access the Chakra UI theme
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
        style={{
          ...heightSpringProps,
          // backgroundColor: theme.colors.primary[800], // Access Chakra UI theme color
        }}
        className="banner-container"
      >
         <animated.div className="text-container">
          {/* Use Chakra UI Box component for styled text */}
          <Box as="h1" fontSize="2.75rem" fontWeight="600" mb="10px">
            Your Banner Text
          </Box>
          <Box fontSize="1rem">
            Additional text or description goes here.
          </Box>
        </animated.div>
        <animated.div style={imageSpringProps} className="image-container">
          <img src={townImage} alt="Banner Image" />
        </animated.div>
      </animated.div>
    </>
  );
};

export default Banner;