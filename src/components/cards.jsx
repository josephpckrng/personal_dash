// Cards.jsx
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Button, Heading, Text, Center } from '@chakra-ui/react';
import "./card.css"
const Cards = () => {
  return (
    <Center>
    <SimpleGrid spacing={3} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      <Card>
        <CardHeader>
          <Heading size='md'> Customer dashboard</Heading>
        </CardHeader>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
          <Button>View here</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Heading size='md'> Customer dashboard</Heading>
        </CardHeader>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
          <Button>View here</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Heading size='md'> Customer dashboard</Heading>
        </CardHeader>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
        <CardFooter>
          <Button>View here</Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
    </Center>
  );
};

export default Cards;
