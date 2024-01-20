// src/components/Header.jsx
import React from 'react';
import { Box, Heading, Flex, useColorMode, Button } from '@chakra-ui/react';
import './header.css';

const Header = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Flex as="header" align="center" justify="space-between" p="4" color="white">
  <Box as="h1" fontSize="2.75rem" fontWeight="600" mb="10px">
            Your Banner Text
          </Box>
      <div>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </div>
    </Flex>
  );
};

export default Header;