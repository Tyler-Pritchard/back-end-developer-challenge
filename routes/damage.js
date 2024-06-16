const express = require('express');
const router = express.Router();

// Helper function to calculate effective damage
function calculateEffectiveDamage(character, damageType, damageAmount) {
  const defense = character.defenses.find(def => def.type === damageType);
  // Check if character has resistance or immunity
  if (defense) {
    if (defense.defense === 'immunity') {
      return 0; // No damage if immune
    }
    // **TODO: DETERMINE RESISTANCE AMOUNT(S)**
    if (defense.defense === 'resistance') {
      return damageAmount / 2; // Half damage if resistant
    }
  }
  return damageAmount; // Full damage if no special defense
}

// Deal Damage: This route will handle applying damage to a character.
router.post('/', (req, res) => {
  const { characterId, damageType, damageAmount } = req.body;
  const character = req.app.locals.characterData;

  if (!characterId || !damageType || typeof damageAmount !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Log the request body to ensure we are receiving it correctly.
  console.log('Received damage request:', req.body);

  // Calculate effective damage
  const effectiveDamage = calculateEffectiveDamage(character, damageType, damageAmount);
  const remainingHP = character.hitPoints - effectiveDamage;

  // Construct the response object
  const response = {
    characterId: characterId,
    remainingHP: remainingHP,
    character: {
      ...character,
      hitPoints: remainingHP
    }
  };

  // Send the response back to the client
  res.json(response);
});

module.exports = router;
