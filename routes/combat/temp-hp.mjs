import express from 'express';
import Character from '../../models/characterModel.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { characterId, tempHPAmount } = req.body;

    if (!characterId || !tempHPAmount || isNaN(tempHPAmount)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const character = await Character.findOne({ name: characterId });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (tempHPAmount > character.tempHitPoints) {
      character.tempHitPoints = tempHPAmount;
      await character.save();
    }

    res.json({
      characterId: character.name,
      currentTempHP: character.tempHitPoints,
      character,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
