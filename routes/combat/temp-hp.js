const express = require('express');
const router = express.Router();

// Add Temporary HP: This route will handle adding temporary hit points to a character.
router.post('/', (req, res) => {
  const { characterId, tempHPAmount } = req.body;
  const character = req.app.locals.characterData;

  // Log the request body to ensure we are receiving it correctly.
  console.log('Received temp HP request:', req.body);

  // Simulate processing the temporary HP
  const currentTempHP = tempHPAmount; // Simplified for example

  // Construct the response object
  const response = {
    characterId: characterId,
    currentTempHP: currentTempHP,
    character: {
      ...character,
      hitPoints: character.hitPoints + currentTempHP
    }
  };

  // Send the response back to the client
  res.json(response);
});

module.exports = router;
