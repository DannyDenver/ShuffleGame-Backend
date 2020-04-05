const gameService = require('../services/game.service')

exports.getGame = async (req, res, next) => {
  try {
    const igame = await gameService.setupGame();
    res.status(200).json(igame);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.shuffleDeck = async (req, res, next) => {
  let deck: string[] = req.body;
  try {
    const game = await gameService.shuffleCards(deck);
    res.status(200).json(game);
  }catch (error) {
    res.status(404).json(error);
    next(error);
  }
}

