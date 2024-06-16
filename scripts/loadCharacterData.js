const fs = require('fs');
const path = require('path');
const Character = require('../models/characterModel');

async function loadCharacterData() {
  const filePath = path.join(__dirname, '../briv.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const characterData = JSON.parse(data);

  // Save to MongoDB
  await Character.deleteMany({}); // Clear existing data
  const character = new Character(characterData);
  await character.save();

  return characterData;
}

module.exports = loadCharacterData;
