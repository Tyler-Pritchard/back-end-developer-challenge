import express from 'express';
import Character from '../../models/characterModel.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { characterId, healAmount } = req.body;

    if (!characterId || !healAmount) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const character = await Character.findOne({ name: characterId });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    character.hitPoints = Math.min(character.hitPoints + healAmount, character.maxHP);
    await character.save();

    res.json({
      characterId: character.name,
      currentHP: character.hitPoints,
      character,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
