const express = require('express');
const router = express.Router();

// Heal: This route will handle healing a character.
router.post('/', (req, res) => {
  const { characterId, healAmount } = req.body;
  const character = req.app.locals.characterData;

  if (!characterId || typeof healAmount !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Log the request body to ensure we are receiving it correctly.
  console.log('Received heal request:', req.body);

  // Retrieve character data
  const characterHP = character.hitPoints;

  // **********************************
  // **TODO: REMOVE PLACEHOLDER MAXHP**
  // **********************************
  const maxHP = 50; // Placeholder value for max HP

  // Calculate new HP without exceeding max HP
  const newHP = Math.min(characterHP + healAmount, maxHP);

  // Update character's HP
  character.hitPoints = newHP;

  // Construct the response object
  const response = {
    characterId: characterId,
    currentHP: newHP,
    character: {
      ...character,
      hitPoints: newHP
    }
  };

  // Send the response back to the client
  res.json(response);
});

module.exports = router;
