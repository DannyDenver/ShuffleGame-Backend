import { generateCards } from './generateCards';
import { makeRows } from './makeRows';
import { shuffleCards } from './shuffleCards';
import { getPercentInOrder } from './getPercentInOrder';
const Game = require('../models/game');
const GameDm = require('../data-models/gameDm');


export class GameService {
    static setupGame(): Promise<any> {
        let deck = generateCards();
        let game = shuffleAndSetupGame(deck);
        let gameDb = new GameDm({ ...game });

        return new Promise((resolve, reject) => {
            gameDb.save((error, game) => {
                if (error) reject(error);
                resolve(game)
            })
        })
    }

    static shuffleCards(deck: string[]): Promise<any> {
        if (deck.length !== 52) deck = generateCards();

        const game =  shuffleAndSetupGame(deck);
        const gameDb = new GameDm({ ...game });

        return new Promise((resolve, reject) => {
            gameDb.save((error, game) => {
                if (error) reject(error);
            
                console.log('saved game', game);
                resolve(game);
              });
        });
    }
}


function shuffleAndSetupGame(deck: string[]) {
    deck = shuffleCards(deck);
    const game = makeRows(deck);
    game.inOrder = getPercentInOrder(game) as number;

    return game;
}

module.exports = GameService;