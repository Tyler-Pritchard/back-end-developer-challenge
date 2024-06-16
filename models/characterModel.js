const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DefenseSchema = new Schema({
  type: String,
  defense: String
});

const CharacterSchema = new Schema({
  name: String,
  level: Number,
  hitPoints: Number,
  tempHitPoints: { type: Number, default: 0 },
  classes: [
    {
      name: String,
      hitDiceValue: Number,
      classLevel: Number
    }
  ],
  stats: {
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number
  },
  items: [
    {
      name: String,
      modifier: {
        affectedObject: String,
        affectedValue: String,
        value: Number
      }
    }
  ],
  defenses: [DefenseSchema]
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;
