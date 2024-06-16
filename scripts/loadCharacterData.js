const fs = require('fs');
const path = require('path');

function loadCharacterData() {
  const filePath = path.join(__dirname, '../briv.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

module.exports = loadCharacterData;
