import React, { useState } from 'react';
import { Select, Box, Button, Input, VStack, Text, HStack } from '@chakra-ui/react';

const getMultiplierValue = (multiplier) => {
  switch (multiplier) {
    case 'single':
      return 1;
    case 'double':
      return 2;
    case 'triple':
      return 3;
    default:
      return 1;
  }
};



const CricketScoreboard = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [selectedMultiplier, setSelectedMultiplier] = useState('single');

  const addPlayer = () => {
    if (currentPlayer.trim() !== '') {
      setPlayers([...players, { name: currentPlayer.trim(), remainingPoints: 501 }]);
      setCurrentPlayer('');
    }
  };

  const updatePoints = (playerIndex, points) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      const currentPlayer = updatedPlayers[playerIndex];

      // Keep track of the score before the update
      const previousScore = currentPlayer.remainingPoints;

      // Check if subtracting points will go below 0
      if (previousScore - points < 0) {
        // If so, reset the player's score to what it was before going past 0
        currentPlayer.remainingPoints = previousScore;
      } else {
        currentPlayer.remainingPoints -= points;
      }

      return updatedPlayers;
    });
  };

  const handleScoreButtonClick = (playerIndex, value) => {
    const multiplierValue = getMultiplierValue(selectedMultiplier);

    // Deduct points based on the multiplier
    const points = (selectedMultiplier === 'single' && value === 1) ? 1 : value * multiplierValue;

    if (points > 0 && players[playerIndex].remainingPoints >= points) {
      setPlayers((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        const currentPlayer = { ...updatedPlayers[playerIndex] };

        // Deduct points from the remainingPoints
        currentPlayer.remainingPoints -= points;

        // Update the player in the array
        updatedPlayers[playerIndex] = currentPlayer;

        return updatedPlayers;
      });
    }
  };


  const optionStyles = {
    single: { paddingLeft: '10px' }, // Adjust styling as needed
    double: { paddingLeft: '10px' }, // Adjust styling as needed
    triple: { paddingLeft: '10px' }, // Adjust styling as needed
  };

  return (
    <VStack align="center" spacing={4}>
      <Input
        placeholder="Enter player name"
        value={currentPlayer}
        onChange={(e) => setCurrentPlayer(e.target.value)}
      />
      <Button onClick={addPlayer}>Add Player</Button>
      {players.map((player, index) => (
        <Box key={`${player.name}-${index}`}>
          <Text as="h2" fontSize="1.75rem" fontWeight="600" mb="10px">{player.name}</Text>
          <Text as="h3" fontSize="1.75rem" fontWeight="600" mb="10px">Remaining Points: {player.remainingPoints}</Text>
          <Select
            value={selectedMultiplier}
            onChange={(e) => setSelectedMultiplier(e.target.value)}
          >
            <option value="single" style={optionStyles.single}>
              Single
            </option>
            <option value="double" style={optionStyles.double}>
              Double
            </option>
            <option value="triple" style={optionStyles.triple}>
              Triple
            </option>
          </Select>
          <HStack spacing={2}>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((number) => (
              <React.Fragment key={number}>
                <Button
                  onClick={() => handleScoreButtonClick(index, number)}
                  isDisabled={player.remainingPoints <= 0}
                >
                  {number}
                </Button>
              </React.Fragment>
            ))}
          </HStack>
          <Button onClick={() => handleScoreButtonClick(index, 25)}>Bullseye</Button>


        </Box>
      ))}
    </VStack>
  );
};

export default CricketScoreboard;