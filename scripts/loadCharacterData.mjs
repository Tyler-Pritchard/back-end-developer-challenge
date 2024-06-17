import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Character from '../models/characterModel.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default loadCharacterData;
