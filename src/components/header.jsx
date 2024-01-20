// src/components/Header.jsx
import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import "./header.css";
const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p="4"
      color="white"
    >
      <Heading as="h1" size="lg">
        My Chakra App
      </Heading>
    </Flex>
  );
};

export default Header;