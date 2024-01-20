import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Button,
  Heading,
  Text,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import './card.css';

const AnimatedCard = animated(Card);

const Cards = () => {
  const [repos, setRepos] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCards, setHoveredCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/josephpckrng/repos');
        setRepos(response.data);
        // Initialize hoveredCards state with false for each card
        setHoveredCards(Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const animatedProps = useSpring({
    opacity: scrollY > 100 ? 1 : 0,
    transform: `translateY(${scrollY > 100 ? 0 : 20}px)`,
  });

  const handleCardHover = (index, isHovered) => {
    setHoveredCards((prevHoveredCards) => {
      const newHoveredCards = [...prevHoveredCards];
      newHoveredCards[index] = isHovered;
      return newHoveredCards;
    });
  };

  return (
    <Center>
      <SimpleGrid spacing={3} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {repos.map((repo, index) => (
          <AnimatedCard
            key={repo.id}
            style={{
              ...animatedProps,
              boxShadow: hoveredCards[index] ? '0px 10px 20px rgba(0, 0, 0, 0.2)' : 'none',
            }}
            onMouseEnter={() => handleCardHover(index, true)}
            onMouseLeave={() => handleCardHover(index, false)}
          >
            <CardHeader>
              <Heading size='md'>{repo.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{repo.description || 'No description available.'}</Text>
            </CardBody>
            <CardFooter>
              <Button as='a' href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                View on GitHub
              </Button>
            </CardFooter>
          </AnimatedCard>
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default Cards;