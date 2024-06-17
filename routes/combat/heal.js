const express = require('express');
const router = express.Router();
const Character = require('../../models/characterModel');

// Heal: This route will handle healing a character.
router.post('/', async (req, res) => {
  const { characterId, healAmount } = req.body;

  if (!characterId || typeof healAmount !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const character = await Character.findOne({ name: characterId });

  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }

  // Log the request body to ensure we are receiving it correctly.
  console.log('Received heal request:', req.body);

  // Retrieve character data
  const characterHP = character.hitPoints;
  const maxHP = character.maxHP; // Use maxHP from the character data

  // Calculate new HP without exceeding max HP
  const newHP = Math.min(characterHP + healAmount, maxHP);

  // Update character's HP
  character.hitPoints = newHP;

  // Save updated character data
  await character.save();

  // Construct the response object
  const response = {
    characterId: characterId,
    currentHP: newHP,
    character: character.toObject()
  };

  // Send the response back to the client
  res.json(response);
});

module.exports = router;
