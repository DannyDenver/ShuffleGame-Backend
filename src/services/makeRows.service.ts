import {IGame} from '../interfaces/igame';

export function makeRows(deck: string[]): IGame {
    let rows: string[][] = [];
    let currentRow = [];

    for (let card of deck) {
        if (currentRow.length < 13) {
            currentRow.push(card);
        } else {
            rows.push([...currentRow]);
            currentRow = [];
            currentRow.push(card);
        }
    };

    rows.push([...currentRow]);
    return { spadesRow: rows[0], diamondsRow: rows[1], heartsRow: rows[2], clubsRow: rows[3], timestamp: Date.now().toString(), inOrder: null, historicalInOrder: null, sequence: null};
}

exports.makeRows = function(deck: string[]){return makeRows(deck)};
