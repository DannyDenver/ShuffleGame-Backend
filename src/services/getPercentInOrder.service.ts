import {suits, order} from '../gameConfig';
import {IGame} from '../interfaces/igame';
import { generateCards } from './generateCards.service';

export function getPercentInOrder(game: IGame): Number {
    let score = 0;
    
    score += getRowScore(game.spadesRow, suits.Spades.short)
    score += getPositionScore(game.spadesRow);
    score += getRowScore(game.diamondsRow, suits.Diamonds.short)
    score += getPositionScore(game.diamondsRow);
    score += getRowScore(game.heartsRow, suits.Hearts.short)
    score += getPositionScore(game.heartsRow);
    score += getRowScore(game.clubsRow, suits.Clubs.short)
    score += getPositionScore(game.clubsRow);
    console.log(score);

    return score / generateCards().length;
}

const getRowScore = (row, suite) => row.filter(card => card.indexOf(suite) >= 0).length;

const getPositionScore = (row) => {
    let score = 0;
    for (let i = 0; i < row.length; i++) {
        if (row[i].indexOf(order[i]) > -1) {
            score++;
        }
    }

    return score;
}

exports.getPercentInOrder = function(game: IGame){return getPercentInOrder(game)};