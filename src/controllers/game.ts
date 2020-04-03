const generateCardsService = require("../services/generateCards.service");
const shuffleCardsService = require("../services/shuffleCards.service")
const getPercentInOrderService = require("../services/getPercentInOrder.service")
const makeRowsService = require("../services/makeRows.service");

const Game = require('../models/game');

const gameService = require('../services/game.service')

exports.getGame = (req, res, next) => {
  try {
    const igame = gameService.setupGame(res);
    const game = new Game({ ...igame });

    game.save((error, game) => {
      if (error) res.status(404).json(error);

      res.status(200).json(game)
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.shuffleDeck = async (req, res, next) => {
  let deck: string[] = req.body;

  const igame = gameService.shuffleCards(deck);
  const game = new Game({ ...igame });

  game.save((error, game) => {
    if (error) res.status(404).json(error);

    console.log('saved game', game);
    res.status(200).json(game);
  });
}

function shuffleAndSetupGame(deck: string[]) {
  deck = shuffleCardsService.shuffleCards(deck);
  const igame = makeRowsService.makeRows(deck);
  igame.inOrder = getPercentInOrderService.getPercentInOrder(igame) as number;

  return new Game({ ...igame });
}
