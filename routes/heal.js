const express = require('express');
const router = express.Router();

// Heal: This route will handle healing a character.
router.post('/', (req, res) => {
  const { characterId, healAmount } = req.body;
  const character = req.app.locals.characterData;

  // Log the request body to ensure we are receiving it correctly.
  console.log('Received heal request:', req.body);

  // Simulate processing the healing
  const currentHP = character.hitPoints + healAmount; // Simplified for example

  // Construct the response object
  const response = {
    characterId: characterId,
    currentHP: currentHP,
    character: {
      ...character,
      hitPoints: currentHP
    }
  };

  // Send the response back to the client
  res.json(response);
});

module.exports = router;
