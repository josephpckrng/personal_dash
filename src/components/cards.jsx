import React, { useState, useEffect } from 'react';
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
import axios from 'axios'; // Import axios for making HTTP requests
import './card.css';

const Cards = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/josephpckrng/repos');
        setRepos(response.data);
      } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Center>
      <SimpleGrid spacing={3} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {repos.map((repo) => (
          <Card key={repo.id}>
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
          </Card>
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default Cards;