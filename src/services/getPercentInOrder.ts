import {suits, order, cards} from '../gameConfig';
import {Game} from '../models/game';

export function getPercentInOrder(game: Game): Number {
    let totalScore = 0;
    
    totalScore += getRowScore(game.spadesRow, suits.Spades.short)
    totalScore += getRowScore(game.diamondsRow, suits.Diamonds.short)
    totalScore += getRowScore(game.heartsRow, suits.Hearts.short)
    totalScore += getRowScore(game.clubsRow, suits.Clubs.short)

    return totalScore / cards.length;
}

function getRowScore(row, suite) {
    let rowScore = getSuiteScore(row, suite);
    rowScore += getPositionScore(row);
    return rowScore;
}

function getSuiteScore(row, suite) {
    return row.filter(card => card.indexOf(suite) > -1).length;
}

function getPositionScore(row){
    let positionScore = 0;
    for (let i = 0; i < row.length; i++) {
        if (row[i].indexOf(order[i]) > -1) {
            positionScore++;
        }
    }

    return positionScore;
}

exports.getPercentInOrder = (game: Game) => getPercentInOrder(game);
