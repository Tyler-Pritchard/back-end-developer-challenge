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
  maxHP: Number, // Add maxHP field
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

// Middleware to set maxHP before saving
CharacterSchema.pre('save', function(next) {
  if (this.isNew) {
    this.maxHP = this.hitPoints; // Initialize maxHP with hitPoints
  }
  next();
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;
