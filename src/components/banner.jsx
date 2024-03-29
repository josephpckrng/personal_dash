import React, { useEffect, useRef } from 'react';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

import WAVE from 'vanta/dist/vanta.trunk.min';
import { useSpring, animated } from '@react-spring/web';
import { throttle } from 'lodash';
import { useTheme, Box } from '@chakra-ui/react';
import './banner.css';

const Banner = () => {
  const theme = useTheme();
  const bannerRef = useRef(null);
  let vantaEffect = null;

  const [scrollY, setScrollY] = React.useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    const handleScrollThrottled = throttle(handleScroll, 100);
    window.addEventListener('scroll', handleScrollThrottled);

    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const bannerHeight = scrollY < 200 ? 1000 : 500; // Adjust the values as needed

  const heightSpringProps = useSpring({
    height: `${bannerHeight}px`,
    config: { duration: 500 },
  });

  useEffect(() => {
    vantaEffect = WAVE({
      el: bannerRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: bannerHeight, // Set initial minHeight here
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x7cb2cf,
      spacing: 6.50,
      chaos: 7.50
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []); // Watch only the initial creation, not heightSpringProps

  useEffect(() => {
    // Update Vanta.js minHeight directly when scrollY changes
    if (vantaEffect) {
      vantaEffect.setOptions({ minHeight: bannerHeight });
    }
  }, [scrollY]);

  return (
    <animated.div
      ref={bannerRef}
      style={{
        height: heightSpringProps.height,
        // other styles here if needed
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
    </animated.div>
  );
};

export default Banner;