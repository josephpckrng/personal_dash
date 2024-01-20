import React, { useState } from 'react';
import { Box, HStack, Text, useColorMode } from '@chakra-ui/react';
import { throttle } from 'lodash';

const Card = ({ title, category, rotateX, rotateY }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { colorMode } = useColorMode(); // Use useColorMode inside the component
  const bgColor = colorMode === 'light' ? 'gray.200' : 'gray.500';

  return (
    <Box
      w="25%"
      h="auto"
      p="4"
      fontSize="xl"
      borderRadius="md"
      bg={bgColor} // Change background color based on mouse position
      boxShadow={`0px 10px 20px rgba(0, 0, 0, ${Math.abs(mousePosition.x) * 0.1})`}
      transition="box-shadow 0.3s ease, background-color 0.3s ease"

    >
      <Text as="h2">{title}</Text>
      <Text as="h3" fontSize="sm">
        {category}
      </Text>
    </Box>
  );
};

const cardsData = [
  { id: 1, title: 'Analogue Revival', category: 'eCommerce' },
  { id: 2, title: 'Card 2' },
  { id: 3, title: 'Card 3' },
];

const CardGallery = () => {
  return (
    <HStack spacing="10" className="card-gallery">
      {cardsData.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          category={card.category}
        />
      ))}
    </HStack>
  );
};

export default CardGallery;
