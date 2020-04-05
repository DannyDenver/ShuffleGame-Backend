import {Game} from '../models/game';

export function makeRows(deck: string[]): Game {
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
    return new Game(rows[0], rows[1], rows[2], rows[3], Date.now().toString());
}

exports.makeRows = (deck: string[]) => makeRows(deck);
