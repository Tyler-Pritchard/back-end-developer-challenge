const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Character:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         level:
 *           type: integer
 *         hitPoints:
 *           type: integer
 *         classes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               hitDiceValue:
 *                 type: integer
 *               classLevel:
 *                 type: integer
 *         stats:
 *           type: object
 *           properties:
 *             strength:
 *               type: integer
 *             dexterity:
 *               type: integer
 *             constitution:
 *               type: integer
 *             intelligence:
 *               type: integer
 *             wisdom:
 *               type: integer
 *             charisma:
 *               type: integer
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               modifier:
 *                 type: object
 *                 properties:
 *                   affectedObject:
 *                     type: string
 *                   affectedValue:
 *                     type: string
 *                   value:
 *                     type: integer
 *         defenses:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               defense:
 *                 type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DamageRequest:
 *       type: object
 *       required:
 *         - characterId
 *         - damageType
 *         - damageAmount
 *       properties:
 *         characterId:
 *           type: string
 *         damageType:
 *           type: string
 *         damageAmount:
 *           type: number
 *     DamageResponse:
 *       type: object
 *       properties:
 *         characterId:
 *           type: string
 *         remainingHP:
 *           type: integer
 *         character:
 *           $ref: '#/components/schemas/Character'
 */

/**
 * @swagger
 * /api/damage:
 *   post:
 *     summary: Deal damage to a character
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DamageRequest'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DamageResponse'
 */
router.post('/damage', (req, res) => {
  const { characterId, damageType, damageAmount } = req.body;

  // For demonstration, let's log the request body to ensure we are receiving it correctly.
  console.log('Received damage request:', req.body);

  // Simulate processing the damage
  // For now, let's assume the character's remaining HP is calculated here
  const remainingHP = 15; // Placeholder value

  // Construct the response object
  const response = {
    characterId: characterId,
    remainingHP: remainingHP,
    character: {
      name: "Briv",
      level: 5,
      hitPoints: remainingHP,
      classes: [
        {
          name: "fighter",
          hitDiceValue: 10,
          classLevel: 5
        }
      ],
      stats: {
        strength: 15,
        dexterity: 12,
        constitution: 14,
        intelligence: 13,
        wisdom: 10,
        charisma: 8
      },
      items: [
        {
          name: "Ioun Stone of Fortitude",
          modifier: {
            affectedObject: "stats",
            affectedValue: "constitution",
            value: 2
          }
        }
      ],
      defenses: [
        {
          type: "fire",
          defense: "immunity"
        },
        {
          type: "slashing",
          defense: "resistance"
        }
      ]
    }
  };

  // Send the response back to the client
  res.json(response);
});


/**
 * @swagger
 * components:
 *   schemas:
 *     HealRequest:
 *       type: object
 *       required:
 *         - characterId
 *         - healAmount
 *       properties:
 *         characterId:
 *           type: string
 *         healAmount:
 *           type: number
 *     HealResponse:
 *       type: object
 *       properties:
 *         characterId:
 *           type: string
 *         currentHP:
 *           type: integer
 *         character:
 *           $ref: '#/components/schemas/Character'
 */

/**
 * @swagger
 * /api/heal:
 *   post:
 *     summary: Heal a character
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealRequest'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealResponse'
 */
router.post('/heal', (req, res) => {
  const { characterId, healAmount } = req.body;

  // For demonstration, let's log the request body to ensure we are receiving it correctly.
  console.log('Received heal request:', req.body);

  // Simulate processing the healing
  // For now, let's assume the character's current HP is calculated here
  const currentHP = 30; // Placeholder value

  // Construct the response object
  const response = {
    characterId: characterId,
    currentHP: currentHP,
    character: {
      name: "Briv",
      level: 5,
      hitPoints: currentHP,
      classes: [
        {
          name: "fighter",
          hitDiceValue: 10,
          classLevel: 5
        }
      ],
      stats: {
        strength: 15,
        dexterity: 12,
        constitution: 14,
        intelligence: 13,
        wisdom: 10,
        charisma: 8
      },
      items: [
        {
          name: "Ioun Stone of Fortitude",
          modifier: {
            affectedObject: "stats",
            affectedValue: "constitution",
            value: 2
          }
        }
      ],
      defenses: [
        {
          type: "fire",
          defense: "immunity"
        },
        {
          type: "slashing",
          defense: "resistance"
        }
      ]
    }
  };

  // Send the response back to the client
  res.json(response);
});


/**
 * @swagger
 * components:
 *   schemas:
 *     TempHPRequest:
 *       type: object
 *       required:
 *         - characterId
 *         - tempHPAmount
 *       properties:
 *         characterId:
 *           type: string
 *         tempHPAmount:
 *           type: number
 *     TempHPResponse:
 *       type: object
 *       properties:
 *         characterId:
 *           type: string
 *         currentTempHP:
 *           type: integer
 *         character:
 *           $ref: '#/components/schemas/Character'
 */

/**
 * @swagger
 * /api/temp-hp:
 *   post:
 *     summary: Add temporary HP to a character
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TempHPRequest'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TempHPResponse'
 */
router.post('/temp-hp', (req, res) => {
  const { characterId, tempHPAmount } = req.body;

  // For demonstration, let's log the request body to ensure we are receiving it correctly.
  console.log('Received temp HP request:', req.body);

  // Simulate processing the temporary HP
  // For now, let's assume the character's current temporary HP is calculated here
  const currentTempHP = 10; // Placeholder value

  // Construct the response object
  const response = {
    characterId: characterId,
    currentTempHP: currentTempHP,
    character: {
      name: "Briv",
      level: 5,
      hitPoints: 25,
      classes: [
        {
          name: "fighter",
          hitDiceValue: 10,
          classLevel: 5
        }
      ],
      stats: {
        strength: 15,
        dexterity: 12,
        constitution: 14,
        intelligence: 13,
        wisdom: 10,
        charisma: 8
      },
      items: [
        {
          name: "Ioun Stone of Fortitude",
          modifier: {
            affectedObject: "stats",
            affectedValue: "constitution",
            value: 2
          }
        }
      ],
      defenses: [
        {
          type: "fire",
          defense: "immunity"
        },
        {
          type: "slashing",
          defense: "resistance"
        }
      ]
    }
  };

  // Send the response back to the client
  res.json(response);
});


module.exports = router;