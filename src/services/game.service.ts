import { generateCards } from './generateCards.service';
import { makeRows } from './makeRows.service';
import { shuffleCards } from './shuffleCards.service';
import { getPercentInOrder } from './getPercentInOrder.service';
const Game = require('../models/game')

export class GameService {
    static setupGame(res) {
        let deck = generateCards();
        return shuffleAndSetupGame(deck);
    }

    static shuffleCards(deck: string[]) {
        if (deck.length !== 52) deck = generateCards();

        return shuffleAndSetupGame(deck);
    }
}


function shuffleAndSetupGame(deck: string[]) {
    deck = shuffleCards(deck);
    const igame = makeRows(deck);
    igame.inOrder = getPercentInOrder(igame) as number;

    return igame;
}

module.exports = GameService;