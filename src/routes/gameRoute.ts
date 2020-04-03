import express from 'express';

const gameController = require('../controllers/game')
const router = express.Router();

router.get('/deck', gameController.getGame);
router.put('/deck', gameController.shuffleDeck)

module.exports = router;