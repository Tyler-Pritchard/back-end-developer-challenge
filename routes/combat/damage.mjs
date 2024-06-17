import express from 'express';
import Character from '../../models/characterModel.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { characterId, damageType, damageAmount } = req.body;

    if (!characterId || !damageType || !damageAmount) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const character = await Character.findOne({ name: characterId });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    let damage = damageAmount;

    const defense = character.defenses.find(d => d.type === damageType);
    if (defense) {
      if (defense.defense === 'immunity') {
        damage = 0;
      } else if (defense.defense === 'resistance') {
        damage = Math.floor(damage / 2);
      }
    }

    // Apply damage to temporary hit points first
    if (character.tempHitPoints > 0) {
      character.tempHitPoints -= damage;
      if (character.tempHitPoints < 0) {
        damage = Math.abs(character.tempHitPoints);
        character.tempHitPoints = 0;
      } else {
        damage = 0;
      }
    }

    // Apply remaining damage to hit points
    character.hitPoints = Math.max(character.hitPoints - damage, 0);
    await character.save();

    res.json({
      characterId: character.name,
      remainingHP: character.hitPoints,
      character,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
