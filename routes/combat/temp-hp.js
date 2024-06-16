const express = require('express');
const router = express.Router();
const Character = require('../../models/characterModel');

// Add Temporary HP: This route will handle adding temporary hit points to a character.
router.post('/', async (req, res) => {
  const { characterId, tempHPAmount } = req.body;
  const character = await Character.findOne({ name: characterId });

  if (!characterId || typeof tempHPAmount !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Log the request body to ensure we are receiving it correctly.
  console.log('Received temp HP request:', req.body);

  // Retrieve character data
  const currentTempHP = character.tempHitPoints || 0;

  // Check current temporary HP and apply the higher value
  const newTempHP = Math.max(currentTempHP, tempHPAmount);

  // Update character's temporary HP
  character.tempHitPoints = newTempHP;

  // Save updated character data
  await character.save();

  // Construct the response object
  const response = {
    characterId: characterId,
    currentTempHP: newTempHP,
    character: character.toObject()
  };

  // Send the response back to the client
  res.json(response);
});

module.exports = router;
