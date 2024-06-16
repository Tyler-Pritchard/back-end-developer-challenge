const express = require('express');
const router = express.Router();

const damageRoute = require('./combat/damage');
const healRoute = require('./combat/heal');
const tempHpRoute = require('./combat/temp-hp');

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
 *         tempHitPoints:
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
router.use('/damage', damageRoute);


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
router.use('/heal', healRoute);


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
router.use('/temp-hp', tempHpRoute);


module.exports = router;