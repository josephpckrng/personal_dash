import React, { useState, useEffect } from 'react';
import { Flex, Text, Button, useColorMode, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useSpring, animated } from '@react-spring/web';

const AnimatedFlex = animated(Flex);

const Card = ({ title, category, onOpen }) => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'light' ? 'gray.200' : 'gray.500';
  const [isHovered, setHovered] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrollY > window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacityProps = useSpring({
  opacity: isVisible ? 1 : 0,
});

  const hoverProps = useSpring({
    boxShadow: isHovered ? '0px 10px 20px rgba(0, 0, 0, 0.2)' : 'none',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  });

  return (
    <AnimatedFlex
      as="div"
      direction="column"
      w="25%"
      h="auto"
      p="4"
      mr="4"
      mt="10"
      fontSize="xl"
      borderRadius="md"
      bg={bgColor}
      onClick={onOpen}
      style={{ ...opacityProps, ...hoverProps }}
    >
      <Text as="h2">{title}</Text>
      <Text as="h3" fontSize="sm">
        {category}
      </Text>
      <Button mt={2}>
        Open Website
      </Button>
    </AnimatedFlex>
  );
};

const CardGallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardsData = [
    { id: 1, title: 'Analogue Revival', category: 'eCommerce' },
    { id: 2, title: 'R-Signs', category: 'eCommerce' },
    { id: 3, title: 'Card 3', category: 'Category 3' },
  ];

  return (
    <>
      {cardsData.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          category={card.category}
          onOpen={onOpen}
        />
      ))}

      {/* Lightbox Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <iframe src={`https://analoguerevival.co.uk`} width="100%" height="500px" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardGallery;
